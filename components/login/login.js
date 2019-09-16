import React, { Component } from 'react';
import Header from './../header';
import LoginBody from './loginBody';

export default class login extends Component {

     render() {
          return ([
            <Header/>,
            <LoginBody/>  
          ]);

     }
}