"use client"
import React from 'react'
import DetailItem from '@/src/components/detail/detail-item'
import { useRestaurant } from '@/src/store/queryies/restaurant/restaurantQueries'


interface Props {
   restaurantId: string
}

const DetailWrap = ({ restaurantId }: Props) => {

   // async 함수 안에서는 hoohs 호출불가
   const { data: detailData, isError: detailError, isSuccess: detailSuccess } = useRestaurant(restaurantId)


   return (
      <>
         <DetailItem restaurant={detailData} />
      </>
   )
}

export default DetailWrap