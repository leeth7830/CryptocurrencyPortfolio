import { StackNavigator, TabNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import HomeScreen from '../Containers/HomeScreen'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = TabNavigator({
  HomeScreen: { screen: HomeScreen },
  HomeScreen: { screen: HomeScreen },
  HomeScreen: { screen: HomeScreen },
  HomeScreen: { screen: HomeScreen },
  HomeScreen: { screen: HomeScreen },
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
