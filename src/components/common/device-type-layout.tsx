import { ReactNode } from 'react'
import { DeviceType } from '@/src/components/common/device-type-context'

type PropsType = {
  children: ReactNode
  params?: any
  searchParams?: any
  // Next.js 16에서 새로 추가됨
  request?: Request
}

const DeviceTypeLayout = ({ children, request }: PropsType) => {
  // Server 환경: request.headers 사용
  const userAgent = typeof window === 'undefined'
    ? request?.headers.get('user-agent') ?? ''
    : window.navigator.userAgent

  return <DeviceType userAgent={userAgent}>{children}</DeviceType>
}

export default DeviceTypeLayout


// import { ReactNode } from 'react'
// import { headers } from 'next/headers'
// import { DeviceType } from '@/src/components/common/device-type-context'

// type PropsType = {
//   children: ReactNode
// }

// const DeviceTypeLayout = ({ children }: PropsType) => {
//   const userAgent = (typeof window === 'undefined' ? headers().get('user-agent') : window.navigator.userAgent) ?? ''


//   return <DeviceType userAgent={userAgent}>{children}</DeviceType>
// }

// export default DeviceTypeLayout
