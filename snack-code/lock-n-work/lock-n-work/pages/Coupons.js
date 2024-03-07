import { Text, View, StyleSheet } from 'react-native'

import Logo from '../components/Logo'
import Headline from '../components/Headline'

export default function Coupons({ hidden }) {

  const companies = [
    {name: 'Burger King', logo: require('../assets/pictures/Burger_King_2020.png')},
    {name: 'McDonald\'s', logo: require('../assets/pictures/McDonalds_Golden_Arches.png')},
    {name: 'Subway', logo: require('../assets/pictures/Subway_Choicemark.png')},
    {name: 'H&M', logo: require('../assets/pictures/H&M-Logo.png')},
  ]

  return (

    <View style={[hidden, styles.container]}>

      <View style={styles.headlineBox}>
        <Text style={styles.headline}>Kuponger</Text>
      </View>

      <View>

        {companies.map((company) => 
          <View style={styles.couponCompanyBox}>
            <Logo src={company.logo} />
            <Headline text={company.name} />
          </View>
        )}

      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },  
  headlineBox: {
    alignItems: 'center',
  },
  headline: {
    fontSize: 40,
  },
  couponCompanyBox: {
    flexDirection: 'row',
    padding: 10,
  },
})