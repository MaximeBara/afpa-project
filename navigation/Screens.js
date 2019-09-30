import React from 'react';
import { Easing, Animated, Platform } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';

import { Block, Text, theme } from "galio-framework";

import LoadingScreen from '../screens/Loading';
import LoginScreen from '../screens/Login';
import LogoutScreen from '../screens/Logout';
import SignupScreen from '../screens/Signup';
import ExpensesGroupsScreen from '../screens/ExpensesGroups';
import ExpensesScreen from '../screens/Expenses';
import CreateExpenseScreen from '../screens/CreateExpense';
import AboutScreen from '../screens/About';
import ContactScreen from '../screens/Contact';
import UserScreen from '../screens/User';

import Menu from './Menu';
import Header from '../components/Header';
import { Drawer } from '../components/';

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index
    const width = layout.initWidth

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    })
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1],
    })
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0],
    })

    const scaleWithOpacity = { opacity }
    const screenName = "Search"

    if (screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] }
  }
})

const LoginStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header search tabs title="Login" navigation={navigation} />,
    })
  },
},
  {
    cardStyle: {
      backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
    },
    transitionConfig,
  });

const LogoutStack = createStackNavigator({
  Logout: {
    screen: LogoutScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header search tabs title="Logout" navigation={navigation} />,
    })
  },
},
  {
    cardStyle: {
      backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
    },
    transitionConfig,
  });

const ExpensesGroupsStack = createStackNavigator({
  ExpensesGroups: {
    screen: ExpensesGroupsScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header search tabs title="ExpensesGroups" navigation={navigation} />,
    })
  }, Expenses: {
    screen: ExpensesScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Expenses" navigation={navigation} />
    })
  }
},
  {
    cardStyle: {
      backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
    },
    transitionConfig,
  });

const AboutStack = createStackNavigator({
  About: {
    screen: AboutScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header search tabs title="About" navigation={navigation} />,
    })
  },
},
  {
    cardStyle: {
      backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
    },
    transitionConfig,
  });

const ContactStack = createStackNavigator({
  Contact: {
    screen: ContactScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header search tabs title="Contact" navigation={navigation} />,
    })
  },
},
  {
    cardStyle: {
      backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
    },
    transitionConfig,
  });

const SignupStack = createStackNavigator({
  Signup: {
    screen: SignupScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header search tabs title="Signup" navigation={navigation} />,
    })
  },
},
  {
    cardStyle: {
      backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
    },
    transitionConfig,
  });

const UserStack = createStackNavigator({
  User: {
    screen: UserScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header white transparent title="User" navigation={navigation} />,
      headerTransparent: true,
    })
  },
}, {
  cardStyle: { backgroundColor: '#EEEEEE', },
  transitionConfig,
});

const NonAuthDrawerNavigator = createDrawerNavigator(
  {
    Login: {
      screen: LoginStack,
      navigationOptions: {
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Login" title="Login" />
        )
      }
    },
    Signup: {
      screen: SignupStack,
      navigationOptions: {
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Pro" title="Signup" />
        )
      }
    },
    About: {
      screen: AboutStack,
      navigationOptions: {
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="About" title="About" />
        ),
      },
    },
    Contact: {
      screen: ContactStack,
      navigationOptions: {
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Contact" title="Contact" />
        ),
      },
    }
  }
);

const AuthDrawerNavigator = createDrawerNavigator(
  {
    ExpensesGroups: {
      screen: ExpensesGroupsStack,
      navigationOptions: {
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="ExpensesGroups" title="ExpensesGroups" />
        )
      }
    },
    About: {
      screen: AboutStack,
      navigationOptions: {
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="About" title="About" />
        ),
      },
    },
    Contact: {
      screen: ContactStack,
      navigationOptions: {
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Contact" title="Contact" />
        ),
      },
    },
    User: {
      screen: UserStack,
      navigationOptions: {
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Profile" title="Profile" />
        ),
      },
    },
    Logout: {
      screen: LogoutStack,
      navigationOptions: {
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Logout" title="Logout" />
        )
      }
    }
  },
  Menu
);

AuthDrawerNavigator.navigationOptions = {
  header: null
}

NonAuthDrawerNavigator.navigationOptions = {
  header: null
}

const AppStack = createStackNavigator({
  Loading: { screen: LoadingScreen },
  NonAuthDrawerNavigator: { screen: NonAuthDrawerNavigator },
  AuthDrawerNavigator: { screen: AuthDrawerNavigator }
})

const AppContainer = createAppContainer(AppStack);
export default AppContainer;