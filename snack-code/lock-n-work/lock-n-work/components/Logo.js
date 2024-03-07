import { Image, StyleSheet } from 'react-native'
 

export default function Logo({ src }) {
  return (
    <Image style={styles.image} source={src} />
  )
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    objectFit: 'contain',
  }
})