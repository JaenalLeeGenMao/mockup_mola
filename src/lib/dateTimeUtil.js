import moment from 'moment'

export const formatDateTime = (dateTime, format) => {
  let text = ''
  let dateTimeUnix = ''
  dateTimeUnix = dateTime && moment.unix(dateTime).utcOffset(0)
  const dateStr = moment(dateTime);

  const validDate = moment(dateTimeUnix, moment.ISO_8601).isValid() ? dateTimeUnix : dateStr;

  const dateTimeLocal = new Date(validDate);
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

export const isToday = (startTime) => {
  let matchTime = startTime && moment.unix(startTime).utcOffset(0)
  if (moment(matchTime).isAfter(prevmidnight) && moment(matchTime).isBefore(midnight)) {
    return true;
  }
  return false;
}

export const isTomorrow = (startTime) => {
  let matchTime = startTime && moment.unix(startTime).utcOffset(0)
  if (moment(matchTime).isAfter(midnight) && moment(matchTime).isBefore(tomorrowMidnight)) {
    return true;
  }
  return false;
}

export const isMatchPassed = (endTime) => {
  let matchTime = endTime && moment.unix(endTime).utcOffset(0)
  if (moment(matchTime).isBefore()) {
    return true;
  }
  return false;
}

export const isMatchLive = (startTime, endTime) => {
  let endDateTime = formatDateTime(endTime, 'HH:mm')
  let startDateTime = formatDateTime(startTime, 'HH:mm')
  let currentTime = moment().format('HH:mm')
  if (isToday(startTime) && currentTime >= startDateTime && currentTime <= endDateTime) {
    return true
  }
  return false
}
