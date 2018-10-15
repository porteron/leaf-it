import React from 'react';
import {
  Image,
  View,
} from 'react-native';

import { styles } from '../../styles'

const forest = require('../../assets/images/forest.png')

export const Background = () => {
    return (
        <View style={styles.forestBackgroundContainer}>
            <Image source={forest} style={styles.forestBackground} />
        </View>
    )
}
