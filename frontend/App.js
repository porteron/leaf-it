import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Picker,
  View,
  TextInput,
} from 'react-native';

import { Constants, ImagePicker, Permissions } from 'expo';

import SearchableDropdown from 'react-native-searchable-dropdown';

import { plants } from './models/plants'

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
        <StatusBar barStyle="default" />

        <Text
          style={styles.exampleText}>
          Example: Upload ImagePicker result
        </Text>

        <Button
          onPress={this._pickImage}
          title="Pick an image from camera roll"
        />

        <Button onPress={this._takePhoto} title="Take a photo" />

        <SearchableDropdown
          onTextChange={(text) => { }}
          onItemSelect={(item) => alert(JSON.stringify(item))}
          containerStyle={{
            padding: 5,
            width: "90%"
          }}
          textInputStyle={{
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5
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
          placeholder="Plant Name"
          resetValue={false}
          underlineColorAndroid='transparent' />
        />


        <Button
          title="Add to Dataset"
          onPress={() => { this._handleImagePicked() }}
          style={{ backgroundColor: 'green', paddingTop: 20 }}
        />

        <Text>Or</Text>

        <Button
          title="Identify Plant"
          onPress={() => { }}
          style={{ backgroundColor: 'green' }}
        />


        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}
      </View>
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
  };

  _maybeRenderImage = () => {
    let {
      image
    } = this.state;

    if (!image) {
      return;
    }

    return (
      <View
        style={styles.maybeRenderContainer}>
        <View
          style={styles.maybeRenderImageContainer}>
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>

        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={styles.maybeRenderImageText}>
          {image}
        </Text>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
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
    const { selectedImage } = this.state
s
    if (Object.keys(selectedImage).length === 0) {
      alert("No Image Selected")
      return false
    }
    try {
      this.setState({
        uploading: true
      });

      if (!selectedImage.cancelled) {
        uploadResponse = await uploadImageAsync(selectedImage.uri);
        uploadResult = await uploadResponse.json();

        this.setState({
          image: uploadResult.location
        });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({
        uploading: false
      });
    }
  };
}

async function uploadImageAsync(uri) {

  let apiUrl = `http://localhost:3000/upload`

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
