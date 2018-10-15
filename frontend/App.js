import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ImageEditor
} from 'react-native';

import { ImagePicker, Permissions } from 'expo';
import { AnimatedBackgroundColorView } from 'react-native-animated-background-color-view';

import SearchableDropdown from 'react-native-searchable-dropdown';
import * as Animatable from 'react-native-animatable';
import { plants } from './models/plants'
import { Font } from 'expo';

const logo = require('./assets/images/logo.png')
const plant = require('./assets/images/plant.png')
const compass = require('./assets/images/compass.png')
const forest = require('./assets/images/forest.png')
const profile = require('./assets/images/profile.png')
const picturesIcon = require('./assets/images/pictures_icon.png')

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
      <AnimatedBackgroundColorView
        color='#c0ffd1'
        initialColor='green'
        duration={10000}
      // easing={()=>{Easing.out("bounce")}}
      >

        <View style={styles.container}>
          <View style={{ position: 'absolute', top: 60, width: "100%" }}>
            <Image source={logo} style={{ display: "none", height: 130, width: 70, position: "absolute", left: 25 }} />
            <Image source={profile} style={{ height: 30, width: 30, position: "absolute", left: 30 }} />

            <Text style={{ position: "absolute", left: 20, top: 40, fontSize: 14, fontFamily: "Avenir" }}>My Plants</Text>
            <Text style={{ position: "absolute", left: "38%", top: -3, fontSize: 28, fontFamily: "leaf-font", color: "#004303", textShadowColor: "#ddd", textShadowOffset: { width: 0, height: .5 }, textShadowRadius: .5 }}>Leaf It</Text>

            <TouchableOpacity
              onPress={this._pickImage}
              style={{ position: "absolute", right: 16, top: 11 }}
            >
              <Image
                source={picturesIcon}
                style={{ height: 22, width: 38, marginLeft: 20, marginBottom: 10 }}
              />
              <Text style={{ fontSize: 14, fontFamily: "Avenir" }}>Photo Library</Text>
            </TouchableOpacity>
            {this._maybeRenderImage()}
          </View>



          <StatusBar barStyle="default" />

          <View style={{ marginTop: -70 }}>
            <Text style={{ marginBottom: 30, fontFamily: "Avenir", textAlign: 'center' }}>Tap to Identify</Text>

            <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite">
              <TouchableHighlight onPress={this._takePhoto} style={{ backgroundColor: '#3fa45b', borderRadius: 190, height: 290, width: 290, shadowColor: '#005d1a', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 2 }}>
                <TouchableHighlight onPress={this._takePhoto} style={{ backgroundColor: '#2abfff', borderRadius: 170, height: 240, width: 240, shadowColor: '#005d1a', left: 25, top: 26, padding: 19, paddingTop: 23, paddingLeft: 20, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 2 }}>
                  <Animatable.Text animation="pulse" easing="ease-in" iterationCount="infinite">
                    <TouchableHighlight onPress={this._takePhoto} style={{ backgroundColor: '#ce0000', borderRadius: 100, height: 200, width: 200, shadowColor: '#005d1a', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 2, right: 0, top: 40 }}>
                      <View>
                        <Image source={plant} style={{ height: 140, width: 140, left: 29, top: 26 }} />
                      </View>
                    </TouchableHighlight>
                  </Animatable.Text>

                </TouchableHighlight>
              </TouchableHighlight>

            </Animatable.Text>

          </View>



          {/* <Button
          onPress={this._pickImage}
          title="Pick an image from camera roll"
        /> */}

          {/* <SearchableDropdown
          onTextChange={(text) => { console.log(text) }}
          onItemSelect={(item) => { this._selectPlantName(item) }}
          enableEmptySections={true}
          containerStyle={{
            padding: 5,
            width: "90%"
          }}
          textInputStyle={{
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            backgroundColor: "white"
          }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: '#ddd',
            borderColor: '#bbb',
            borderWidth: 1,
            borderRadius: 5
          }}
          itemTextStyle={{
            color: '#222'
          }}
          itemsContainerStyle={{
            maxHeight: 140
          }}
          items={plants}
          // defaultIndex={2}
          // value={{name:this.state.plantName}}
          placeholder="Plant Name"
          resetValue={false}
          underlineColorAndroid='transparent' />
        /> */}


          {/* <Button
          title="Add to Dataset"
          onPress={() => { this._handleImagePicked() }}
          style={{ backgroundColor: 'green', paddingTop: 20 }}
        /> */}

          {this._maybeRenderUploadingOverlay()}

          <View style={{ height: 450, width: '100%', position: "absolute", bottom: 30, zIndex: -1 }}>
            <Image source={forest} style={{ position: "relative", left: 0, height: 533, width: 'auto', zIndex: -1 }} />


          </View>
        </View>
      </AnimatedBackgroundColorView>
    );
  }

  _handleChange(text) {
    console.log("Text: ".text)
    try {
      this.setState({
        plantName: text
      })
    } catch (error) {
      console.log("Handle Change Error: ", error)
    }

  }


  _handleImagePicked = async () => {
    let uploadResponse, uploadResult;
    const { selectedImage, plantName } = this.state

    if (Object.keys(selectedImage).length === 0) {
      alert("No Image Selected")
      return false
    }

    // if (!plantName) {
    //   alert("Please enter plant name")
    //   return false


    try {
      // this.setState({
      //   uploading: true
      // });

      if (!selectedImage.cancelled && selectedImage.base64) {
        // uploadResponse = await uploadImageAsync(selectedImage.uri, plantName);
        uploadResponse = await this._identifyPlant(selectedImage);

        uploadResult = await uploadResponse.json();

        this.setState({
          image: uploadResult.location
        })
      }
    } catch (error) {
      console.log("error: ", error);
      alert('Upload failed, sorry');
    } finally {
      this.setState({
        uploading: false
      });
    }
  };

  _identifyPlant({base64}) {

    let apiUrl = `http://localhost:3000/identify`
    // let apiUrl = `http://a8944446.ngrok.io/upload?plantName=${plantName}`
    // let apiUrl = `http://a8944446.ngrok.io/upload?plantName=${plantName}`

    const data = JSON.stringify({
      "data": base64
    })

    let options = {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    return fetch(apiUrl, options);
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
  };

  _maybeRenderImage = () => {
    let {
      selectedImage
    } = this.state;

    if (!selectedImage) {
      return;
    }

    return (
      <View
        style={styles.maybeRenderContainer}>
        <View
          style={styles.maybeRenderImageContainer}>
          <Image source={{ uri: selectedImage.uri }} style={styles.maybeRenderImage} />
        </View>

        {/* <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={styles.maybeRenderImageText}>
          {selectedImage}
        </Text> */}
      </View>
    );
  };

  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // Only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let selectedImage = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
      });
      // console.log("Selected Image: ", selectedImage)
      this.setState({
        selectedImage,
      })
    }
    await this._handleImagePicked();
  };

  _selectPlantName(item) {
    console.log("Item: ", item.name)
    if (item.name) {
      this.setState({
        plantName: item.name
      })
    }
  }

  _takePhoto = async () => {
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  };

}


async function uploadImageAsync(uri, plantName) {
  console.log("Upload")

  let apiUrl = `http://localhost:3000/upload?plantName=${plantName}`
  // let apiUrl = `http://a8944446.ngrok.io/upload?plantName=${plantName}`
  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options);
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: "#d6ffd7",
    // backgroundColor: "#bad8bb"
  },
  exampleText: {
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  maybeRenderUploading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  maybeRenderContainer: {

    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: 250,
  },
  maybeRenderImageContainer: {

    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden',
  },
  maybeRenderImage: {
    borderColor: "white",
    marginTop: "15%",
    marginLeft: 10,
    borderWidth: 4,
    height: 80,
    width: 80,
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  }
});
