import AsyncStorage from '@react-native-async-storage/async-storage'

import makeStorageFormat from './makeStorageFormat'

export default async (startDate, currentDate) => {

  AsyncStorage.clear()

  const dates = getDates(startDate, currentDate)

  if (!await AsyncStorage.getItem('lock-n-work')) await makeStorageFormat()

  const json = JSON.parse(await AsyncStorage.getItem('lock-n-work'))

  dates.forEach((date) => {

    const workArr = []
    if (json[date.toDateString()]) json[date.toDateString()].forEach(element => workArr.push(element))

    let workInfo
    const dateTime = date.getTime()

    if (date.getFullYear() === currentDate.getFullYear()) {
      const currentDateTime = currentDate.getTime()

      workInfo = {
        startDate: 1708336934337 /*dateTime*/,
        endDate: 1708336934337 + 3600000 * 3.5 /*currentDateTime*/,
      }
    }
    else {
      date.setHours(23, 59, 59, 999)
      const currentDateTime = date.getTime()

      workInfo = {
        startDate: dateTime,
        endDate: currentDateTime,
      }
    }

    workArr.push(workInfo)

    json[date.toDateString()] = workArr

  })
  
  await AsyncStorage.setItem('lock-n-work', JSON.stringify(json))
}


const getDates = (startDate, currentDate) => {
  const dates = []

  while (startDate <= currentDate) {
    dates.push(new Date(startDate))
    startDate.setDate(startDate.getDate() + 1)
  }

  return dates
}

