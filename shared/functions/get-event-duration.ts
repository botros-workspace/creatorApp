import moment from 'moment'

export const getEventDuration = (startTime: string, endTime: string) => {
  let resultString = ''
  const startDate = moment(new Date(startTime))
  const endDate = moment(new Date(endTime))

  let result = parseFloat(
    moment.duration(endDate.diff(startDate)).asHours().toFixed(2)
  )
  if (result >= 24) {
    result = parseFloat(
      moment.duration(endDate.diff(startDate)).asDays().toFixed(0)
    )
    if (result === 1) {
      resultString = result.toString() + ' day'
    } else {
      resultString = result.toString() + ' days'
    }
  } else {
    resultString = result.toString() + ' hours'
  }
  return resultString
}
