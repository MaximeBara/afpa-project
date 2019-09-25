import firebase from 'firebase';

import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { AccessToken, LoginManager } from 'react-native-fbsdk';
// import { GoogleSignin } from 'react-native-google-signin';

export default class LoginScreen extends React.Component {

     constructor() {
          super();
          console.log("LoginScreen");
          this.state = { errorMessage: '' };
     }

     handleLogin = () => {
          const { email, password } = this.state;
          firebase
               .auth()
               .signInWithEmailAndPassword(email, password)
               .then(() => {
                    this.props.navigation.navigate('ExpensesGroups');
               })
               .catch(error => {
                    this.setState({ errorMessage: error.message })
               })
     }

     async handleFacebookLogin() {
          try {

               console.log('LoginManager: ', LoginManager);

               const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

               if (result.isCancelled) {
                    // handle this however suites the flow of your app
                    throw new Error('User cancelled request');
               }

               console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

               // get the access token
               const data = await AccessToken.getCurrentAccessToken();

               if (!data) {
                    // handle this however suites the flow of your app
                    throw new Error('Something went wrong obtaining the users access token');
               }

               // create a new firebase credential with the token
               const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

               // login with credential
               const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

               console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()))
          } catch (e) {
               console.error(e);
          }
     }

     // onGoogleLogin = () => {
     //      GoogleSignin.signIn()
     //           .then((data) => {
     //                // Create a new Firebase credential with the token
     //                const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
     //                // Login with the credential
     //                return firebase.auth().signInWithCredential(credential);
     //           })
     //           .then((user) => {
     //                // If you need to do anything with the user, do it here
     //                // The user will be logged in automatically by the
     //                // `onAuthStateChanged` listener we set up in App.js earlier
     //                console.log("Google user :", user);
     //           })
     //           .catch((error) => {
     //                const { code, message } = error;
     //                // For details of error codes, see the docs
     //                // The message contains the default Firebase string
     //                // representation of the error
     //           });
     // }

     static navigationOptions = {
          title: 'Login'
     }

     render() {
          return (
               <View style={styles.container}>
                    <Text>Login</Text>
                    <Text>{this.state.errorMessage &&
                         <Text style={{ color: 'red' }}>
                              {this.state.errorMessage}
                         </Text>}
                    </Text>
                    <TextInput
                         style={styles.textInput}
                         autoCapitalize="none"
                         placeholder="Email"
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
                    <Button title="Login" onPress={this.handleLogin} />
                    <Button
                         title="Don't have an account? Sign Up"
                         onPress={() => this.props.navigation.navigate('Signup')}
                    />
                    <FontAwesome.Button name="facebook" backgroundColor="#3b5998" onPress={this.handleFacebookLogin}>
                         Login with Facebook
                    </FontAwesome.Button>
                    {/* <FontAwesome.Button name="google" backgroundColor="##d3d3d3" onPress={this.onGoogleLogin}>
                         Login with Google
                    </FontAwesome.Button> */}
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