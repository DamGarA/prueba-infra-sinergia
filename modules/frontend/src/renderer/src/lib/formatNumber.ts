type FormatNumberProps = {
  value: number | bigint
  locales?: string | string[] | undefined
  option?: Intl.NumberFormatOptions | undefined
}
export const formatNumber = ({
  value,
  locales = 'de-DE',
  option = { currency: 'USD', style: 'currency' }
}: FormatNumberProps): string => {
  try {
    return new Intl.NumberFormat(locales, option).format(value)
  } catch (error) {
    console.error(error)
    return ''
  }
}
