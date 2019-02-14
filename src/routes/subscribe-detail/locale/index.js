import localeEN from './en.json'
import localeID from './id.json'

export const getLocale = (lang = 'id') => {
  switch (lang) {
    case 'id':
      return localeID
    case 'en':
      return localeEN
    default:
      return localeID
  }
}
