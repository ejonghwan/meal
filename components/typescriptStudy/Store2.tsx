import React from 'react'
import { Info } from '@/types/info' 


// 다른 파일에서 받아올 경우

interface OwnProps {
    data: Info
}



const Store: React.FC<OwnProps> = ({ data }) => {
  return (
    <div>
        {data.name}
    </div>
  )
}

export default Store