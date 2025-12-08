"use client"

import { useEffect } from 'react'
import DetailItem from '@/src/components/detail/detail-item'
import { useRestaurant } from '@/src/store/queryies/restaurant/restaurantQueries'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
   restaurantId: string
}

const DetailWrap = ({ restaurantId }: Props) => {

   // async 함수 안에서는 hoohs 호출불가
   const { data: detailData, isLoading: detailLoading, isError: detailError, isSuccess: detailSuccess } = useRestaurant(restaurantId)
   const router = useRouter()

   useEffect(() => {
      if (detailError) {
         alert('해당 글이 존재하지 않습니다.')
         router.push('/home')

      }
   }, [detailError])


   return (
      <>
         {detailLoading && <div>loading</div>}
         {detailData && <DetailItem restaurant={detailData.data} />}
      </>
   )
}

export default DetailWrap