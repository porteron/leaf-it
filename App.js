import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView,Image} from 'react-native';
import ImageBrowser from './ImageBrowser';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageBrowserOpen: false,
      photos: []
    }
  }

  imageBrowserCallback = (callback) => {
    callback.then((photos) => {
      console.log(photos)
      this.setState({
        imageBrowserOpen: false,
        photos
      })
    }).catch((e) => console.log(e))
  }

  renderImage(item, i) {
    return(
      <Image
        style={{height: 100, width: 100}}
        source={{uri: item.file}}
        key={i}
      />
    )
  }

  render() {
    if (this.state.imageBrowserOpen) {
      return(<ImageBrowser max={4} callback={this.imageBrowserCallback}/>);
    }
    return (
      <View style={styles.container}>
        <Button
          title="Choose Images"
          onPress={() => this.setState({imageBrowserOpen: true})}
        />
        <Text>This is an example of a</Text>
        <Text>multi image selector using expo</Text>
        <ScrollView>
          {this.state.photos.map((item,i) => this.renderImage(item,i))}
        </ScrollView>
      </View>
    );
  }

  _storePhoto() {

    const params = { Bucket: 'bucket', Key: 'key', Body: stream };
    const options = { partSize: 10 * 1024 * 1024, queueSize: 1 };

    s3.upload(params, options, function (err, data) {
      console.log(err, data);
    });

    const xhr = new XMLHttpRequest();
    const uploadURL = ""

    xhr.onload = () => {
      if (xhr.status < 400) {
        // succeeded
      } else {
        const error = new Error(xhr.response);
      }
    };

    xhr.onerror = (error) => {
    };

    xhr.open('PUT', uploadURL);
    xhr.setRequestHeader('content-type', contentType);
    xhr.send({ uri: imageURI });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
