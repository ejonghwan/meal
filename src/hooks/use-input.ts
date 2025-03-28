import { ChangeEvent, useEffect, useState } from 'react'

export default function useInput(initValue: any) {
  const [value, setValue] = useState(initValue)

  const changeHandler = (e: ChangeEvent<HTMLInputElement> | string) => {
    let maxLength = -1
    let value = ''
    if (typeof e === 'string') {
      value = e
    } else {
      const len = e.target.getAttribute('maxlength')
      maxLength = len ? Number(len) : -1
      value = e.target.value
    }

    if (maxLength > 0 && value.length > maxLength) {
      value = value.slice(0, maxLength)
    }
    setValue(value)
  }
  const resetValue = (e: MouseEvent | string) => {
    if (typeof e === 'object' && e.type === 'click') {
      e.preventDefault()
    }
    setValue('')
  }

  useEffect(() => {
    // console.log("value", value)
  }, [value])
  return [value, changeHandler, setValue, resetValue]
}
