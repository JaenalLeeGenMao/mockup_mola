import moment from 'moment'

export const convertToLocalDateTime = unix => {
  const getLocalDate = moment.unix(unix).utc()
  const date = new Date(getLocalDate)
  return date
}

export const isMatchLive = (startTime, endTime) => {
  const start = moment(convertToLocalDateTime(moment().unix())).isBefore(convertToLocalDateTime(startTime), 'minutes')
  const end = moment(convertToLocalDateTime(moment().unix())).isBefore(convertToLocalDateTime(endTime), 'minutes')
  let isLive = false
  if (!start && end) {
    isLive = true
  }
  return isLive
}

export const isMatchPassed = endTime => {
  return moment(convertToLocalDateTime(moment().unix())).isAfter(convertToLocalDateTime(endTime), 'minutes')
}

export const timeDiff = (current, dateCompare, type = 'days') => {
  const currentLocalTime = convertToLocalDateTime(current)
  const dateCompareLocalTime = convertToLocalDateTime(dateCompare)
  const compare = moment(currentLocalTime).diff(dateCompareLocalTime, type)

  return compare
}
