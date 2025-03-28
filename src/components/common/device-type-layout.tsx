import { ReactNode } from 'react'
import { headers } from 'next/headers'
import { DeviceType } from '@/src/components/common/device-type-context'

type PropsType = {
  children: ReactNode
}

const DeviceTypeLayout = ({ children }: PropsType) => {
  const userAgent = (typeof window === 'undefined' ? headers().get('user-agent') : window.navigator.userAgent) ?? ''


  return <DeviceType userAgent={userAgent}>{children}</DeviceType>
}

export default DeviceTypeLayout
