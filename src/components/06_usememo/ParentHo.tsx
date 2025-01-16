"use client"

import React, { useCallback, useState, useMemo } from 'react'
import Children from '@/src/components/06_usememo/Children'
import ChildrenHo from '@/src/components/06_usememo/ChildrenHo'


// for (let i = 0; i < 1000000000000; i++) {

// }

const ParentHo = () => {

  console.log('여기는 부모')

  const [n, setN] = useState(1)
  const [n2, setN2] = useState(1) //복잡한 계산
  const handleClick = () => {
    setN(prev => prev + 1)
  }


  const 복잡한계산 = useMemo(() => {
    let a = 0
    // for (let i = 0; i < 1000000000000; i++) {
    // a = i
    // }

    return a
  }, [])

  const handleClick_2 = useCallback(() => {
    // 복잡한 계산
    setN2(prev => prev + 1)
  }, [n2])


  return (
    <div className='border border-solid border-red-500'>
      <h2>ParentHo {n} {n2}</h2>
      <button type='button' onClick={handleClick}>부모 ++</button>
      <button type='button' onClick={handleClick_2}>handleClick_2</button>
      <Children />
      <ChildrenHo />
    </div>
  )
}

export default ParentHo

// http://localhost:4000/fo/mypage/SB-FO-MP-POPUP
// 배송비 결제(SB - HFO - MP-00204)

// https://dev-pub.i-screammall.co.kr/fo/mypage/SB-HFO-MP-00211-POPUP
// 주문취소 2단계(추가 배송비 존재 시)(SB - HFO - MP -00209)

// https://dev-pub.i-screammall.co.kr/fo/mypage/SB-HFO-MP-00216-POPUP
// 교환신청 3단계(SB - HFO - MP-00215)

// https://dev-pub.i-screammall.co.kr/fo/mypage/SB-HFO-MP-00222-POPUP
// 반품신청 3단계(SB - HFO - MP-00220)
