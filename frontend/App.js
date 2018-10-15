import React, { Component } from 'react';
import {
  Image,
  View,
} from 'react-native';

import { AnimatedBackgroundColorView } from 'react-native-animated-background-color-view';

import BigButton from './components/bigbutton/bigbutton'
import Header from './components/header/header'
import { Background } from './components/background/background'
import { styles } from './styles'

const birds = require('./assets/images/birds.gif')


export default class App extends Component {

  render() {

    return (
      <AnimatedBackgroundColorView color='#c0ffd1' initialColor='green' duration={10000} >
        <Image source={birds} style={styles.flyingBirds} />
        <View style={styles.container}>
          <Header />
          <BigButton />
          <Background />
        </View>
      </AnimatedBackgroundColorView>
    );
  }
}
