"use client"

import React, { useEffect, useState } from "react";
import RestaurantItem from "@/src/components/restaurant/restaurant-item";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { useRestaurantListAll } from '@/src/store/queryies/restaurant/restaurantQueries'




const RestaurantTable = () => {
  const { data: restaurantData, isError: restaurantError, isSuccess: restaurantSuccess, isLoading: restaurantLoading } = useRestaurantListAll(10)

  useEffect(() => {
    console.log('??', restaurantData)
  }, [restaurantSuccess])





  return (
    <div>

      <Accordion>
        {restaurantData.map((item) => {
          return (
            <AccordionItem key={item.id} aria-label={`Accordion ${item.id}`} title={item.title}>
              <RestaurantItem restaurant={item}  />
            </AccordionItem>
          )
        })}
       
      </Accordion>

      <div className="my-[50px]">
        {/* <Input
          attr={{
            type: "text",
            placeholder: "할일입력",
            value: text,
          }}
          handleInputChange={handleInputChange}

        />
        <Button
          attr={{
            type: 'button',
            style: { border: '1px solid #ddd', padding: "5px 10px", borderRadius: "14px" },
            title: "asdasd"
          }}
          content="할일 입력"
          onClick={handleTodoSubmit}
        /> */}
      </div>


      <div className="">
        <div className="flex justify-start gap-[20px]">
          <div>아이디</div>
          <div>할일내용</div>
          <div>완료여부</div>
          <div>생성일</div>
        </div>

        <div>
          {/* {stateTodos && stateTodos.map((todo) => (
            <TodoItem todo={todo} key={todo.id} setStateodos={setStateodos} />
          ))} */}
        </div>
      </div>

    </div>

  );
}


export default RestaurantTable;

// function onRestaurantListLoadAPI(): { mutate: any; data: any; isError: any; isSuccess: any; } {
//   throw new Error("Function not implemented.");
// }
