import React, { Component } from 'react';
import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { AnimatedBackgroundColorView } from 'react-native-animated-background-color-view';


import BigButton from './components/bigbutton/bigbutton'
import Header from './components/header/header'

import { styles } from './styles'
import { Font } from 'expo';

const birds = require('./assets/images/birds.gif')
const forest = require('./assets/images/forest.png')


export default class App extends Component {
  state = {
    image: null,
    uploading: false,
    loading: true,
    plantName: '',
    selectedImage: null
  };

  async componentWillMount() {
    await Font.loadAsync({
      'leaf-font': require('./assets/fonts/leaf-font.otf')
    });
    this.setState({ loading: false });
  }

  render() {
    let {
      image,
      loading
    } = this.state;

    if (loading) {
      return <View>Loading...</View>
    }

    return (
      <AnimatedBackgroundColorView color='#c0ffd1' initialColor='green' duration={10000} >
        <Image source={birds} style={styles.flyingBirds} />

        <View style={styles.container}>
          <Header />
          <StatusBar barStyle="default" />
          <BigButton/>

          {this._maybeRenderUploadingOverlay()}

          <View style={styles.forestBackgroundContainer}>
            <Image source={forest} style={styles.forestBackground} />
          </View>
        </View>
      </AnimatedBackgroundColorView>
    );
  }


  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
  }

}



