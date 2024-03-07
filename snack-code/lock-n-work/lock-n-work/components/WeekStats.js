import { View, StyleSheet, Text } from 'react-native'

import { useEffect, useState } from 'react'

import Headline from './Headline'

function DayStat({ day, time }) {

  const [dayHeight, setDayHeight] = useState('0')

  function getWeekDay(dateStr) {
    const dayOfWeek = new Date(dateStr).getDay();    
    return isNaN(dayOfWeek) ? null : 
      ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek];
  }

  useEffect(() => {

    if (!time.length) return

    let timeWorked = 0

    time.forEach(e => {

      timeWorked += e.endDate - e.startDate

    })

    const hours = Math.floor((timeWorked / 3600000) * 10) / 10

    const percentOfDay = (hours / 24) * 100

    setDayHeight(`${percentOfDay}%`)
  }, [time])


  return (

    <View style={styles.dayContainer}>

      <View style={styles.dayBox}><View style={[styles.workBox, {height: dayHeight}]}></View></View>

      <Text>{getWeekDay(day)}</Text>

    </View>
  )

}


export default function WeekStats({ hidden, week }) {

  const [weekArr, setWeekArr] = useState(Object.entries(week))

  useEffect(() => {
    setWeekArr(Object.entries(week))
  }, [week])

  return (
    <View>
      <Headline text={"Uke"}/>
      <View style={[hidden, styles.weekBox]}>

        {weekArr.map((e) => <DayStat day={e[0]} time={e[1]} />)}

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  weekBox: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  dayContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  dayBox: {
    width: 30,
    height: 200,
    borderWidth: '1px',
    borderColor: 'darkgrey',
    borderStyle: 'solid',
    borderRadius: '10%',
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  workBox: {
    backgroundColor: 'yellow',
    height: '0',
  }
})