import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const useToggleMenu = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const pathname = usePathname()

  // 페이지 이동시 메뉴 닫기
  useEffect(() => {
    setIsOpenMenu(false)
  }, [pathname])
  const onToggleMenu = () => setIsOpenMenu(!isOpenMenu)
  const onCloseMenu = () => setIsOpenMenu(false)

  return { onToggleMenu, onCloseMenu, isOpenMenu }
}

export default useToggleMenu
