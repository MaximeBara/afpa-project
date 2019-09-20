import firebase from 'firebase';

import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class MainScreen extends React.Component {

     static navigationOptions = {
          title: 'Main'
     }

     constructor(){
          super();
          this.state = { currentUser: firebase.auth() };
          console.log("MainScreen: ", this.state.currentUser);
     }

     signOutUser = () => firebase.auth().signOut();

     render() {
          return (
               <View style={styles.container}>
                    <Text>Bonjour {this.state.currentUser && this.state.currentUser.currentUser.email} </Text>
                    <Button title="Signout" onPress={() => this.signOutUser()} />
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