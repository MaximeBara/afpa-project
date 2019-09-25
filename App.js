import base from './base';
import firebase from 'firebase';

import React from 'react';
import LoginScreen from './components/login/LoginScreen';
import UserScreen from './components/user/UserScreen';
import SignupScreen from './components/signup/SignupScreen';
import ExpensesGroupsScreen from './components/expensesGroups/ExpensesGroupsScreen';
import ExpensesScreen from './components/expenses/ExpensesScreen';
import AddExpenseScreen from './components/expenses/AddExpenseScreen';
import LoadingScreen from './components/loading/LoadingScreen';
import AboutScreen from './components/about/AboutScreen';
import ContactScreen from './components/contact/ContactScreen';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import createSwitchNavigator from 'react-navigation';
import { AppRegistry } from 'react-native';

console.log("App.js");

const UserStackNav = createStackNavigator({
    User: {
        screen: UserScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'User',
        })
    }
})

const ExpensesGroupsStackNav = createStackNavigator({
    ExpensesGroups: {
        screen: ExpensesGroupsScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'ExpensesGroups',
        })
    },Expenses: {
        screen: ExpensesScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Expenses',
        })
    }
})

const AboutStackNav = createStackNavigator({
    About: {
        screen: AboutScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'About',
        })
    }
})

const ContactStackNav = createStackNavigator({
    Contact: {
        screen: ContactScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Contact',
        })
    }
})

const LoginStackNav = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Login',
        })
    }
})

const SignupStackNav = createStackNavigator({
    Signup: {
        screen: SignupScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Signup',
        })
    }
})

const AuthDrawerNavigator = createDrawerNavigator({
    User: UserStackNav,
    ExpensesGroups: ExpensesGroupsStackNav,
    About: AboutStackNav,
    Contact: ContactStackNav
}, {
    initialRouteName: 'ExpensesGroups'
})

AuthDrawerNavigator.navigationOptions = {
    header: null
}

const NonAuthDrawerNavigator = createDrawerNavigator({
    Login: LoginStackNav,
    Signup: SignupStackNav,
    About: AboutStackNav,
    Contact: ContactStackNav
}, {
    initialRouteName: 'Login'
})

NonAuthDrawerNavigator.navigationOptions = {
    header: null
}

const AppStackNavigator = createStackNavigator({
    Expenses: { screen: ExpensesScreen },
    AddExpense: { screen : AddExpenseScreen }
    // Loading: { screen: LoadingScreen },
    // NonAuthDrawerNavigator: { screen: NonAuthDrawerNavigator },
    // AuthDrawerNavigator: { screen: AuthDrawerNavigator }
})

const App = createAppContainer(AppStackNavigator);

AppRegistry.registerComponent('main', () => App);

export default App;