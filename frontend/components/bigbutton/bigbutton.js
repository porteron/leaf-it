import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableHighlight,

} from 'react-native';

import { ImagePicker, Permissions } from 'expo';
import * as Animatable from 'react-native-animatable';

import { styles } from '../../styles'
import { fetchPrediction } from '../../utils/fetchPrediction';

const plant = require('../../assets/images/plant.png')


class BigButton extends Component {
    render() {
        return (
            <View style={{ marginTop: -70 }}>
                <Text style={{ marginBottom: 30, fontFamily: "Avenir", textAlign: 'center' }}>Tap to Identify</Text>
                <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite">
                    <TouchableHighlight onPress={this._takePhoto} style={{ backgroundColor: '#3fa45b', borderRadius: 190, height: 290, width: 290, shadowColor: '#005d1a', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 2 }}>
                        <TouchableHighlight onPress={this._takePhoto} style={{ backgroundColor: '#2abfff', borderRadius: 170, height: 240, width: 240, shadowColor: '#005d1a', left: 25, top: 26, padding: 19, paddingTop: 23, paddingLeft: 20, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 2 }}>
                            <Animatable.Text animation="pulse" easing="ease-in" iterationCount="infinite">
                                <TouchableHighlight onPress={this._takePhoto} style={{ backgroundColor: '#ce0000', borderRadius: 100, height: 200, width: 200, shadowColor: '#005d1a', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 2, right: 0, top: 40 }}>
                                    <View>
                                        <Image source={plant} style={styles.plantIcon} />
                                    </View>
                                </TouchableHighlight>
                            </Animatable.Text>
                        </TouchableHighlight>
                    </TouchableHighlight>
                </Animatable.Text>
            </View>
        )
    }

    _takePhoto = async () => {
        const {
            status: cameraPerm
        } = await Permissions.askAsync(Permissions.CAMERA);

        const {
            status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // If user is allowed permission to Camera and CameraRoll
        if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
            let selectedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                base64: true,
            });

            let prediction = fetchPrediction(selectedImage);
            this.setState({ prediction })
        }
    };
}

export default BigButton
