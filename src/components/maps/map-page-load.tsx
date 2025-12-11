"use client"

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useRestaurantListInfinite } from '@/src/store/queryies/restaurant/restaurantQueries'

// 임의생성 함수
function generateKakaoMapDummyMarkers(count) {
   // 한국의 대략적인 지리적 범위 (이 범위 내에서 랜덤하게 좌표 생성)
   // - 위도 (Latitude): 북쪽 38.5도 ~ 남쪽 33.0도 (대략적인 남한 범위)
   // - 경도 (Longitude): 동쪽 131.0도 ~ 서쪽 126.0도
   const minLat = 33.0;
   const maxLat = 38.5;
   const minLng = 126.0;
   const maxLng = 131.0;

   const markers = [];

   for (let i = 0; i < count; i++) {
      // 1. 랜덤 위도 (Latitude) 생성
      const randomLat = Math.random() * (maxLat - minLat) + minLat;
      // 2. 랜덤 경도 (Longitude) 생성
      const randomLng = Math.random() * (maxLng - minLng) + minLng;

      markers.push({
         id: i + 1,
         name: `랜덤 장소 ${i + 1}`,

         // 카카오맵에서 사용하는 좌표 필드와 일치하도록 명명
         // 소수점 5자리까지 반올림하여 정확도 유지
         y: parseFloat(randomLat.toFixed(5)),
         x: parseFloat(randomLng.toFixed(5)),

         // 카테고리 테스트용 (옵션)
         category: (i % 3 === 0) ? '한식' : (i % 3 === 1) ? '일식' : '중식',
      });
   }
   return markers;
}

// harversine 공식 알고리즘
const haversineDistance = (
   lat1: number,
   lng1: number,
   lat2: number,
   lng2: number
): number => {
   const R = 6371;
   const dLat = (lat2 - lat1) * (Math.PI / 180);
   const dLng = (lng2 - lng1) * (Math.PI / 180);
   const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
   return R * c;
};

// 거리내 마커 필터링
export const findNearbyMarkers = ({
   markers,
   latitude,
   longitude,
   maxDistance,
}: {
   markers: any;
   latitude: number;
   longitude: number;
   maxDistance: number;
}): any => {
   return markers.filter((marker) => {
      const distance = haversineDistance(
         latitude,
         longitude,
         marker.latitude,
         marker.longitude
      );
      return distance <= maxDistance;
   });
};


// 마커 범위아 클러스터링 셀 크기 조절
const getDistance = (level: number) => {
   switch (true) {
      case level <= 3:
         return 1;
      case level <= 5:
         return 2;
      case level <= 6:
         return 4;
      case level <= 7:
         return 7;
      case level <= 8:
         return 14;
      case level <= 9:
         return 21;
      case level <= 10:
         return 30;
      case level <= 11:
         return 40;
      default:
         return 120;
   }
};

const getCellSize = (level: number) => {
   switch (true) {
      case level === 6:
         return 0.02;
      case level === 7:
         return 0.04;
      case level === 8:
         return 0.08;
      case level === 9:
         return 0.2;
      case level === 10:
         return 0.5;
      case level === 11:
         return 0.8;
      default:
         return 1.6;
   }
};


// 클러스터링 
const getGridCoordinates = (
   lat: number,
   lng: number,
   cellSize: number
): { x: number; y: number } => {
   const x = Math.floor(lng / cellSize);
   const y = Math.floor(lat / cellSize);
   return { x, y };
};

export const clusterMarkers = (
   markers: any,
   cellSize: number
): any => {
   const groups: { [key: string]: any } = {};

   markers.forEach((marker) => {
      const { x, y } = getGridCoordinates(
         marker.latitude,
         marker.longitude,
         cellSize
      );
      const key = `${x},${y}`;

      if (!groups[key]) {
         groups[key] = { centerLatitude: 0, centerLongitude: 0, count: 0 };
      }

      groups[key].centerLatitude += marker.latitude;
      groups[key].centerLongitude += marker.longitude;
      groups[key].count += 1;
   });

   return Object.values(groups).map((group) => ({
      centerLatitude: group.centerLatitude / group.count,
      centerLongitude: group.centerLongitude / group.count,
      count: group.count,
   }));
};


// 마커 오버레이 함수 
interface CreateMarkerOption {
   image?: "pending" | "active" | "selected";
   position?: any;
   markerId?: string | number;
}

interface CreateMarker {
   options: CreateMarkerOption;
   map: any;
}

const createMarker = ({ options, map }: CreateMarker) => {
   const imageSize = new window.kakao.maps.Size(44, 49);
   const imageOption = { offset: new window.kakao.maps.Point(21, 39) };

   const imageUrl =
      options.image === "selected"
         ? "/pin-selected.svg"
         : "/pin-active.svg";

   const pin = new window.kakao.maps.MarkerImage(
      imageUrl,
      imageSize,
      imageOption
   );

   const marker = new window.kakao.maps.Marker({
      map: map,
      position: options.position,
      image: pin,
   });

   setMarkers([marker]);
};



const KakaoMap = () => {

   const [map, setMap] = useState(null)
   const [markers, setMarkers] = useState(null)
   // const {
   //    data: restaurantData,
   //    fetchNextPage,
   //    hasNextPage,
   //    isFetchingNextPage,
   //    isError: restaurantError,
   //    isLoading: restaurantLoading,
   //    isSuccess: restaurantSuccess
   // } = useRestaurantListInfinite(100);

   useEffect(() => {
      // console.log('restaurantData?', restaurantData, restaurantData?.pages[0].data)
      console.log('mount', map, markers)
   }, [map, markers])



   useEffect(() => {
      const aa = generateKakaoMapDummyMarkers(5000)
      // console.log('??', aa)
      setMarkers(aa)
   }, [])
   // useEffect(() => {
   //    if (restaurantData) {
   //       setMarkers(restaurantData?.pages[0].data)
   //    }
   // }, [restaurantData]);


   useEffect(() => {
      if (!map || !markers) return;

      const newMarkers = markers.map((_marker) => {
         // console.log('_marker ??', _marker)
         // const position = new window.kakao.maps.LatLng(_marker.mapInfo.y, _marker.mapInfo.x);
         const position = new window.kakao.maps.LatLng(_marker.y, _marker.x);
         const marker = new window.kakao.maps.Marker({
            map: map,
            position: position,
         });
         return marker;
      });



      const clusterer = new window.kakao.maps.MarkerClusterer({
         // map: map, // 클러스터러 적용할 지도
         // gridSize: 240, // 클러스터 포함 범위
         map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
         averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
         minLevel: 10 // 클러스터 할 최소 지도 레벨 
      });

      clusterer.addMarkers(newMarkers);
   }, [map, markers]);




   const handleLoadMap = () => {
      window.kakao.maps.load(() => {
         const mapContainer = document.getElementById("map");
         const mapOption = {
            center: new window.kakao.maps.LatLng(37.566535, 126.9779692), // 처음 위치
            level: 3, // 처음 레벨
         };

         const map = new window.kakao.maps.Map(mapContainer, mapOption);
         setMap(map); // 지도 상태 저장
      });
   };



   return (
      <>
         <Script
            src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services,clusterer&autoload=false`}
            onLoad={handleLoadMap}
         />
         <div id="map" className="relative w-full h-dvh" />
      </>
   );
};

export default KakaoMap;