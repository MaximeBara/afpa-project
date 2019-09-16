import React, { Component } from 'react';
import { StyleSheet, Text, View ,Button } from 'react-native';
import { Header ,Input, } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

export default class loginBody extends Component {


 constructor(){
        super();
        
        this.state = {
            Email : '',
            Password : '',
        };
               
      }
  _onPressButton(){
     event.preventDefault();
     alert('You tapped the button!');


  }






     render() {
          return (
               <View style={styles.container}>
                    <Input placeholder='Email' errorStyle={{ color: 'red' }}
                         errorMessage='ENTER A VALID ERROR HERE' />
                    <Input placeholder='Password' errorStyle={{ color: 'red' }}
                         errorMessage='ENTER A VALID ERROR HERE' />

                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                    <Button
                      onPress={this._onPressButton}             
                         title="se connecter"
                    />
                    <LoginButton
                         onLoginFinished={
                              (error, result) => {
                                   if (error) {
                                        console.log("login has error: " + result.error);
                                   } else if (result.isCancelled) {
                                        console.log("login is cancelled.");
                                   } else {
                                        AccessToken.getCurrentAccessToken().then(
                                             (data) => {
                                                  console.log(data.accessToken.toString())
                                             }
                                        )
                                   }
                              }
                         }
                         onLogoutFinished={() => console.log("logout.")} />
               </View>
          );

     }


     // }
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
         
     },
     InputContainer: {
          backgroundColor: '#fff',
          borderRadius: 6,
          marginBottom: 10,
          height: 56
        },    
});