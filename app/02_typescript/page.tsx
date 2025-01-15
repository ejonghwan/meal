"use client"

import React, { useState } from 'react'
import Store from '@/components/typescriptStudy/Store'
import BestMenu from '@/components/typescriptStudy/BestMenu'


interface Info {
    name: string;
    category: string;
    address: Address;
    menu: Menu[]
}

interface Address {
    city: string
    detail: string
    zipCode: number
}

interface Menu {
    name: string; 
    price: number; 
    category: string;
}





const TypescriptPage: React.FC = () => {


    const data: Info = {
        name: 'a',
        category: 'western',
        address: {
            city: 'city',
            detail: 'somewhere',
            zipCode: 123123
        },
        menu: [
            { name: 'hoho1', price: 2000, category: 'pasta1' },
            { name: 'hoho2', price: 3000, category: 'pasta2' },
            { name: 'hoho3', price: 4000, category: 'pasta3' },
            { name: 'hoho4', price: 5000, category: 'pasta4' },
        ]
    }


    const [myData, setMyData] = useState<Info>(data);
    const changeAddress = (address: Address) => {
        setMyData({ ...myData, address })
    }


    const bestMenuFn = (name: string) => {
        return name
    }



  return (
    <div>
        <Store data={myData} changeAddress={changeAddress} />
        <BestMenu name="불고기피자" category="피자" price={10000} bestMenuFn={bestMenuFn} />
    </div>
  )
}

export default TypescriptPage