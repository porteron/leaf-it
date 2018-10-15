import React, { Component } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { plants } from '../../models/plants'
import { uploadImageAsync } from './utils/uploadImageAsync'

import {
    Button,
  } from 'react-native';

class UploadImage extends Component {
    constructor(props){
        super()
        this.state = {
            plantName: '',
        }
    }


    render() {
        return (
            <div>
                <SearchableDropdown
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
                />
        
                <Button
                    title="Add to Dataset"
                    onPress={() => { this._uploadImage() }}
                    style={{ backgroundColor: 'green', paddingTop: 20 }}
                />
            </div>
        )
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

    _uploadImage = async () => {
        let apiUrl = `http://localhost:3000/upload?plantName=${plantName}`

        let uploadResponse, uploadResult;
        const { selectedImage, plantName } = this.state

        if (Object.keys(selectedImage).length === 0) {
            alert("No Image Selected")
            return false
        }

        if (!plantName) {
            alert("Please enter plant name")
            return false

            try {
                this.setState({
                    uploading: true
                });

                if (!selectedImage.cancelled && selectedImage.base64) {
                    uploadResponse = await uploadImageAsync(selectedImage.uri, plantName);

                    uploadResult = await uploadResponse.json();
                    console.log('upload result: ', uploadResult)

                    this.setState({
                        image: uploadResult.location,
                        uploading: false
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
}

export default UploadImage