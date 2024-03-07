import { View, Text, StyleSheet } from 'react-native'

import { useEffect, useState } from 'react'

import Headline from './Headline'

function getDayOfWeek(date) {
  const dayOfWeek = new Date(date).getDay();    
  return isNaN(dayOfWeek) ? null : 
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
}



function makeTimeString(milliseconds) {

  let totalSeconds = milliseconds / 1000
  let hours = Math.floor(totalSeconds / 3600)
  let remainingSeconds = totalSeconds % 3600
  let minutes = Math.floor(remainingSeconds / 60)

  return `${hours}t ${minutes}m`
}

function calcTime(time) {

  if (time.length === 0) return "--"

  const timeDiff = time.reduce((accumulator, current) => {
    const currentDiff = current.endDate - current.startDate
    return accumulator + currentDiff
  }, 0)

  return makeTimeString(timeDiff)
}

function LogDay({ info }) {

  const [day, setDay] = useState(getDayOfWeek(info[0]))
  const [timeWorked, setTimeWorked] = useState(calcTime(info[1]))

  return (
    <View style={dayStyles.container}>
      <Text style={dayStyles.day}>{day}</Text>
      <Text>{timeWorked}</Text>
    </View>
  )
}

const dayStyles = StyleSheet.create({

  container: {
    flexDirection: 'row',
  },
  day: {
    flex: 1,
    margin: 4,
  },

})

export default function WeekLog(props) {
  const [week, setWeek] = useState(Object.entries(props.week))

  useEffect(() => {
    setWeek(Object.entries(props.week))
  }, [props])
  
  return (
    <View style={weekStyles.container}>
      <Headline text={"Logg"} />

      {week.map((info) => <LogDay info={info} />)}

    </View>
  )
}

const weekStyles = StyleSheet.create({
  container: {
    margin: 10,
    height: 350,
  },

})