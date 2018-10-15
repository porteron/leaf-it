import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    ImageEditor
} from 'react-native';

import { ImagePicker, Permissions } from 'expo';

import { Font } from 'expo';
import { styles } from '../../styles'
import { fetchPrediction } from '../../utils/fetchPrediction';


const profile = require('../../assets/images/profile.png')
const picturesIcon = require('../../assets/images/pictures_icon.png')


class Header extends Component {
    constructor(props) {
        super()
        this.state = {
            selectedImage: '',
            prediction: '',
            loading: true,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'leaf-font': require('../../assets/fonts/leaf-font.otf')
        });
        this.setState({ loading: false });
    }



    render() {
        const {
            loading,
            prediction,
        } = this.state;

        if (loading) {
            return <View>Loading...</View>
        }

        return (
            <View style={{ position: 'absolute', top: 60, width: "100%" }}>
                <Image source={profile} style={styles.headerProfile} />
                <Text style={styles.myPlants}>My Plants</Text>
                <Text style={styles.mainTitle}>Leaf It</Text>
                <TouchableOpacity
                    onPress={this._selectImageAndPredict}
                    style={{ position: "absolute", right: 16, top: 11 }}
                >
                    <Image
                        source={picturesIcon}
                        style={{ height: 22, width: 38, marginLeft: 20, marginBottom: 10 }}
                    />
                    <Text style={{ fontSize: 14, fontFamily: "Avenir" }}>Photo Library</Text>
                </TouchableOpacity>
                {this._maybeRenderImage()}

                {
                    prediction ?
                        <View style={styles.predictions}>
                            {
                                prediction.map(p => {
                                    return (
                                        <Text style={{ textAlign: 'right' }}>{`${p.name} | ${Math.floor(p.percent * 100, 3)}% `}</Text>
                                    )
                                })
                            }
                        </View>
                        : null
                }
                
            </View>
        )
    }

    _fetchPrediction = async () => {
        const { selectedImage } = this.state

        if (Object.keys(selectedImage).length === 0) {
            alert("No Image Selected")
            return false
        }

        try {
            const { prediction } = await fetchPrediction(selectedImage)
            console.log("Prediction: ", prediction)
            // alert(String(prediction))
            this.setState({ prediction })
        } catch (error) {
            console.log("error: ", error);
            alert('Upload failed, sorry');
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

    _selectImageAndPredict = async () => {
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
            this.setState({ selectedImage })
        }
        await this._fetchPrediction();
    };

}

export default Header