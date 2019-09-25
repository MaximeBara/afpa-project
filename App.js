import base from './base'

import LoginScreen from './components/login/LoginScreen';
import SignupScreen from './components/signup/SignupScreen';
import MainScreen from './components/MainScreen';
import LoadingScreen from './components/loading/LoadingScreen';
import ExpensesScreen from './components/expenses/ExpensesScreen';
import MainHeader from './components/MainHeader';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
    // Loading: { screen: LoadingScreen },
    // Login: { screen: LoginScreen },
    // Signup: { screen: SignupScreen },
    Expenses: { screen: ExpensesScreen },
    // Main: { screen: MainScreen }
    // MainHeader: { screen: MainHeader }
});

const App = createAppContainer(MainNavigator);

export default App;