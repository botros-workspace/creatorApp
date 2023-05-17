import moment from 'moment'

export const getFinishTime = (startDate: string) => {
  const resultTimeStamp = new Date(startDate).getTime() + 2 * 60 * 60 * 1000
  // const result = new Date(resultTimeStamp)
  // let resultHour: string = result.getHours().toString()
  // if (result.getHours() >= 0 || result.getHours() < 10) {
  //   resultHour = '0' + resultHour
  // }
  // const resultDate =
  //   result.getFullYear() +
  //   '-' +
  //   (result.getMonth() + 1) +
  //   '-' +
  //   result.getDate() +
  //   'T' +
  //   resultHour +
  //   ':' +
  //   result.getMinutes()
  // console.log('starting date', startDate)
  // console.log(
  //   'finishing date',

  // )

  return moment(new Date(resultTimeStamp)).format('YYYY-MM-DDTHH:mm')
}
