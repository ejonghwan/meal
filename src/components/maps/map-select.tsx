'use client';

import { useState, useRef, memo, useCallback, useEffect } from 'react';
import { useKakaoMap } from '@/src/hooks/use-maps';
import _ from 'lodash'
import { Input } from "@heroui/input"
import Link from 'next/link';
import MapInfo from '@/src/components/maps/map-info';

// address_name: "서울 도봉구 창동 13"
// category_group_code: "CE7"
// category_group_name: "카페"
// category_name: "음식점 > 카페 > 커피전문점 > 이디야커피"
// distance: ""
// id: "16501421"
// phone: "02-900-9307"
// place_name: "이디야커피 창동역점"
// place_url: "http://place.map.kakao.com/16501421"
// road_address_name: "서울 도봉구 마들로11길 65"
// x: "127.049616828096"
// y: "37.6533845503663"

interface Props {
   keyword: string;
   restaurant: any;
   setRestaurant: any;
   initialMapData?: string;
}

const MapSelect = ({ keyword, restaurant, setRestaurant, initialMapData }: Props) => {

   const mapRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (initialMapData) keyword = initialMapData; //초기 데이터가 있다면 검색
   }, [])

   const handleMapLoad = useCallback(() => {
      if (!window.kakao || !mapRef.current) return;

      const map = new window.kakao.maps.Map(mapRef.current, {
         center: new window.kakao.maps.LatLng(37.5665, 126.9780),
         level: 3,
      });

      // 장소 검색 객체를 생성합니다
      const ps = new window.kakao.maps.services.Places();

      // 키워드로 장소를 검색합니다
      ps.keywordSearch(keyword, placesSearchCB);

      // 키워드 검색 완료 시 호출되는 콜백함수
      function placesSearchCB(data, status, pagination) {
         if (status === window.kakao.maps.services.Status.OK) {
            // console.log('dd?', data)
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해 LatLngBounds 객체에 좌표를 추가
            var bounds = new window.kakao.maps.LatLngBounds();

            for (var i = 0; i < data.length; i++) {
               displayMarker(data[i]); //마커
               bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));

            }
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정
            map.setBounds(bounds);
         }
      }

      // 지도에 마커를 표시하는 함수
      function displayMarker(place) {

         // console.log('place?', place)
         // 가게명 추가
         const content = document.createElement('div');
         content.innerHTML = `
            <div class="customoverlay flex items-center gap-[6px] border border-1.5 border-primary bg-[#fff] p-[4px] pr-[8px]" style="min-width: 100px;  min-height: 11px; border-radius: 20px; position: relative; top: -9px; left: -0px; right:0;">
                  <div style="width: 22px; height: 22px; border-radius: 50%; flex: 0 0 auto;" class="map_ico_wrap bg-primary">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" class="map_ico" fill="#fff">
                        <path fill-rule="evenodd" d="M5.5 9.307C5.5 7.205 7.069 5.5 9.004 5.5s3.504 1.705 3.504 3.807c0 1.818-1.171 3.334-2.738 3.714v7.48H8.368V13.05C6.738 12.724 5.5 11.174 5.5 9.307zm13.599.694V5.823H20.5V10c0 1.574-1.064 2.882-2.453 3.123V20.5h-1.4v-7.376c-1.388-.24-2.453-1.549-2.453-3.123V5.823h1.4V10c0 .73.444 1.343 1.052 1.558V5.823h1.401v5.736c.608-.215 1.052-.827 1.052-1.558z" clip-rule="evenodd">
                        </path>
                     </svg>
                  </div>

                  <div class="text-[#333] text-[11px] ">
                     <p class="name leading-none" >${place.place_name}</p>
                     <div class="flex items-center gap-[3px]" >
                        <div class="size-[8px] star">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="#cdcdcd" viewBox="0 0 13 13"><path d="M8.263 4.682h4.258a.479.479 0 0 1 .28.866L9.353 8.022l1.324 4.01a.477.477 0 0 1-.175.537.482.482 0 0 1-.563 0l-3.438-2.49-3.44 2.49a.48.48 0 0 1-.737-.538l1.324-4.01L.2 5.549a.477.477 0 0 1 .28-.867l4.258.001L6.044.675a.48.48 0 0 1 .912 0l1.307 4.007z"></path></svg>
                        </div>
                        <p class="group_name text-[10px] mt-[2px] leading-none">${place.category_group_name}</p>
                     </div>
                  </div>

               </div>
            `
         const customOverlay = new window.kakao.maps.CustomOverlay({
            map: map,
            position: new window.kakao.maps.LatLng(place.y, place.x),
            content: content,
            yAnchor: 1
         });


         // 클릭 이벤트
         content.addEventListener('click', () => {

            const customoverlayAll = document.querySelectorAll('.customoverlay')
            customoverlayAll.forEach(item => item.classList.remove('active'))
            content.children[0].classList.add('active')

            setRestaurant(prev => ({
               ...prev,
               title: place.place_name,
               mapInfo: {
                  name: place.place_name,
                  adress: place.road_address_name,
                  category: place.category_name,
                  categoryName: place.category_group_name,
                  url: place.place_url,
                  phone: place.phone,
                  id: place.id,
                  categoryCode: place.category_group_code,
                  y: place.y,
                  x: place.x
               }
            }))
         })
      }

   }, [keyword]);


   useKakaoMap(handleMapLoad);

   return (
      <>
         <div
            ref={mapRef}
            className="w-full h-[400px] border border-gray-300 rounded-md"
         />
         <div>
            <MapInfo restaurant={restaurant} setRestaurant={setRestaurant} />
         </div>
      </>
   );
}

export default memo(MapSelect)





