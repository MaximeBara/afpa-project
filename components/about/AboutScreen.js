import firebase from 'firebase';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class AboutScreen extends React.Component {

    constructor() {
        super();
        console.log("AboutScreen");
    }

    static navigationOptions = {
        title: 'About'
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>About Screen</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});