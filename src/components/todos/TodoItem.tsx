"use client"
import React, { useState } from 'react'

const TodoItem = ({ todo, setStateodos }) => {

    const [title, setTitle] = useState(todo.title)
    const [isdone, setIsdone] = useState(todo.is_done)
    const [isEditing, setIsEditing] = useState(false)

    const handleChangeTitle = (e) => {
        const target = e.target;
        setTitle(target.value)
    }

    const handleIsDoneToggle = () => {
        setIsdone(!isdone)
    }

    // update
    const handleTodoUpdate = async (id: string) => {

        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
            method:'PUT',
            headers: {"Content-Type": "application/json",},
            body : JSON.stringify({title: title, is_done: isdone}) 

        })

        res.json().then((data) => {
            if(data.state === "SUCCES") { 
                setIsEditing(!isEditing) 
                setStateodos(prev => prev.map(item => {
                    if(item.id === id) {
                        // return { ...item, title: item.title, is_done: item.is_done }
                        return { ...item, title: title, is_done: isdone }
                    }
                    return item
                }))
            
            }
        })
        
    }

    // delete zz
    const handleTotoDelete = async (id: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
            method:'DELETE',
            headers: {"Content-Type": "application/json",},
        })

        res.json().then(res => {
            console.log('델델', res.data)
            setStateodos(prev => prev.filter(item => item.id !== res.data.id))
        })

    }


  return (
    <div key={todo.id} className="flex justify-between border border-solid border-[#333] rounded-[10px] mt-[10px] items-center">
        <div title={todo.id} className="p-[10px]">{todo.id.slice(0, 3)}...</div>
        <div>
            {isEditing ? (
                <span>
                <input type="text" onChange={handleChangeTitle} value={title}/>
                </span>
            ) : (
                <span>
                {todo.title}
                </span>
            )}
        </div>
        <div>
            {isEditing ? (
                <button type='button' onClick={handleIsDoneToggle} className='text-red-500 py-[3px] px-[10px] bg-[#222] rounded-[12px] mx-[5px]'>
                    {isdone === false ? 'no!': 'yes'}
                </button>
            ) : (
                <div>{todo.is_done === false ? 'no!': 'yes'}</div>
            )}
        </div>
        <div>{`${todo.created_at}`}</div>
        {isEditing ? (
            <div>
                <button type="button" data-id={todo.id} onClick={() => handleTodoUpdate(todo.id)} className="text-[#ddd] py-[3px] px-[10px] bg-[#222] rounded-[12px] mx-[5px]">완료</button>
                <button type="button" onClick={() => setIsEditing(!isEditing)} className="text-[#999] py-[3px] px-[10px] bg-[#222] rounded-[12px] mx-[5px]">취소</button>
            </div>
        ) : (
            <div>
                <button type="button" data-id={todo.id} onClick={() => setIsEditing(!isEditing)} className="text-[#ddd] py-[3px] px-[10px] bg-[#222] rounded-[12px] mx-[5px]">수정</button>
                <button type="button" onClick={() => handleTotoDelete(todo.id)} className="text-red-500 py-[3px] px-[10px] bg-[#222] rounded-[12px] mx-[5px]">삭제</button>
            </div>
        )}
        
    </div>
  )
}

export default TodoItem