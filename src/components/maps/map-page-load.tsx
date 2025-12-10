"use client"

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useRestaurantListInfinite } from '@/src/store/queryies/restaurant/restaurantQueries'

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
      // setMarkers(restaurantData?.pages[0].data)
      console.log('mount', map)
   }, [map])


   const handleLoadMap = () => {

      window.kakao.maps.load(() => {

         console.log('???load')

         const mapContainer = document.getElementById("map");
         const mapOption = {
            center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 처음 위치
            level: 3, // 처음 레벨
         };

         const map = new window.kakao.maps.Map(mapContainer, mapOption);
         setMap(map); // 지도 상태 저장

         // 클러스터 테스트 
         // var clusterer = new window.kakao.maps.MarkerClusterer({
         //    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
         //    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
         //    minLevel: 10 // 클러스터 할 최소 지도 레벨 
         // });

         // markers 
         // var markers = restaurantData?.pages[0].data.map(item => {
         //    // bounds.extend(new window.kakao.maps.LatLng(item.mapInfo.y, item.mapInfo.x));
         //    return new window.kakao.maps.CustomOverlay({
         //       map: map,
         //       position: restaurantData?.pages[0].data && new window.kakao.maps.LatLng(item.mapInfo.y, item.mapInfo.x),
         //       content: `
         //    <div class="customoverlay flex items-center gap-[6px] border border-1.5 border-primary bg-[#fff] p-[4px] pr-[8px]" style="min-width: 100px;  min-height: 11px; border-radius: 20px; position: relative; top: -9px; left: -0px; right:0;">

         //       <div style="width: 22px; height: 22px; border-radius: 50%; flex: 0 0 auto;" class="bg-primary">
         //          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" class="map_ico" fill="#fff">
         //             <path fill-rule="evenodd" d="M5.5 9.307C5.5 7.205 7.069 5.5 9.004 5.5s3.504 1.705 3.504 3.807c0 1.818-1.171 3.334-2.738 3.714v7.48H8.368V13.05C6.738 12.724 5.5 11.174 5.5 9.307zm13.599.694V5.823H20.5V10c0 1.574-1.064 2.882-2.453 3.123V20.5h-1.4v-7.376c-1.388-.24-2.453-1.549-2.453-3.123V5.823h1.4V10c0 .73.444 1.343 1.052 1.558V5.823h1.401v5.736c.608-.215 1.052-.827 1.052-1.558z" clip-rule="evenodd">
         //             </path>
         //          </svg>
         //       </div>

         //       <div class="text-[#333] text-[12px] ">
         //          <p class=" leading-none" style="">${restaurantData?.pages[0].data && item.mapInfo.name}</p>
         //          <div class="flex items-center gap-[3px]" >
         //             <div class="size-[8px] ">
         //                <svg xmlns="http://www.w3.org/2000/svg" fill="#999" viewBox="0 0 13 13"><path d="M8.263 4.682h4.258a.479.479 0 0 1 .28.866L9.353 8.022l1.324 4.01a.477.477 0 0 1-.175.537.482.482 0 0 1-.563 0l-3.438-2.49-3.44 2.49a.48.48 0 0 1-.737-.538l1.324-4.01L.2 5.549a.477.477 0 0 1 .28-.867l4.258.001L6.044.675a.48.48 0 0 1 .912 0l1.307 4.007z"></path></svg>
         //             </div>
         //             <p class="text-[10px] mt-[2px] leading-none">${restaurantData?.pages[0].data && item.rating}</p>
         //          </div>
         //       </div>

         //    </div>
         // `,
         //       yAnchor: 1
         //    });
         // });

         // 클러스터러에 마커들을 추가합니다
         // clusterer.addMarkers(markers);
      });
   };



   // useEffect(() => {
   //    if (!map || !markers) return;

   //    // const imageSize = new window.kakao.maps.Size(44, 49);
   //    // const imageOption = { offset: new window.kakao.maps.Point(21, 39) };

   //    // const imageUrl = "/pin-active.svg";

   //    // const pin = new window.kakao.maps.MarkerImage(
   //    //    // imageUrl,
   //    //    imageSize,
   //    //    imageOption
   //    // );


   //    // const newMarkers = markers.map((_marker) => {
   //    //    const position = new window.kakao.maps.LatLng(_marker.latitude, _marker.longitude);
   //    //    const marker = new window.kakao.maps.Marker({
   //    //       map: map,
   //    //       position: position,
   //    //       // image: pin,
   //    //    });

   //    //    return marker;
   //    // });

   //    // const clusterer = new window.kakao.maps.MarkerClusterer({
   //    //    map: map, // 클러스터러 적용할 지도
   //    //    gridSize: 240, // 클러스터 포함 범위
   //    // });

   //    console.log('??as')

   //    // clusterer.addMarkers(newMarkers);
   //    // }, [map, markers]);
   // }, []);



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