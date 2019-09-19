import base from './base'

import LoginScreen from './components/login/LoginScreen';
import SignupScreen from './components/signup/SignupScreen';
import MainScreen from './components/MainScreen';
import LoadingScreen from './components/loading/LoadingScreen';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
    Loading: { screen: LoadingScreen},
    Login: {screen: LoginScreen},
    Signup: {screen: SignupScreen},
    Main: { screen: MainScreen }
});

const App = createAppContainer(MainNavigator);

export default App;