import React, { Component } from 'react';
import { Animated, Image, Platform, StyleSheet, View, Text, ListView, FlatList } from 'react-native';
import apisauce from 'apisauce'
import { Images } from '../Themes'

const api = apisauce.create({
  baseURL: 'https://api.coinmarketcap.com/'
});

const NAVBAR_HEIGHT = 58;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 0, android: 0 });

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class ListScreen extends Component {

  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: () => (
      <Image
        source={Images.home}
        style={{ width: 20, height: 20, tintColor: 'white' }}
      />
    )
  };

  constructor(props) {
    super(props);

    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    this.state = {
      list: [],
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          offsetAnim,
        ),
        0,
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
      ),
    };
  }

  // _clampedScrollValue = 0;
  // _offsetValue = 0;
  // _scrollValue = 0;

  componentDidMount() {
    // this.state.scrollAnim.addListener(({ value }) => {
    //   const diff = value - this._scrollValue;
    //   this._scrollValue = value;
    //   this._clampedScrollValue = Math.min(
    //     Math.max(this._clampedScrollValue + diff, 0),
    //     NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
    //   );
    // });
    // this.state.offsetAnim.addListener(({ value }) => {
    //   this._offsetValue = value;
    // });
  }

  componentWillMount() {
    api.get('v1/ticker/?limit=50')
      .then((response) => {
        console.log(response.data);
        this.setState({ list: response.data });
      });
  }

  componentWillUnmount() {
    // this.state.scrollAnim.removeAllListeners();
    // this.state.offsetAnim.removeAllListeners();
  }

  // _onScrollEndDrag = () => {
  //   this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
  // };
  //
  // _onMomentumScrollBegin = () => {
  //   clearTimeout(this._scrollEndTimer);
  // };
  //
  // _onMomentumScrollEnd = () => {
  //   const toValue = this._scrollValue > NAVBAR_HEIGHT &&
  //     this._clampedScrollValue > (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) / 2
  //     ? this._offsetValue + NAVBAR_HEIGHT
  //     : this._offsetValue - NAVBAR_HEIGHT;
  //   Animated.timing(this.state.offsetAnim, {
  //     toValue,
  //     duration: 350,
  //     useNativeDriver: true,
  //   }).start();
  // };

  _renderItem({item}) {
    return (
      <View key={item.id} style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, borderBottomWidth: 1 }}>
          <Image
            style={{ height: 32, width: 32 }}
            source={{uri: `https://files.coinmarketcap.com/static/img/coins/128x128/${item.id}.png`}}
          />
          <Text style={{ alignSelf: 'center', justifyContent: 'center', marginLeft: 10, marginRight: 10 }}>{`${item.rank}. ${item.name}`}</Text>
        <View style={{ flex: 1 }}>
        </View>
      </View>
    );
  }

  render() {
    const { clampedScroll } = this.state;
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [0, -(NAVBAR_HEIGHT - STATUS_BAR_HEIGHT)],
      extrapolate: 'clamp',
    });
    const navbarOpacity = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View>
        <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarTranslate }] }]}>
          <Animated.Text style={[styles.title, { opacity: navbarOpacity }]}>
            TEST TEST
          </Animated.Text>
        </Animated.View>
        <AnimatedFlatList
          contentContainerStyle={styles.contentContainer}
          data={this.state.list}
          keyExtractor={item => item.id}
          renderItem={this._renderItem}
          removeClippedSubviews
          scrollEventThrottle={1}
          // onMomentumScrollBegin={this._onMomentumScrollBegin}
          // onMomentumScrollEnd={this._onMomentumScrollEnd}
          // onScrollEndDrag={this._onScrollEndDrag}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
            { useNativeDriver: true },
          )}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    height: NAVBAR_HEIGHT,
    justifyContent: 'center',
    paddingTop: STATUS_BAR_HEIGHT,
    zIndex: 1
  },
  contentContainer: {
    paddingTop: NAVBAR_HEIGHT,
  },
  title: {
    color: '#333333',
  }
});
