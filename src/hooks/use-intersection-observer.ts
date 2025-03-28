'use client'
import { useEffect, useRef } from 'react'

const useIntersectionObserver = (
  interCallback?: (entry: any) => void,
  isNotInterCallback?: (entry: any) => void,
  options?: any
) => {
  const observer = useRef<any>(null)

  const observe = (element: HTMLElement | null) => {
    // console.log('ob fn ??', element)
    if (element === undefined || element === null) return
    observer.current.observe(element)
  }

  const unobserve = (element: HTMLElement | null) => {
    if (element === undefined || element === null) return
    observer.current.unobserve(element)
  }

  const disconnect = () => {
    observer.current.disconnect()
  }

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            interCallback && interCallback(entry)
          } else {
            isNotInterCallback && isNotInterCallback(entry)
          }
        })
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
        ...options
      }
    )

    return () => {
      observer.current.disconnect()
    }
  }, [])

  return { observe, unobserve, disconnect }
}

export default useIntersectionObserver
