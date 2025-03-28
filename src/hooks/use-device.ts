'use client'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useEffect, useState } from 'react'

interface DeviceType {
  isMobileQuery: boolean
  isMobile: boolean
  isBrowser: boolean
  isTablet: boolean
  isIOS: boolean
  isAOS: boolean
}

/**
 * Client Only
 * required "use client"
 */
export const useDevice = (): DeviceType => {
  const isMobileQuery = useMediaQuery('(max-width: 1024px)')
  let [ua, isMobile, isBrowser, isTablet, isIOS, isAOS] = [
    '',
    false,
    false,
    false,
    false,
    false
  ]
  if (useIsClient()) {
    ua = window.navigator.userAgent.toLowerCase()
    isMobile = Boolean(ua.match(/(mobile|iphone|android|ios)/)) || isMobileQuery
    isBrowser =
      (Boolean(ua.match(/^((?!mobile).)*$/gms)) as boolean) && !isMobileQuery
    isTablet = Boolean(ua.match(/ipad/))
    isIOS = Boolean(ua.match(/ipad|iphone/))
    isAOS = Boolean(ua.match(/android/))
  }
  return {
    isMobileQuery,
    isMobile,
    isBrowser,
    isTablet,
    isIOS,
    isAOS
  }
}

const useIsClient = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}
