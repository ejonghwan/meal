"use client"

import React, { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import CategoryItem from '@/src/components/category-list/category-list-item';
import { categorys } from '@/src/components/common/category/category-data'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '@/src/styles/category-list/category-list.css';


const CategoryWrap = () => {

   const router = useRouter()
   const [swiperInstance, setSwiperInstance] = useState(null);
   const [activeIndex, setActiveIndex] = useState(0);
   const [clickIndex, setClickIndex] = useState(0);
   const searchParams = useSearchParams()

   const handleSearch = (keyword) => {
      if (!keyword.trim()) return
      // router.push(`?search=${encodeURIComponent(keyword)}`)
      router.push(`?search=${keyword}`)
   }

   const handleClickCategory = (slideIndex) => {
      if (!swiperInstance) return;

      swiperInstance.slideTo(slideIndex)
      setClickIndex(slideIndex)

      handleSearch(categorys[slideIndex].value)
   }

   const handleSerachCategory = (e) => {
      e.preventDefault();
   }

   useEffect(() => {
      setClickIndex(categorys.filter(item => item.value === searchParams.get('search'))[0].id)
   }, [])

   return (
      <div className='category__list--wrap'>
         <Swiper
            // pagination={{type: 'progressbar',}}

            navigation={true}
            modules={[Pagination, Navigation]}
            className="category__list--swiper"
            slidesPerView={'auto'}
            // centeredSlides={true}
            spaceBetween={5}
            onSwiper={setSwiperInstance}
            onSlideChange={(e) => setActiveIndex(e.activeIndex)}
            loop={false}
         // centeredSlides={false}         // ❌ 초기에는 센터 정렬 X
         // initialSlide={0}      // 👉 첫 번째 슬라이드부터 시작

         >
            {categorys.map((category, idx) => (
               <SwiperSlide key={idx} className={`category__list--item`} onClick={() => handleClickCategory(category.id)} >
                  <form onSubmit={handleSerachCategory}>
                     <button className={`category__list--btn ${category.id === clickIndex ? 'active' : ''}`}>
                        <CategoryItem category={category} clickIndex={clickIndex} />
                     </button>
                  </form>
               </SwiperSlide>
            ))}

         </Swiper>

         <div className='px-[18px] mb-[20px]'>
            <strong className='text-[18px]'>{categorys[clickIndex].value}</strong>
         </div>
      </div>
   )
}

export default CategoryWrap