'use client';

import { useRef, useCallback, memo } from 'react';
import { useKakaoMap } from '@/src/hooks/use-maps';

interface Props {
   mapData: {
      name: string;
      location: { lat: number; lng: number; }
      rating: any;
   }
}


const MapLoad = ({ mapData }: Props) => {

   const mapRef = useRef<HTMLDivElement>(null);

   const handleMapLoad = useCallback(() => {
      if (!window.kakao || !mapRef.current) return;

      const map = new window.kakao.maps.Map(mapRef.current, {
         center: new window.kakao.maps.LatLng(mapData.location.lat, mapData.location.lng),
         level: 3,
      });

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
                     <p class="text-[10px] mt-[2px] leading-none">${mapData.rating}</p>
                  </div>
               </div>

            </div>
         `,
         yAnchor: 1
      });

   }, []);

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

export default memo(MapLoad)
