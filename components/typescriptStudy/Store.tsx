import React from 'react'


interface Info {
    data: {
        name: string;
        category: string;
        address: Address;
        menu: Menu[]
    },
    changeAddress(address: Address): void
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


// 다른 파일에서 받아올 경우 이렇게 적어줘도 됨
// interface OwnProps {
//     data: Info
// }



const Store: React.FC<Info> = ({ data }) => {
  return (
    <div>
        {data.name}
    </div>
  )
}

export default Store