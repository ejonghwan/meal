import React from 'react'
import MapReslistWrap from '@/src/components/maps/map-reslist-wrap'
// import MapPageLoad from '@/src/components/maps/map-page-load'

/*
  맵 최적화 
  1. 디바운스 쓰로틀 이용해서 요청 줄이기 
  2. 백엔드에서 보고 있는 화면에 대한 데이터만 추출해서 내려보내기 
  3. 1,2번을 하더라도 축소해서 데이터를 많이 받을 때도 있으니 UI적으로 최적화하기 
   ㄴ https://2yh-develop4jeon.tistory.com/94
*/

const Maps = () => {
  return (
    <>
      <MapReslistWrap />
      {/* <MapPageLoad /> */}
    </>
  )
}

export default Maps