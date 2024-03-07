
import { View, Text, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'

import getDates from '../handleSave/getDates'

import WeekStats from '../components/WeekStats'
import Headline from '../components/Headline'
import WeekLog from '../components/WeekLog'

export default function Stats({ hidden }) {
  const [data, setData] = useState([])
  const [noData, setNoData] = useState(true)


  function getWeeksBetweenDates(start, end) {
    const weeks = [];

    let currentStartDate = new Date(start[0])
    const endDate = new Date(end[0])

    while (currentStartDate < endDate) {
        const weekStart = new Date(currentStartDate)
        weekStart.setDate(currentStartDate.getDate() - currentStartDate.getDay() + (currentStartDate.getDay() === 0 ? -6 : 1))

        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekStart.getDate() + 6)

        weeks.push({ start: weekStart.toDateString(), end: weekEnd.toDateString() })

        currentStartDate.setDate(currentStartDate.getDate() + 7)
    }
    
    const weekStart = new Date(currentStartDate)
    weekStart.setDate(currentStartDate.getDate() - currentStartDate.getDay() + (currentStartDate.getDay() === 0 ? -6 : 1))

    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)

    weeks.push({ start: weekStart.toDateString(), end: weekEnd.toDateString() })

    return weeks
  }

  function makeWeek(obj, dates) {

    let startDate = new Date(obj.start)
    const endDate = new Date(obj.end)

    const week = {}

    while (startDate <= endDate) {

      week[startDate.toDateString()] = dates[startDate.toDateString()] ? dates[startDate.toDateString()] : []

      startDate.setDate(startDate.getDate() + 1)
    }

    return week
  }

  useEffect(() => {
    (async () => {

      const dates = await getDates()

      if (Object.keys(dates).length) {
        setNoData(false)
      } 
      else {
        setNoData(true)
        return
      }

      const datesEntries = Object.entries(dates)
      
      datesEntries.sort((date1, date2) => Date.parse(date2[0]) - Date.parse(date1[0]))

      const firstDate = datesEntries[0]
      const lastDate = datesEntries.at(-1)

      

      const allWeeks = getWeeksBetweenDates(firstDate, lastDate)

      const weeks = allWeeks.map(data => makeWeek(data, dates))

      setData(weeks)
    })()
  }, [hidden])

  return (
    <View style={[hidden, styles.container]}>

      <View style={styles.headlineBox}>
        <Text style={styles.headline}>Timer låst</Text>
      </View>
      
      {
        noData ? 
        <Headline style={{flex: 1}} text={"Ingen data"}/>
        : 
        <View style={styles.weekBox}>
          
          {data.map((week) => <WeekStats week={week} />)}

          {data.map((week) => <WeekLog week={week} />)}

        </View>
      }
      

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headlineBox: {
    alignItems: 'center',
  },
  headline: {
    fontSize: 40,
  },
  weekBox: {
    flex: 1,
    justifyContent: 'space-around',
  },
})
