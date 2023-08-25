import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import styles from '../style';

export default function Logo(){
    return(
        <View style={styles.logo}>
            <Image style={styles.logoImg} source={require('../../../imgs/logo.png')}/>
        </View>
    )
}