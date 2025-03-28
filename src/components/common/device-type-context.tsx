'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useMediaQuery } from '@/src/hooks/use-media-query'
import { redirect, useRouter, usePathname } from 'next/navigation'
// import { breakPoints } from '@/lib/common/ui/variables'


export const breakPoints = {
  mo: { max: '1024px' }, // => @media (min-width: 375px), (max-widtn: 1024px)
  pc: '1025px' // => @media (min-width: 1025px) ~
}


interface DeviceTypeProps {
  isMobileQuery: boolean
  isMobile: boolean
  isMobileDevice: boolean
  isBrowser: boolean
  isTablet: boolean
  isIOS: boolean
  isAOS: boolean
  isClient: boolean
}

const DeviceTypeContext = createContext<DeviceTypeProps>({
  isMobileQuery: false,
  isMobile: false,
  isMobileDevice: false,
  isBrowser: false,
  isTablet: false,
  isIOS: false,
  isAOS: false,
  isClient: false
})

export const DeviceType = ({ userAgent = '', children }: { userAgent?: string; children: ReactNode }) => {


  const isMobileDevice = Boolean(
    userAgent
      .toString()
      .toLowerCase()
      .match(/mobile/) ?? false
  )
  let [isMobile, isBrowser, isTablet, isIOS, isAOS, isClient] = [
    false,
    !(isMobileDevice ?? true),
    false,
    false,
    false,
    false
  ]
  const [device, setDevice] = useState<DeviceTypeProps>({
    isMobileQuery: false,
    isMobile: isMobileDevice,
    isMobileDevice: false,
    isBrowser,
    isTablet,
    isIOS,
    isAOS,
    isClient: Boolean(isMobileDevice)
  })
  // server end
  // client start
  const isMobileQuery = useMediaQuery(`(max-width: ${breakPoints.mo.max})`)


  useEffect(() => {
    userAgent = window.navigator.userAgent
    isMobile = Boolean(isMobileDevice || isMobileQuery)
    isBrowser = !isMobile && !isMobileQuery
    isTablet = Boolean(userAgent.match(/ipad/))
    isIOS = Boolean(userAgent.match(/ipad|iphone/))
    isAOS = Boolean(userAgent.match(/android/))
    isClient = true


    setDevice({
      isMobileQuery,
      isMobileDevice,
      isMobile,
      isBrowser,
      isTablet,
      isIOS,
      isAOS,
      isClient
    })
  }, [isMobileQuery])

  return (
    <DeviceTypeContext.Provider value={device}>
      {children}
    </DeviceTypeContext.Provider>
  )
}

export function useDeviceTypeContext() {
  return useContext(DeviceTypeContext)
}
