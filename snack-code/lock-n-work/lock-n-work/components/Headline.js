import { View, Text, StyleSheet } from 'react-native'

export default function Headline({ text, style }) {
  return (
    <View style={[style, styles.container]}>
      <Text style={styles.text}>
        {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
  },
  text: {
    fontSize: 30,
  }
})