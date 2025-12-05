'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface ScrollProps {
  elem?: Element
  renderCondition?: (y: number, e?: Event) => boolean
}

const useScroll = ({ elem, renderCondition }: ScrollProps) => {
  const [y, setY] = useState(0)
  const [direction, setDirection] = useState<'up' | 'down' | ''>('')
  // addEventListener 반복 방지를 위해 renderCondition은 ref로 고정
  // 하지만 변경되면 적용되야되므로 useEffect로 감지
  const renderConditionRef = useRef(renderCondition)


  useEffect(() => {
    renderConditionRef.current = renderCondition
  }, [renderCondition])

  // 렌더는 트리거하진 않지만 y좌표는 필요한 경우
  const yRef = useRef(0)

  const handleNavigation = useCallback(
    (e: Event) => {
      const pointY = elem ? elem.scrollTop : window.scrollY
      yRef.current = pointY
      if (
        !renderConditionRef?.current ||
        renderConditionRef.current(pointY, e)
      ) {
        if (y > pointY) {
          setDirection('up')
        } else if (y < pointY) {
          setDirection('down')
        }
        setY(pointY)
      }
    },
    [elem, y]
  )


  useEffect(() => {
    if (elem) {
      elem.removeEventListener('scroll', handleNavigation)
      elem.addEventListener('scroll', handleNavigation)
    } else {
      window.removeEventListener('scroll', handleNavigation)
      window.addEventListener('scroll', handleNavigation)
    }

    return () => {
      if (elem) {
        elem.removeEventListener('scroll', handleNavigation)
      } else {
        window.removeEventListener('scroll', handleNavigation)
      }
    }
  }, [elem, handleNavigation])
  return { y, direction, yRef }
}

export default useScroll
