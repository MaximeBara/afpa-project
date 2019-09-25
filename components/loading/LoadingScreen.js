import firebase from 'firebase';

import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default class LoadingScreen extends React.Component {

    componentDidMount(){
        console.log("LoadingScreen");
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'AuthDrawerNavigator' : 'NonAuthDrawerNavigator');
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