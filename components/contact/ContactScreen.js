import firebase from 'firebase';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class ContactScreen extends React.Component {

    constructor() {
        super();
        console.log("ContactScreen");
    }

    static navigationOptions = {
        title: 'Contact'
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Contact Screen</Text>
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