import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default class MainScreen extends Component {

     constructor(props) {
          super(props);
     }

     static navigationOptions = {
          title: 'Main'
     }

     render() {
          return (
               <View style={styles.container}>
                    <Text>Bonjour {this.props.navigation.state.params.email}, ton password est {this.props.navigation.state.params.password}</Text>
               </View>
          );
     }
     
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
     },
     textInput: {
          height: 40,
          width: '90%',
          borderColor: 'gray',
          borderWidth: 1,
          marginTop: 8
     }
})