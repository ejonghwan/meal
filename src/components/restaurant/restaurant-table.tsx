"use client"

import React, { useEffect, useState } from "react";
import RestaurantItem from "@/src/components/restaurant/restaurant-item";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { useRestaurantListAll } from '@/src/store/queryies/restaurant/restaurantQueries'




const RestaurantTable = () => {
  const { data: restaurantData, isError: restaurantError, isSuccess: restaurantSuccess, isLoading: restaurantLoading } = useRestaurantListAll(10)


  useEffect(() => {
    if (restaurantSuccess && restaurantData?.data) {
      console.log(restaurantData.data);
    }
  }, [restaurantSuccess, restaurantData]);



  return (
    <div>
      {restaurantLoading && <p>로딩 중...</p>}
      {restaurantError && <p>에러 발생</p>}
      <Accordion selectionMode="multiple">
        {restaurantSuccess && Array.isArray(restaurantData?.data) ? restaurantData?.data?.map(item => {
          return (
            <AccordionItem key={item.id} aria-label={`Accordion ${item.id}`} title={item.title}>
              <RestaurantItem restaurant={item} />
            </AccordionItem>
          )
        }) : null}
      </Accordion>

    </div>

  );
}


export default RestaurantTable;

// function onRestaurantListLoadAPI(): { mutate: any; data: any; isError: any; isSuccess: any; } {
//   throw new Error("Function not implemented.");
// }
