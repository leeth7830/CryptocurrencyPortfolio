import { StackNavigator, TabNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import HomeScreen from '../Containers/HomeScreen'
import ListScreen from '../Containers/ListScreen'
import Chart from '../Themes/Chart'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = TabNavigator({
  HomeScreen1: { screen: HomeScreen },
  HomeScreen2: { screen: Chart },
  ListScreen: { screen: ListScreen },
  HomeScreen4: { screen: HomeScreen },
  HomeScreen5: { screen: HomeScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'HomeScreen1',
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: false,
  lazy: true,
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
