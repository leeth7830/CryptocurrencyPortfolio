import React, { Component, PureComponent } from 'react'
import { Animated, ScrollView, Text, Image, View, FlatList, Platform, StyleSheet } from 'react-native'
import apisauce from 'apisauce'
import NavigationBar from 'react-native-navbar'
import { Images } from '../Themes'

export default class ListScreen2 extends Component {
  static navigationOptions = {
    header: ({state}) => {
      return {
        title: 'My Title',
        style: {
          top: 0,
          left: 0,
          right: 0,
          height:(!state.params ? 0 : state.params.animatedValue),
          overflow: 'hidden',
        },
      }
    },
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
    this.state = {
      list: [],
      // fadeAnim: new Animated.Value(0),
      // height: 50,
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
        scrollAnim,
        offsetAnim,
      ),
    };
    this.height = new Animated.Value(56);
    this.animation = new Animated.Value(false);
  }

  componentWillMount() {
    api.get('v1/ticker/?limit=50')
      .then((response) => {
        console.log(response.data);
        this.setState({ list: response.data });
      });
  }

  componentDidMount() {
    // Animated.timing(                  // Animate over time
    //   this.state.fadeAnim,            // The animated value to drive
    //   {
    //     toValue: 1,                   // Animate to opacity: 1 (opaque)
    //     duration: 10000,              // Make it take a while
    //   }
    // ).start();                        // Starts the animation
    this.state.scrollAnim.addListener(({ value }) => {
      // This is the same calculations that diffClamp does.
      const diff = value - this._scrollValue;
      this._scrollValue = value;
      this._clampedScrollValue = Math.min(
        Math.max(this._clampedScrollValue + diff, 0),
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
      );
    });
    this.state.offsetAnim.addListener(({ value }) => {
      this._offsetValue = value;
    });
  }

  componentWillUnmount() {
  // Don't forget to remove the listeners!
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
  }

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

  onScroll(event) {
    // console.log(event.nativeEvent.velocity);
    // console.log(event.nativeEvent.contentOffset);
    // console.log(contentOffset);
    const scrollVelocity = event.nativeEvent.velocity.y;
    const scrollOffset = event.nativeEvent.contentOffset.y;
    if(scrollOffset > 0) {
      if(scrollVelocity > 0) {
        let toValue = this.height._value -= 5.5;
        // this._setAnimation(false);
        if(toValue <= 0) toValue = 0;
        Animated.parallel([
          Animated.timing(this.height, {
            duration: 0,
            toValue
          }),
        ]).start();
      } else {
        let toValue = this.height._value += 5.5;
        if(toValue >= 58) toValue = 58;
        // this._setAnimation(true);
        Animated.timing(this.height, {
          duration: 0,
          toValue
        }).start();
      }
    } else {
      Animated.timing(this.height, {
        duration: 0,
        toValue: 58,
      }).start();
    }
  }

  _setAnimation(enable) {
      Animated.parallel([
        Animated.timing(this.height, {
          duration: 64,
          toValue: enable? 56 : 0
        }),
      ]).start();
  }

  _onScrollEndDrag = () => {
  this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
};

_onMomentumScrollBegin = () => {
  clearTimeout(this._scrollEndTimer);
};

_onMomentumScrollEnd = () => {
  // Code to handle scroll end animation will go here.
};


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
      <Animated.View style={{ paddingBottom: 0 }}>
        {/* <Animated.View style={{ backgroundColor: 'red', height: this.height }}>
          <Animated.Text style={{ fontSize: 30, alignSelf: 'center', justifyContent: 'center'}}>TEST 1BITCH</Animated.Text>
        </Animated.View> */}
        <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarTranslate }] }]}>
          <Animated.Text style={{ fontSize: 30, alignSelf: 'center', justifyContent: 'center'}}>TEST 1BITCH</Animated.Text>
        </Animated.View>
        <AnimatedFlatList
          data={this.state.list}
          keyExtractor={item => item.id}
          renderItem={this._renderItem}
          removeClippedSubviews
          // onScroll={this.onScroll.bind(this)}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
            { useNativeDriver: true },
          )}
          onMomentumScrollBegin={this._onMomentumScrollBegin}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          onScrollEndDrag={this._onScrollEndDrag}
        />
      </Animated.View>
    );
  }

}

const styles = StyleSheet.create({
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
  },
  contentContainer: {
    paddingTop: NAVBAR_HEIGHT,
  },
});

const api = apisauce.create({
  baseURL: 'https://api.coinmarketcap.com/'
});
const NAVBAR_HEIGHT = 64;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });
const scrollAnim = new Animated.Value(0);
const offsetAnim = new Animated.Value(0);
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
