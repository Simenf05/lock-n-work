import AsyncStorage from '@react-native-async-storage/async-storage'

import makeStorageFormat from './makeStorageFormat'

export default async () => {

  if (!await AsyncStorage.getItem('lock-n-work')) await makeStorageFormat()
  
  const json = JSON.parse(await AsyncStorage.getItem('lock-n-work'))

  return json
}

