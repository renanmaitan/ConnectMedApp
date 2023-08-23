import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';

export default function Copyright(){
    return(
        <View style={styles.copyright}>
            <Text style={styles.copyrightText}>© 2023 - Todos os direitos reservados - ConnectMed</Text>
        </View>
    )
}