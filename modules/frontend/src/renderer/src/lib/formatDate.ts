type FormatDateProps = {
  date: number | Date | undefined
  locales?: string | string[] | undefined
  option?: Intl.DateTimeFormatOptions | undefined
}
export const formatDate = ({
  date,
  locales = 'es-ES',
  option = { dateStyle: 'long' }
}: FormatDateProps): string => {
  try {
    return new Intl.DateTimeFormat(locales, option).format(date)
  } catch (error) {
    console.error(error)
    return ''
  }
}
