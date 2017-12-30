import React, { Component } from 'react';
import Line from './Line'
import {
  StyleSheet,
  View
} from 'react-native';

export default class Chart extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Line values={[40, 30, 70, 60, 100, 70, 40, 70, 50]} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 38, // take 38% of the screen height
    backgroundColor: '#FFFFFF',
  },
});
