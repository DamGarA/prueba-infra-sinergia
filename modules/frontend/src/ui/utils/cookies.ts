import type { CookieKey, CookieOptions } from '@/types'

export const getCookie = (key: CookieKey) => {
  if (!window.document.cookie) {
    return null
  }
  const decodedCookie = decodeURIComponent(window.document.cookie)
  const listOfCookies = decodedCookie.split('; ')
  const cookieKeyValue = listOfCookies.find((cookie) => cookie.startsWith(key))
  return cookieKeyValue?.split('=')[1]
}

export const setCookie = ({ name, value, maxAge, expires, path, secure, httpOnly, sameSite }: CookieOptions) => {
  const day = 60 * 60 * 24
  const baseCookie = {
    value: `${name}=${value}`,
  }
  if (path) {
    baseCookie.value += `;path=${path}`
  }
  if (maxAge && maxAge >= 0) {
    baseCookie.value += `;max-age=${day * maxAge}`
  }
  if (expires) {
    baseCookie.value += `;expires=${expires}`
  }
  if (sameSite) {
    baseCookie.value += `;SameSite=${sameSite}`
  }
  if (secure) {
    baseCookie.value += ';Secure'
  }
  if (httpOnly) {
    baseCookie.value += ';HttpOnly'
  }
  if (path) {
    baseCookie.value += `;path=${path}`
  }
  // biome-ignore lint/suspicious/noDocumentCookie: false positive
  document.cookie = baseCookie.value
}
