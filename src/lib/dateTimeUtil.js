import moment from 'moment'

export const formatDateTime = (dateTime, format) => {
  let text = ''
  let dateTimeUnix = ''
  dateTimeUnix = dateTime && moment.unix(dateTime).utcOffset(0)
  const dateStr = moment(dateTime)

  const validDate = moment(dateTimeUnix, moment.ISO_8601).isValid() ? dateTimeUnix : dateStr

  const dateTimeLocal = new Date(validDate)
  text = moment(dateTimeLocal).format(format)

  return text
}

const prevmidnight = moment(
  moment()
    .utcOffset(7)
    .subtract(1, 'd')
    .format('YYYY-MM-DD 23:59:00')
)

const midnight = moment(
  moment()
    .utcOffset(7)
    .format('YYYY-MM-DD 23:59:00')
)

const tomorrowMidnight = moment(
  moment()
    .utcOffset(7)
    .add(1, 'd')
    .format('YYYY-MM-DD 23:59:00')
)

export const isToday = startTime => {
  let matchTime = startTime && moment.unix(startTime).utcOffset(0)
  if (moment(matchTime).isAfter(prevmidnight) && moment(matchTime).isBefore(midnight)) {
    return true
  }
  return false
}

export const isTomorrow = startTime => {
  let matchTime = startTime && moment.unix(startTime).utcOffset(0)
  if (moment(matchTime).isAfter(midnight) && moment(matchTime).isBefore(tomorrowMidnight)) {
    return true
  }
  return false
}

//nanti ganti penamaan jadi isTimePassed aja biar lebih global
export const isMatchPassed = endTime => {
  let matchTime = endTime && moment.unix(endTime).utcOffset(0)
  if (moment(matchTime).isBefore()) {
    return true
  }
  return false
}

//nanti ganti penamaan jadi isLive aja biar lebih global
export const isMatchLive = (startTime, endTime) => {
  let endDateTime = formatDateTime(endTime, 'HH:mm')
  let startDateTime = formatDateTime(startTime, 'HH:mm')
  let currentTime = moment().format('HH:mm')
  if (isToday(startTime) && currentTime >= startDateTime && currentTime <= endDateTime) {
    return true
  }
  return false
}

export const addDateTime = (dateTime, duration, type) => {
  let dt = dateTime ? moment(dateTime) : moment()
  return dt.add(duration, type)
}

const selectedMidnight = compareDateTime => {
  const result = compareDateTime
    ? moment(
        moment(compareDateTime)
          .utcOffset(7)
          .format('YYYY-MM-DD 23:59:00')
      )
    : moment(
        moment()
          .utcOffset(7)
          .format('YYYY-MM-DD 23:59:00')
      )
  return result
}

const selectedPrevmidnight = compareDateTime => {
  const result = compareDateTime
    ? moment(
        moment(compareDateTime)
          .utcOffset(7)
          .subtract(1, 'd')
          .format('YYYY-MM-DD 23:59:00')
      )
    : moment(
        moment()
          .utcOffset(7)
          .subtract(1, 'd')
          .format('YYYY-MM-DD 23:59:00')
      )
  return result
}

//example: selectedDate = 20 Juni, compare Date = 22 Juni
//result: false
//example: selectedDate = 20 Juni, compare Date = 20 Juni
//result: true
export const isSameDay = (selectedDateTime, compareDateTime) => {
  let dt = selectedDateTime && moment.unix(selectedDateTime).utcOffset(0)
  let cdt = compareDateTime && moment.unix(compareDateTime).utcOffset(0)
  const isAfter = moment(cdt).isAfter(selectedPrevmidnight(dt))
  const isBefore = moment(cdt).isBefore(selectedMidnight(dt))
  if (isAfter && isBefore) {
    return true
  }
  return false
}

export const isLastWeek = startTime => {
  let thisWeek = moment()
    .isoWeekday(1)
    .week() // now

  let lastWeek = thisWeek === 1 ? 52 : thisWeek - 1

  let strTime = moment.unix(startTime)
  let weekValidate = moment(strTime)
    .isoWeekday(1)
    .week()

  if (lastWeek === weekValidate) {
    return true
  }
  return false
}

export const isThisWeek = startTime => {
  let thisWeek = moment()
    .isoWeekday(1)
    .week() // now

  let strTime = moment.unix(startTime)
  let weekValidate = moment(strTime)
    .isoWeekday(1)
    .week()

  if (thisWeek === weekValidate) {
    return true
  }
  return false
}

export const isNextWeek = startTime => {
  let thisWeek = moment()
    .isoWeekday(1)
    .week() // now

  let nextWeek = thisWeek === 52 ? 1 : thisWeek + 1

  let strTime = moment.unix(startTime)
  let weekValidate = moment(strTime)
    .isoWeekday(1)
    .week()

  if (nextWeek === weekValidate) {
    return true
  }
  return false
}
