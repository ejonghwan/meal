"use client"

import React, { useEffect, useState } from "react";
import RestaurantItem from "@/src/components/restaurant/restaurant-item";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { useRestaurantList } from '@/src/store/queryies/restaurant/restaurantQueries'
import { PiBowlFoodDuotone, PiStarDuotone, PiStarFill } from "react-icons/pi";


const RestaurantTable = () => {
  const { data: restaurantData, isError: restaurantError, isSuccess: restaurantSuccess, isLoading: restaurantLoading } = useRestaurantList(10)


  useEffect(() => {
    if (restaurantSuccess && restaurantData?.data) {
      console.log(restaurantData.data);
    }
  }, [restaurantSuccess, restaurantData]);


  return (
    <>
      {restaurantLoading && <p>로딩 중...</p>}
      {restaurantError && <p>에러 발생</p>}
      <Accordion selectionMode="multiple" variant="splitted" className="px-0">
        {restaurantSuccess && Array.isArray(restaurantData?.data) ? restaurantData?.data?.map(item => {
          return (
            <AccordionItem
              key={item.id}
              aria-label={`Accordion ${item.id}`}
              title={item.title}
              startContent={
                <div className="flex justify-center items-center flex-col">
                  <PiStarFill className="size-[20px] text-[#ebdf32]" />
                  <span className="text-[12px] text-[#999] mt-[5px] flex items-center gap-[1px]">
                    <span className="text-[#ebdf32] font-bold">{item.totalRating}</span>
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
    </>
  );
}


export default RestaurantTable;

// function onRestaurantListLoadAPI(): { mutate: any; data: any; isError: any; isSuccess: any; } {
//   throw new Error("Function not implemented.");
// }
