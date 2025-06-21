'use client';

import { useRef } from 'react';
import { useKakaoMap } from '@/src/hooks/use-maps';

interface Props {
   mapData: {
      name: string;
      location: { lat: number; lng: number; }
   }
}


const MapLoad = ({ mapData }: Props) => {
   const mapRef = useRef<HTMLDivElement>(null);


   const handleMapLoad = () => {
      // console.log('map??', window.kakao, !mapRef.current)
      if (!window.kakao || !mapRef.current) return;

      const map = new window.kakao.maps.Map(mapRef.current, {
         center: new window.kakao.maps.LatLng(mapData.location.lat, mapData.location.lng),
         level: 3,
      });

      console.log('map?', map)


      // 예시: 마커 추가
      new window.kakao.maps.Marker({
         map,
         position: new window.kakao.maps.LatLng(mapData.location.lat, mapData.location.lng),
      });
   };

   useKakaoMap(handleMapLoad);

   return (
      <>
         <div
            ref={mapRef}
            className="w-full h-[400px] border border-gray-300 rounded-md"
         />
      </>
   );
}

export default MapLoad

// import React, { Fragment, useRef, useEffect, useState, useCallback } from 'react';
// import _ from 'lodash';

// import Tab from '../common/tab/Tab';
// import Showroom from './showroom/Showroom';

// import markerImg from '../../assets/images/common/marker.svg'

// const Map = ({ mapData }) => {

//    const { kakao } = window;
//    const mapContainerRef = useRef(null);
//    const infoContainerRef = useRef(null);
//    const [TargetLatLng, setTargetLatLng] = useState(null);

//    const [MapIns, setMapIns] = useState(null);
//    const [Traffic, setTraffic] = useState(false);




//    const createMarker = useCallback((mapIns, info) => {
//       // 인포생성
//       info.forEach((info, idx) => {
//          const marker = new kakao.maps.Marker({
//             position: new kakao.maps.LatLng(info.letlong.lat, info.letlong.long),
//             image: new kakao.maps.MarkerImage(markerImg, new kakao.maps.Size(40, 60),
//                { offset: new kakao.maps.Point(20, 60) })
//          });
//          marker.setMap(mapIns);

//          // 인포윈도우를 생성
//          const infowindow = new kakao.maps.InfoWindow({
//             position: new kakao.maps.LatLng(info.letlong.lat, info.letlong.long),
//             content: `
// 				    <div class="map_inner_info" style="min-height: 140px; padding: 10px 10px;  border-radius: 10px;">
// 				        <div class="info_type">${info.type}</div>
// 				        <span class="map_move">${info.point}</span>
// 				        <div class="info_add">${info.address}</div>
// 				        <div class="info_tel"><a href="tel:${info.tel}" title="매장 전화걸기">${info.tel}</a></div>
// 				        <ul class="cars">
// 				            ${info.car.map(car => `
// 				                <li>${car}</li>
// 				            `).join('')}
// 				        </ul>
// 				    </div>
// 				`,
//             removable: true,
//          });
//          // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
//          infowindow.open(mapIns, marker);
//       })
//    }, [kakao])



//    const createMap = useCallback(() => {
//       const mapInfo = mapData.map(data => data.items.map(item => item.info.map(info => info))).flat(Infinity)
//       const mapIns = new kakao.maps.Map(mapContainerRef.current, { center: new kakao.maps.LatLng(mapInfo[0].letlong.lat, mapInfo[0].letlong.long), level: 3 });

//       // 줌 컨트롤 붙이기
//       const zoomControl = new kakao.maps.ZoomControl();
//       mapIns.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

//       // 맵 타입 위성 붙이기
//       const mapTypeControl = new kakao.maps.MapTypeControl();
//       mapIns.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

//       //휠 줌 기능막기
//       mapIns.setZoomable(false)

//       mapIns.panTo(new kakao.maps.LatLng(mapInfo[1].letlong.lat, mapInfo[1].letlong.long))

//       createMarker(mapIns, mapInfo);
//       setMapIns(mapIns)
//       document.querySelector('.map_move')?.click();
//    }, [createMarker, kakao, mapData])



//    useEffect(() => {
//       createMap();
//    }, [createMap])



//    useEffect(() => {
//       MapIns?.panTo(new kakao.maps.LatLng(TargetLatLng.lat, TargetLatLng.long));
//    }, [MapIns, TargetLatLng, kakao])



//    useEffect(() => {
//       Traffic
//          ? MapIns?.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
//          : MapIns?.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
//    }, [MapIns, Traffic, kakao]);

//    const mapCenter = e => MapIns?.panTo(new kakao.maps.LatLng(TargetLatLng.lat, TargetLatLng.long));


//    useEffect(() => {
//       window.addEventListener('resize', _.debounce(mapCenter, 500))

//       return () => {
//          window.removeEventListener('resize', _.debounce(mapCenter, 500))
//       };
//    }, [MapIns])



//    return (
//       <div className='g_inner'>
//          <h2 className="gl_title">전시관 찾기</h2>
//          <div className='center_wrap' ref={infoContainerRef}>
//             <div className='region'>
//                <Tab
//                   tabHead={["서울", "경기", "인천", "광주", "충남", "대구"]}
//                   tabBody={[
//                      <Showroom data={mapData.filter(map => map.region === "서울")} setTargetLatLng={setTargetLatLng} />,
//                      <Showroom data={mapData.filter(map => map.region === "경기")} setTargetLatLng={setTargetLatLng} />,
//                      <Showroom data={mapData.filter(map => map.region === "인천")} setTargetLatLng={setTargetLatLng} />,
//                      <Showroom data={mapData.filter(map => map.region === "광주")} setTargetLatLng={setTargetLatLng} />,
//                      <Showroom data={mapData.filter(map => map.region === "충남")} setTargetLatLng={setTargetLatLng} />,
//                      <Showroom data={mapData.filter(map => map.region === "대구")} setTargetLatLng={setTargetLatLng} />
//                   ].map((item, idx) => <Fragment key={idx}>{item}</Fragment>)}
//                   id={"map_tab"}
//                   className={"info_wrap tab_type3"}
//                />
//             </div>
//             <div className='map'>
//                <div id="map" ref={mapContainerRef}></div>
//                <div className="btn_traffic_wrap">
//                   <button onClick={() => setTraffic(!Traffic)}>{Traffic ? '교통량 끄기' : '교통량 보기'}</button>
//                </div>
//             </div>
//          </div>
//       </div>
//    );
// }

// export default Map;