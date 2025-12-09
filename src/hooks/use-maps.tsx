'use client';

import { useEffect, useState } from 'react';

declare global {
   interface Window {
      kakao: any;
   }
}




// const loaded = useKakaoMap(() => { });

export const useKakaoMap = (onLoad: () => void) => {
   const [loaded, setLoaded] = useState(false);



   useEffect(() => {

      // 이미 로드된 경우
      if (window.kakao && window.kakao.maps) {
         setLoaded(true);
         onLoad();
         return;
      }

      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services,clusterer&autoload=false`;
      script.async = true;

      script.onload = () => {
         window.kakao.maps.load(() => {
            setLoaded(true);
            onLoad();
         });
      };

      document.head.appendChild(script);
   }, [onLoad]);

   // onLoad 이거 의존성에서 지움 테스트

   return loaded;
};

