import React, {Component} from 'react';
import { View, Text, Image, StyleSheet,ListView, TouchableOpacity, TouchableHighlight} from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import { SwipeListView, SwipeRow  } from 'react-native-swipe-list-view';
import {Images} from '../Themes'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: Array(20).fill('').map((_, i) => `${i}`),
    };
  }
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: () => (
      <Image
        source={Images.home}
        style={{ width: 20, height: 20, tintColor: 'white' }}
      />
    )
  };

  deleteRow(secId, rowId, rowMap) {
   rowMap[`${secId}${rowId}`].closeRow();
   const newData = [...this.state.listViewData];
   newData.splice(rowId, 1);
   this.setState({ listViewData: newData });
 }

  render () {
    return (
        <Card>
            <SwipeListView
              dataSource={this.ds.cloneWithRows(this.state.listViewData)}
              renderRow={data => (
                <TouchableHighlight
                  onPress={_ => console.log('You touched me')}
                  style={styles.rowFront}
                  underlayColor={'#AAA'}>
                  <View>
                    <Text>Currency # {data} </Text>
                  </View>
                </TouchableHighlight>
              )}
              renderHiddenRow={(data, secId, rowId, rowMap) => (
                <View style={styles.rowBack}>
                  <Text>Left</Text>
                  <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
                    <Text style={styles.backTextWhite}>Right</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnRight]}
                    onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                    <Text style={styles.backTextWhite}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
              leftOpenValue={75}
              rightOpenValue={-150}
              />
        </Card>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30,
  },
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 50,
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#8BC645',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  controls: {
    alignItems: 'center',
    marginBottom: 30,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  Card:{
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'white',
    margin:10,
    marginTop: 0,
    marginBottom: 100,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8
  },
  title: {
    fontSize: 38,
    backgroundColor: 'transparent'
  },
  button: {
    marginRight: 10
  }
});
