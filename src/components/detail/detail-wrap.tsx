"use client"

import React, { useEffect } from 'react'
import DetailItem from '@/src/components/detail/detail-item'
import { useRestaurant } from '@/src/store/queryies/restaurant/restaurantQueries'


interface Props {
   restaurantId: string
}

const DetailWrap = ({ restaurantId }: Props) => {

   // async 함수 안에서는 hoohs 호출불가
   const { data: detailData, isLoading: detailLoading, isError: detailError, isSuccess: detailSuccess } = useRestaurant(restaurantId)

   // useEffect(() => {

   //    console.log('de ?', detailData)
   // }, [detailData])

   return (
      <>
         {detailLoading && <div>loading</div>}
         {detailData && <DetailItem restaurant={detailData.data} />}
      </>
   )
}

export default DetailWrap