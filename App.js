import React from 'react';
//import Header from './../header';
import Login from './components/login/login';
import GroupBody from './components/expenseGroup/groupBody';

export default class App extends React.Component{
  render(){
    return (
      // <Login/>
     // <Header/>,
      <GroupBody/>
    );
  }
}