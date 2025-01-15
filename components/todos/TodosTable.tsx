"use client"

import React, { useEffect, useState } from "react";
// import {div, divHeader, div, div, div, div} from "@nextui-org/react";
import { Todo } from '@/types/index';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import TodoItem from "./TodoItem";


const Todosdiv = ({ todos }: { todos: Todo[] }) => {


  const [stateTodos, setStateodos] = useState(todos)


  const [test, setTest] = useState([
    {
      created_at: "2025-01-15T08:20:47.684Z",
      id: "cdXolVC6Ew899ALKPIbN",
      is_done: false,
      title: "asdasdasd"
    },
    {
      created_at: "2025-01-15T08:20:47.684Z",
      id: "cdXolVC6Ew899ALKPIbN",
      is_done: false,
      title: "asdasdasd123213123"
    },
    {
      created_at: "2025-01-15T08:20:47.684Z",
      id: "cdXolVC6Ew899ALKPIbN",
      is_done: false,
      title: "asdasdasd hhohoho"
    },
  ]
  )


  const [text, setText] = useState('');

  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setText(target.value)
  }




  useEffect(() => {
    console.log('todos??', stateTodos)
  }, [])




  const handleTodoSubmit = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({ title: text, is_done: false })
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/`, options)
    const data = await res.json();
    // console.log('data???', data)

    setStateodos(prev => [data.data, ...prev])
    // console.log(res.json());
  }



  const handleTestFn = () => {
    //한번 실행하면 여기를 실행
    return () => {
      // 두번 실행하면 여기를 실행 
      return () => {
        // 세번 실행하면 여기를 실행 
      }
    }
  }




  return (
    <div>
      <div className="my-[50px]">
        <Input
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
        />
      </div>


      <div className="w-[800px]">
        <div className="flex justify-start gap-[20px]">
          <div>아이디</div>
          <div>할일내용</div>
          <div>완료여부</div>
          <div>생성일</div>
        </div>



        {test && test.map((item) => (
          <div key={item.title}>
            {item.title}
          </div>
        ))}

        <div>
          {stateTodos && stateTodos.map((todo: Todo) => (
            <TodoItem todo={todo} key={todo.id} setStateodos={setStateodos} />
          ))}
        </div>
      </div>

    </div>

  );
}


export default Todosdiv;