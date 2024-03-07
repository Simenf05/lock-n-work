import { StyleSheet, View } from 'react-native'
import { useState, useEffect } from 'react'

import Button from './Button'

export default function WorkButton({ title, setTimerOn, setValue, timerOn }) {
  const [disabled, setDisabled] = useState(setValue)

  useEffect(() => {
    setDisabled(disabled => !disabled)
  }, [timerOn])

  const press = () => {
    setTimerOn(setValue)
  }

  return (
    <View style={styles.container}> 
      <Button title={title} onPress={() => press()} disabled={disabled}/> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 100
  },
})


