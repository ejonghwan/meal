"use client"

import React, { useEffect, useState } from "react";
import TodoItem from "./restaurant-item";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { useRestaurantListAll } from '@/src/store/queryies/restaurant/restaurantQueries'




const RestaurantTable = ({ todos }) => {

  const [stateTodos, setStateodos] = useState(todos)
  // const { data: restaurantData, isError: restaurantError, isSuccess: restaurantSuccess, isLoading: restaurantLoading } = useRestaurantListAll(10)



  // useEffect(() => {
  //   if (restaurantSuccess && restaurantData.data) {

  //   }

  //   if (restaurantError) {

  //   }
  // }, [restaurantData, restaurantLoading])
  // const [text, setText] = useState('');

  // const handleInputChange = (e: Event) => {
  //   const target = e.target as HTMLInputElement;
  //   setText(target.value)
  // }




  // const handleTodoSubmit = async () => {
  //   const options = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json", },
  //     body: JSON.stringify({ title: text, is_done: false })
  //   }

  //   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/`, options)
  //   const data = await res.json();
  //   // console.log('data???', data)

  //   setStateodos(prev => [data.data, ...prev])
  //   // console.log(res.json());
  // }




  return (
    <div>

      <Accordion>
        <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
          aa 1
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          aa2
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          aa3
        </AccordionItem>
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


      <div className="w-[800px]">
        <div className="flex justify-start gap-[20px]">
          <div>아이디</div>
          <div>할일내용</div>
          <div>완료여부</div>
          <div>생성일</div>
        </div>

        <div>
          {stateTodos && stateTodos.map((todo) => (
            <TodoItem todo={todo} key={todo.id} setStateodos={setStateodos} />
          ))}
        </div>
      </div>

    </div>

  );
}


export default RestaurantTable;

// function onRestaurantListLoadAPI(): { mutate: any; data: any; isError: any; isSuccess: any; } {
//   throw new Error("Function not implemented.");
// }
