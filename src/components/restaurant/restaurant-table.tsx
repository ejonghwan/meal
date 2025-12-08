"use client"

import React, { Fragment, useEffect, useState } from "react";
import RestaurantItem from "@/src/components/restaurant/restaurant-item";


import { Accordion, AccordionItem } from "@heroui/accordion";
import { PiBowlFoodDuotone, PiStarDuotone, PiStarFill, PiCakeDuotone, PiChatTeardropDotsDuotone, PiHeartDuotone } from "react-icons/pi";
import { Button } from "@heroui/button";
import { changeViewDate, timeForToday } from "@/src/utillity/utils";
import Link from "next/link";
import RestaurantSkeleton from "@/src/components/restaurant/restaurant-skeleton";
import { useSearchParams } from 'next/navigation'


const RestaurantTable = ({ restaurantData, restaurantSuccess, restaurantLoading, restaurantError, fetchNextPage, hasNextPage, isFetchingNextPage }) => {

  // useEffect(() => { console.log('restaurantData?', restaurantData, 'ㅗㅁㄴ?', hasNextPage) }, [])


  const searchParams = useSearchParams()
  const category = searchParams.get('search') || '전체'

  const handleClickNextPage = () => {
    fetchNextPage()
  }


  return (
    <>
      {/* 로딩중 */}
      {restaurantLoading && <RestaurantSkeleton len={5} />}

      {/* 에러 메시지 */}
      {restaurantError && <p>에러 발생</p>}

      {/* 데이터 성공일 때 */}
      <Accordion selectionMode="multiple" variant="splitted" className="px-0">
        {restaurantSuccess && Array.isArray(restaurantData) ? restaurantData?.map(item => {
          return (
            <AccordionItem
              classNames={{
                indicator: "rotate-[270deg] data-[open=true]:rotate-[90deg]",
                content: "pb-[30px]"
              }}
              key={item.id}
              aria-label={`Accordion ${item.id}`}
              title={
                <>
                  <div className="flex ">
                    <div className="flex flex-wrap items-center">
                      <span className="text-[13px] text-[#999]">{item.user.displayName}</span>
                      <i className="block size-[2px] bg-[#505050] rounded-[50%] mx-[5px]"></i>
                      <div className="text-[13px] text-[#999]">
                        {changeViewDate(item.created_at, 'day').slice(2)}&nbsp;
                      </div>
                      {item.updated_at && <i className="block size-[2px] bg-[#505050] rounded-[50%] mx-[5px]"></i>}
                      <div className="text-[13px] text-[#999]">
                        {item.updated_at && <span className="text-[13px]">{timeForToday(item.updated_at)} 수정</span>}
                      </div>


                    </div>

                    <div className="flex gap-[10px] ml-auto mr-[-25px]">
                      {/* 댓글 + 대댓글 개수 */}
                      <span className="flex items-center text-[13px] text-[#999]">
                        <PiHeartDuotone className={`${item.hasMyLike ? 'text-[#ff5151]' : ''} size-[20px] mr-[2px]`} />
                        {Number(item.like)}
                      </span>
                      <span className="flex items-center text-[13px] text-[#999] relative">
                        <PiChatTeardropDotsDuotone className={`${item.hasMyComment ? 'text-[#e0e5e7]' : ''} size-[20px] mr-[2px]`} />
                        {/* {item.hasMyComment && <span className="absolute top-[-16px] left-[2px] text-[11px] animate-bounce">my</span>} */}
                        {/* <PiChatTeardropDotsDuotone className={`${item.hasMyComment ? 'my_comment' : ''} size-[20px] mr-[2px]`} /> */}
                        {Number(item.commentCount ? item.commentCount : 0) + Number(item.recommentCount ? item.recommentCount : 0)}
                      </span>
                    </div>
                  </div>


                  <div className="flex items-center">
                    {/* 평점 */}
                    <PiStarFill className="size-[16px] text-[#ebdf32] mr-[5px]" />
                    <span className="text-[13px] text-[#999] flex items-center gap-[1px]">
                      <span className="text-[#ebdf32] font-medium">{Number(item.totalRating).toFixed(1)}</span>
                      <span className="text-[13px] ">/</span>5
                    </span>

                  </div>

                  <div className="text-[16px] mt-[10px] eps-1">{item.title}</div>
                  <div className="text-[14px] text-[#999] min-h-[24px] eps-2 mt-[5px]">{item.content}</div>
                </>
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
          <Link href={`/restaurant?search=${category}`} className="flex flex-wrap w-full justify-center">
            <div className="flex justify-center w-full">
              <PiBowlFoodDuotone className="text-[70px]" />
            </div>
            <span className="text-[14px] mt-[10px] underline">맛집 등록하러 가기</span>
          </Link>
        </div>
      )}

      {/* 무한 스크롤 ? 더보기 ? 고민중 */}
      {/* 캐시수정하면서 이거 쿼리키 캐시 잘못됨  */}
      {hasNextPage && (
        <>
          <div className="mt-[30px] flex justify-center">
            <Button type="button" variant="shadow" color="default" onPress={handleClickNextPage} isLoading={isFetchingNextPage} disabled={isFetchingNextPage}>더 보기</Button>
          </div>
          {isFetchingNextPage && <RestaurantSkeleton len={3} />}
        </>
      )}
    </>
  );
}


export default RestaurantTable;

// function onRestaurantListLoadAPI(): { mutate: any; data: any; isError: any; isSuccess: any; } {
//   throw new Error("Function not implemented.");
// }
