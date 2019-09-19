import firebase from 'firebase';

import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default class SignupScreen extends React.Component {

     signUp = (email, password) => {
          console.log("email: ", this.state.email);
          try {
               firebase.auth().createUserWithEmailAndPassword(email, password);
               
          } catch (error) {
               console.log(error.toString(error));
          }
     }

     static navigationOptions = {
          title: 'Signup'
     }

     render() {
          return (
               <View style={styles.container}>
                    <Text>Inscription</Text>
                    {this.state.errorMessage &&
                         <Text style={{ color: 'red' }}>
                              {this.state.errorMessage}
                         </Text>}
                    <TextInput
                         style={styles.textInput}
                         autoCapitalize="none"
                         placeholder="email"
                         onChangeText={email => this.setState({ email })}
                         value={this.state.email}
                    />
                    <TextInput
                         secureTextEntry
                         style={styles.textInput}
                         autoCapitalize="none"
                         placeholder="Password"
                         onChangeText={password => this.setState({ password })}
                         value={this.state.password}
                    />
                    <TextInput
                         secureTextEntry
                         style={styles.textInput}
                         autoCapitalize="none"
                         placeholder="Confirm password"
                    />
                    <TextInput
                         style={styles.textInput}
                         autoCapitalize="none"
                         placeholder="Surname"
                         onChangeText={surname => this.setState({ surname })}
                         value={this.state.surname}
                    />
                    <TextInput
                         style={styles.textInput}
                         autoCapitalize="none"
                         placeholder="Firstname"
                         onChangeText={firstname => this.setState({ firstname })}
                         value={this.state.firstname}
                    />
                    <TextInput
                         style={styles.textInput}
                         autoCapitalize="none"
                         placeholder="Nickname"
                         onChangeText={nickname => this.setState({ nickname })}
                         value={this.state.nickname}
                    />
                    <TextInput
                         style={styles.textInput}
                         autoCapitalize="none"
                         placeholder="Phone number"
                         onChangeText={phoneNumber => this.setState({ phoneNumber })}
                         value={this.state.phoneNumber}
                    />
                    <Button title="Signup" onPress={() => this.signUp(this.state.email, this.state.password)} />
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
});