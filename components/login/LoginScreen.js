import firebase from 'firebase';

import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default class LoginScreen extends React.Component {

     constructor(){
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
                    this.props.navigation.navigate('Main', this.state);
               })
               .catch(error => {
                    this.setState({ errorMessage: error.message })
               })
     }

     async signInWithFacebook() {
          const appId = Expo.Constants.manifest.extra.facebook.appId;
          const permissions = ['public_profile', 'email'];  // Permissions required, consult Facebook docs

          const {
               type,
               token,
          } = await Expo.Facebook.logInWithReadPermissionsAsync(
               appId,
               { permissions }
          );

          switch (type) {
               case 'success': {
                    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
                    const credential = firebase.auth.FacebookAuthProvider.credential(token);
                    const facebookProfileData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);  // Sign in with Facebook credential

                    // Do something with Facebook profile data
                    // OR you have subscribed to auth state change, authStateChange handler will process the profile data

                    return Promise.resolve({ type: 'success' });
               }
               case 'cancel': {
                    return Promise.reject({ type: 'cancel' });
               }
          }
     }

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
                    <Button
                         title="Login with Facebook"
                         onPress={() => this.signInWithFacebook()}
                    />
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