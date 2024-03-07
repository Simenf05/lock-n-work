import { View, Text, StyleSheet } from 'react-native'

export default function Clock(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {props.timeString}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  text: {
    fontSize: 60,
  }
})