import { View, StyleSheet, Text } from 'react-native'
import { useState, useEffect, useRef } from 'react'

import Clock from '../components/Clock'
import WorkButton from '../components/WorkButton'
import saveDates from '../handleSave/saveDates'

export default function Home({ hidden }) {

  const isMounted = useRef(false)

  const [timeString, setTimeString] = useState("00:00:00")
  const [timerOn, setTimerOn] = useState(false)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }

    if (!timerOn) return

    const startTime = new Date()
    let currentTime;
    const interval = setInterval(() => {

      currentTime = new Date()

      const elapsedMilliseconds = currentTime - startTime
      const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000)
      const hours = Math.floor(elapsedSeconds / 3600)
      const minutes = Math.floor((elapsedSeconds % 3600) / 60)
      const seconds = elapsedSeconds % 60

      const formatDigit = (digit) => digit < 10 ? `0${digit}` : digit

      const timeString = `${formatDigit(hours)}:${formatDigit(minutes)}:${formatDigit(seconds)}`

      setTimeString(timeString)

    }, 100)

    return () => {

      saveDates(startTime, currentTime)

      clearInterval(interval)
      }
  }, [timerOn, setTimeString])  

  return (
    <View style={[hidden, styles.container]}>

      <View style={styles.headlineBox}>
        <Text style={styles.headline}>Stoppeklokke</Text>
      </View>

      <View style={styles.clockBox}>
        <View>
          <Clock timeString={timeString} />

          <View style={styles.buttonContainer}>
            <WorkButton setTimerOn={setTimerOn} setValue={true} title={"Lock"} timerOn={timerOn} />
            <WorkButton setTimerOn={setTimerOn} setValue={false} title={"Unlock"} timerOn={timerOn} />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  container: {
    height: '100%',
    alignItems: "center",
  },
  clockBox: {
    height: '80%',
    justifyContent: 'space-around',
  },
  headlineBox: {
    alignItems: 'center',
  },
  headline: {
    fontSize: 40,
  },
})