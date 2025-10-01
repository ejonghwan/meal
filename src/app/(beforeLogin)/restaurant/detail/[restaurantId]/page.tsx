import React from 'react'
import DetailWrap from '@/src/components/detail/detail-wrap'
import ContentWrap from '@/src/components/common/content-wrap'
import Section from '@/src/components/common/content-section'
import RestaurantCreateForm from '@/src/components/restaurant/restaurant-create-form';


interface Props {
   params: { restaurantId: string }
   // params: Promise<{ restaurantId: string }> // 얘는 promise 아닌듯 
   searchParams: Promise<{ hoho: string }>
   // searchParams: { hoho?: string }
}

const RestaurantDetailPage = async ({ params, searchParams }: Props) => {

   // 동기로 안만들어도 가져오긴함
   const { hoho } = await searchParams
   // const { hoho } = searchParams
   // console.log('searchParams', searchParams, hoho)


   return (
      <ContentWrap className='pb-[80px]'>
         <Section>
            {/* <div>RestaurantDetailPage : {params.restaurantId}</div> */}
            {/* <div>RestaurantDetailPage : {hoho}</div> */}
            <DetailWrap restaurantId={params.restaurantId} />
         </Section>


      </ContentWrap>
   )
}

export default RestaurantDetailPage





