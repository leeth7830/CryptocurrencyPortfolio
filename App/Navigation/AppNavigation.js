import { StackNavigator, TabNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = TabNavigator({
  LaunchScreen1: { screen: LaunchScreen },
  LaunchScreen2: { screen: LaunchScreen },
  LaunchScreen3: { screen: LaunchScreen },
  LaunchScreen4: { screen: LaunchScreen },
  LaunchScreen5: { screen: LaunchScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen1',
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  navigationOptions: {
    headerStyle: styles.header,
  },
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: 'gray',
    showIcon: true,
    showLabel: false,
    style: {
      backgroundColor: 'black'
    },
  // Underline Color
  indicatorStyle:{
    backgroundColor:'white'
  },
  }
})

export default PrimaryNav
