import React, {Component} from 'react';
import { StyleSheet, View, Image} from 'react-native';
import {Images, Chart, Ranges} from '../Themes'

export default class HomeScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: () => (
      <Image
        source={Images.home}
        style={{ width: 20, height: 20, tintColor: 'white' }}
      />
    )
  };
  render() {
    return (
      <View style={styles.container}>
        <Chart />
        <Ranges />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  flex: 1,        // take up the whole screen
    paddingTop: 20, // put content below status bar
  },
});
