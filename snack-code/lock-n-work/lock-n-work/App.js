import { SafeAreaView, StyleSheet, View } from 'react-native'
import { useState } from 'react'

import Navbar from './components/Navbar'

import Home from './pages/Home'
import Coupons from './pages/Coupons'
import Stats from './pages/Stats'

export default function App() {

  const [currentPage, setCurrenPage] = useState("home")

  const pages = [
    {title: "Hjem", page: "home"},
    {title: "Logg", page: "stats"},
    {title: "Kuponger", page: "coupons"},
  ]

  return (
    <SafeAreaView style={styles.page}>

      <View style={styles.container}>

        <Home hidden={!(currentPage === "home") ? styles.hidden : ""}/>
        <Coupons hidden={!(currentPage === "coupons") ? styles.hidden : ""}/>
        <Stats hidden={!(currentPage === "stats") ? styles.hidden : ""}/>

      </View>

      <Navbar pages={pages} setPage={setCurrenPage} currentPage={currentPage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: "center",
  },
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 8,
  },
  hidden: {
    display: "none"
  }
});
