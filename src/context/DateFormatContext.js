import { createContext, useState } from 'react'

export const DateOnly = 'date-only'
export const ISO8061 = 'iso8061'

export const DateFormatContext = createContext({
  dateFormat: DateOnly
})

export const DateFormatContextProvider = DateFormatContext.Provider

export const useDateFormatContext = () => {
  const [context, setContext] = useState({ dateFormat: DateOnly })
  const setDateFormat = (value) => {
    switch (value) {
      case ISO8061:
        return setContext({ dateFormat: ISO8061 })
      case DateOnly:
      default:
        return setContext({ dateFormat: DateOnly })
    }
  }
  return [context, setDateFormat]
}
