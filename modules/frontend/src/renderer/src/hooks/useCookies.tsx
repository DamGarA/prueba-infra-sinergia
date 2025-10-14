import { useState } from 'react'
import type { CookieKey, CookieOptions } from '@renderer/types'
import { setCookie } from '@renderer/lib/cookies'

export default function useCookies() {
  const [cookies, setCookieState] = useState<Record<CookieKey, string | null | undefined>>(() => {
    const cookies = document.cookie.split('; ').reduce(
      (acc, cookie) => {
        const { 0: key, 1: value } = cookie.split('=') as [CookieKey, string]
        acc[key] = value
        return acc
      },
      {} as Record<CookieKey, string | null | undefined>
    )
    return cookies
  })

  const setCookieHandler = (cookie: CookieOptions) => {
    setCookie(cookie)
    setCookieState((prev) => ({ ...prev, [cookie.name]: cookie.value }))
  }

  return {
    cookies,
    setCookie: setCookieHandler,
  }
}
