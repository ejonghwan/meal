"use client"

import React, { Fragment, useEffect, useState } from "react";
import RestaurantItem from "@/src/components/restaurant/restaurant-item";

import { Skeleton } from "@heroui/skeleton";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { PiBowlFoodDuotone, PiStarDuotone, PiStarFill, PiCakeDuotone } from "react-icons/pi";
import Link from "next/link";


const RestaurantTable = ({ restaurantData, restaurantSuccess, restaurantLoading, restaurantError }) => {

  return (
    <>
      {restaurantLoading && (
        <>
          {Array(10).fill('1').map((_, idx) => (
            <Fragment key={idx}>
              {/* <Skeleton className='h-[22px] w-[50px] mb-[20px]' /> */}
              <div className="flex flex-wrap items-center bg-[#18181b] h-[76px] rounded-[12px] p-[15px] mb-[5px]">
                <Skeleton className='w-[30%] h-[10px] rounded-[20px]' />
                <Skeleton className='w-[80%] h-[10px] rounded-[20px]' />
              </div>
            </Fragment>
          ))}
        </>
      )}
      {restaurantError && <p>에러 발생</p>}
      <Accordion selectionMode="multiple" variant="splitted" className="px-0">
        {restaurantSuccess && Array.isArray(restaurantData?.data) ? restaurantData?.data?.map(item => {
          return (
            <AccordionItem
              key={item.id}
              aria-label={`Accordion ${item.id}`}
              title={item.title}
              className="px-[14px]"
              startContent={
                <div className="flex justify-center items-center flex-col">
                  <PiStarFill className="size-[20px] text-[#ebdf32]" />
                  <span className="text-[12px] text-[#999] mt-[5px] flex items-center gap-[1px]">
                    <span className="text-[#ebdf32] font-bold">{Number(item.totalRating).toFixed(1)}</span>
                    <span className="text-[12px]">/</span>5
                  </span>
                </div>
              }
              subtitle={item.content}
            >
              <RestaurantItem restaurant={item} />
            </AccordionItem>
          )
        }) : null}
      </Accordion>

      {restaurantSuccess && restaurantData.data.length === 0 && (
        <div className="no-data">
          <div className="text-center mb-[40px]">
            <strong className="text-[16px]">등록된 식당이 없습니다</strong>
            <p className="text-[14px] mt-[4px]">또 가고 싶은 식당을 등록해보세요</p>
          </div>
          <Link href="/restaurant" className="flex flex-wrap w-full justify-center">
            <div className="flex justify-center w-full">
              <PiBowlFoodDuotone className="text-[70px]" />
            </div>
            <span className="text-[14px] mt-[10px] underline">맛집 등록하러 가기</span>
          </Link>
        </div>
      )}
    </>
  );
}


export default RestaurantTable;

// function onRestaurantListLoadAPI(): { mutate: any; data: any; isError: any; isSuccess: any; } {
//   throw new Error("Function not implemented.");
// }
