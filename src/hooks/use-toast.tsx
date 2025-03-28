'use client'

import { notification } from 'antd'

export default function useToast() {
  const [api, contextHolder] = notification.useNotification({
    stack: false,
    maxCount: 1,
    bottom: 20
  })

  return {
    contextHolder,
    openToast(delay = 3, text = '텍스트를 입력해주세요.', isDark = false) {
      api.open({
        message: (
          <span
            style={{
              color: isDark ? 'white' : 'black',
              whiteSpace: 'pre-line'
            }}
          >
            {text}
          </span>
        ),
        placement: 'bottom',
        className: 'pop-toast',
        duration: delay,
        closeIcon: false,
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '351px',
          textAlign: 'center',
          height: text?.includes('\n') ? '80px' : '40px',
          padding: text?.includes('\n') ? '20px 16px' : '10px 16px',
          background: isDark ? 'black' : 'white'
        }
      })
    }
  }
}
