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
} from 'react-native';

import { ImagePicker, Permissions } from 'expo';

import SearchableDropdown from 'react-native-searchable-dropdown';
import * as Animatable from 'react-native-animatable';
import { plants } from './models/plants'

const logo = require('./assets/images/logo.png')
const profile = require('./assets/images/profile.png')
const picturesIcon = require('./assets/images/pictures_icon.png')
export default class App extends Component {
  state = {
    image: null,
    uploading: false,
    plantName: '',
    selectedImage: {}
  };

  render() {
    let {
      image
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={{ position: 'absolute', top: 60, width: "100%" }}>
          <Image source={logo} style={{display:"none", height: 130, width: 70, position: "absolute", left: 25 }} />
          <Image source={profile} style={{ height: 30, width: 30, position: "absolute", left: 30 }} />

          <Text style={{ position: "absolute", left: 20, top: 40, fontSize: 14, fontFamily: "Avenir" }}>My Plants</Text>

          <Text style={{ position: "absolute", left: "43%", top: 40, fontSize: 20, fontFamily: "Avenir" }}>Leaf It</Text>
        </View>

        <StatusBar barStyle="default" />
        <Animatable.Text animation="pulse" easing="ease-in" iterationCount="infinite" style={{ textAlign: 'center', marginTop:190 }}>
          <TouchableHighlight onPress={this._takePhoto} style={{ backgroundColor: 'green', borderRadius: 100, height: 200, width: 200, borderWidth: 4, borderColor: "#00d27e", shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2 }}>
            <View>
              <Image source={logo} style={{ height: 130, width: 70, left: 60, top: 30 }} />
            </View>
          </TouchableHighlight>
        </Animatable.Text>

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

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}
        <View style={{ height: 70, width: '100%', position: "absolute", bottom: 30}}>
          <TouchableOpacity 
          onPress={()=>{}}
          style={{position:"absolute", right:20}}
          >
            <Image 
            source={picturesIcon}
            style={{height:50, width:50, marginLeft:30}}
            />
            <Text>Select From Library</Text>
          </TouchableOpacity> 
        </View>
      </View>
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
  _selectPlantName(item) {
    console.log("Item: ", item.name)
    if (item.name) {
      this.setState({
        plantName: item.name
      })
    }
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

  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // Only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let selectedImage = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this.setState({ selectedImage })
    }
  };

  _handleImagePicked = async () => {
    let uploadResponse, uploadResult;
    const { selectedImage, plantName } = this.state

    if (Object.keys(selectedImage).length === 0) {
      alert("No Image Selected")
      return false
    }

    if (!plantName) {
      alert("Please enter plant name")
      return false
    }

    try {
      this.setState({
        uploading: true
      });

      if (!selectedImage.cancelled) {
        uploadResponse = await uploadImageAsync(selectedImage.uri, plantName);
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
}

async function uploadImageAsync(uri, plantName) {
  console.log("Upload")

  // let apiUrl = `http://localhost:3000/upload?plantName=${plantName}`
  let apiUrl = `http://a8944446.ngrok.io/upload?plantName=${plantName}`
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
    backgroundColor: "#d6ffd7"
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
    height: 250,
    width: 250,
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  }
});
