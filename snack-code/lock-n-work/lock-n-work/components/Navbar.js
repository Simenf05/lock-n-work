import { View, StyleSheet } from 'react-native'
import Button from './Button'

import { useState, useEffect } from 'react'

function NavElement({ data, setPage, currentPage }) {

  const [disabled, setDisabled] = useState(data.page === currentPage)

  useEffect(() => {
    setDisabled(data.page === currentPage)
  }, [currentPage, data.page])

  return (
    <Button title={data.title} style={styles.navButton} onPress={() => setPage(data.page)} disabled={disabled} />
  )
}

export default function Navbar({ pages, setPage, style, currentPage }) {
  return (
    <View style={[styles.container, style]}>
      {pages.map(data => <NavElement data={data} setPage={setPage} currentPage={currentPage} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  navButton: {
    backgroundColor: "rgb(198 198 198)",
    borderWidth: 0,
    padding: 15,
  }
})