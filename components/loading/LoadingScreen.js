import firebase from 'firebase';

import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default class LoginScreen extends React.Component {

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Main' : 'Login');
        });
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large"/>
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