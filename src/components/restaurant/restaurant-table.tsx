"use client"

import React, { Fragment, useEffect, useState } from "react";
import RestaurantItem from "@/src/components/restaurant/restaurant-item";

import { Skeleton } from "@heroui/skeleton";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { PiBowlFoodDuotone, PiStarDuotone, PiStarFill, PiCakeDuotone } from "react-icons/pi";
import Link from "next/link";
import { Button } from "@heroui/button";
import { changeViewDate } from "@/src/utillity/utils";


const RestaurantTable = ({ restaurantData, restaurantSuccess, restaurantLoading, restaurantError, fetchNextPage, hasNextPage, isFetchingNextPage }) => {

  useEffect(() => { console.log('restaurantData?', restaurantData) }, [])

  return (
    <>
      {/* 로딩중 */}
      {restaurantLoading && (
        <>
          {Array(10).fill('1').map((_, idx) => (
            <Fragment key={idx}>
              <div className="flex flex-wrap items-center bg-[#18181b] h-[114px] rounded-[12px] p-[20px] mb-[5px]">
                <Skeleton className='w-[35%] h-[10px] rounded-[20px]' />
                <Skeleton className='w-[70%] h-[10px] rounded-[20px] mt-[13px]' />
                <Skeleton className='w-[100%] h-[10px] rounded-[20px] mt-[3px]' />
              </div>
            </Fragment>
          ))}
        </>
      )}

      {/* 에러 메시지 */}
      {restaurantError && <p>에러 발생</p>}

      {/* 데이터 성공일 때 */}
      <Accordion selectionMode="multiple" variant="splitted" className="px-0">
        {restaurantSuccess && Array.isArray(restaurantData) ? restaurantData?.map(item => {
          return (
            <AccordionItem
              key={item.id}
              aria-label={`Accordion ${item.id}`}
              title={
                <div className="">

                  <div className="flex items-center">
                    <div className="flex items-center">
                      <PiStarFill className="size-[16px] text-[#ebdf32] mr-[5px]" />
                      <span className="text-[13px] text-[#999] flex items-center gap-[1px]">
                        <span className="text-[#ebdf32] font-bold">{Number(item.totalRating).toFixed(1)}</span>
                        <span className="text-[13px]">/</span>5
                      </span>
                    </div>
                    <i className="block size-[3px] bg-[#505050] rounded-[50%] mx-[7px]"></i>
                    <div className="text-[13px] text-[#999]">
                      {changeViewDate(item.created_at, 'day').slice(2)}
                    </div>
                  </div>
                  <div className="text-[16px] mt-[10px]">{item.title}</div>
                  <div className="text-[14px] text-[#999]">{item.content}</div>
                </div>
              }
              className="px-[14px]"
            // startContent={''}
            // subtitle={}
            >
              <RestaurantItem restaurant={item} />
            </AccordionItem>
          )
        }) : null}
      </Accordion>

      {/* 데이터 없을 때 */}
      {restaurantSuccess && restaurantData.length === 0 && (
        <div className="no-data mt-[40px]">
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

      {/* 무한 스크롤 ? 더보기 ? 고민중 */}
      {hasNextPage && (
        <div className="mt-[30px] flex justify-center">
          <Button type="button" variant="shadow" color="default" onPress={() => fetchNextPage()} disabled={isFetchingNextPage}>더 보기</Button>
        </div>
      )}
    </>
  );
}


export default RestaurantTable;

// function onRestaurantListLoadAPI(): { mutate: any; data: any; isError: any; isSuccess: any; } {
//   throw new Error("Function not implemented.");
// }
