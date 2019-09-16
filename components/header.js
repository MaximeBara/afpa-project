import React, { Component } from 'react';
import { Header } from 'react-native-elements';

export default class header extends Component {

     render() {
          return (
               <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
               />
          );

     }


     // }
}