import AsyncStorage from '@react-native-async-storage/async-storage'

export default async () => {
  console.log("making json")

  const storageFormat = JSON.stringify({
    /* date: [{startData: value, currentDate/endDate: value}] */
  })

  await AsyncStorage.setItem('lock-n-work', storageFormat)
}
