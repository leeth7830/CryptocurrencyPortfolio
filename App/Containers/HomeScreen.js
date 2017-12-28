import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class HomeScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text> Hello </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 38,
    backgroundColor: 'transparent'
  },
  button: {
    marginRight: 10
  }
});
