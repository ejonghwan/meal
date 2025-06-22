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

      // const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'
      // const imageSize = new window.kakao.maps.Size(64, 69)
      // const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
      // const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
      // 마커 추가
      // const rMarker = new window.kakao.maps.Marker({
      //    map,
      //    position: new window.kakao.maps.LatLng(mapData.location.lat, mapData.location.lng),
      //    // image: markerImage
      // });


      // const infowindow = new window.kakao.maps.InfoWindow({
      //    position: new window.kakao.maps.LatLng(mapData.location.lat, mapData.location.lng),
      //    content: `
      //          <div class="map_inner_info" style="min-width: 100px; min-height: 20px; padding: 10px 10px;  border-radius: 20px;">
      //             ${mapData.name}
      //          </div>
      //    `,
      //    removable: true,
      // });
      // infowindow.setRange(100);
      // infowindow.open(map, rMarker);

      const customOverlay = new window.kakao.maps.CustomOverlay({
         map: map,
         position: new window.kakao.maps.LatLng(mapData.location.lat, mapData.location.lng),
         content: `
            <div class="customoverlay flex items-center gap-[6px] border border-1.5 border-primary bg-[#fff] p-[4px] pr-[8px]" style="min-width: 100px;  min-height: 11px; border-radius: 20px; position: relative; top: -9px; left: -0px; right:0;">

               <div style="width: 22px; height: 22px; border-radius: 50%; flex: 0 0 auto;" class="bg-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" class="map_ico" fill="#fff">
                     <path fill-rule="evenodd" d="M5.5 9.307C5.5 7.205 7.069 5.5 9.004 5.5s3.504 1.705 3.504 3.807c0 1.818-1.171 3.334-2.738 3.714v7.48H8.368V13.05C6.738 12.724 5.5 11.174 5.5 9.307zm13.599.694V5.823H20.5V10c0 1.574-1.064 2.882-2.453 3.123V20.5h-1.4v-7.376c-1.388-.24-2.453-1.549-2.453-3.123V5.823h1.4V10c0 .73.444 1.343 1.052 1.558V5.823h1.401v5.736c.608-.215 1.052-.827 1.052-1.558z" clip-rule="evenodd">
                     </path>
                  </svg>
               </div>

               <div class="text-[#333] text-[12px] ">
                  <p class=" leading-none" style="">${mapData.name}</p>
                  <div class="flex items-center gap-[3px]" >
                     <div class="size-[8px] ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#999" viewBox="0 0 13 13"><path d="M8.263 4.682h4.258a.479.479 0 0 1 .28.866L9.353 8.022l1.324 4.01a.477.477 0 0 1-.175.537.482.482 0 0 1-.563 0l-3.438-2.49-3.44 2.49a.48.48 0 0 1-.737-.538l1.324-4.01L.2 5.549a.477.477 0 0 1 .28-.867l4.258.001L6.044.675a.48.48 0 0 1 .912 0l1.307 4.007z"></path></svg>
                     </div>
                     <p class="text-[10px] mt-[2px] leading-none">${4.5}</p>
                  </div>
               </div>

            </div>
         `,
         yAnchor: 1
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