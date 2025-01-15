import React from 'react'
import { Menu } from '@/types/info'



// extends
interface OwnProps extends Menu {
    bestMenuFn(name: string): string
}

/*
 type 으로 extends 사용하는 방법
 type OwnProps = Menu & {
   bestMenuFn(name: string): string
 }
*/


/*
## BestMenu에서 선언된 아래 소스에서 Menu안에 price만 빼고 싶다면? 

> BestMenu 컴포넌트 상단 타입
interface OwnProps extends Menu {
    bestMenuFn(name: string): string
}

> 이렇게 적으면 됨
interface OwnProps extends Omit<Menu, 'price'> {
    bestMenuFn(name: string): string
}
*/


// const BestMenu:React.FC<OwnProps> = ({ name, category, price, bestMenuFn }) => {
const BestMenu = ({ name, category, price, bestMenuFn }: OwnProps) => {


    const handleCLick = () => {
        console.log( bestMenuFn('zzzz') );
    }

  return (
    <div>
        <h1>BestMenu</h1>
        {name}
        {category}
        {price}
        <button type="button" onClick={handleCLick}>name?</button>
    </div>
  )
}

export default BestMenu