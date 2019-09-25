import firebase from 'firebase';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class UserScreen extends React.Component {

    static navigationOptions = {
        title: 'User'
    }

    render() {
        console.log('UserScreen');
        return(
            <View style={styles.container}>
                <Text>User Screen</Text>
            </View>    
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});