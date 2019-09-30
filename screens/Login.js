import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TextInput, View, Button } from 'react-native';
import { Block, Text, Input, theme } from 'galio-framework';
import { FontAwesome } from '@expo/vector-icons';

import firebase from 'firebase';
const { width } = Dimensions.get('screen');

export default class Login extends React.Component {

  constructor() {
    super();
    console.log("LoginScreen");
    this.state = { errorMessage: '', userInfos: '' };
  }
  
  async getUserInfos(email) {
    await axios.get('https://afpa-project.herokuapp.com/users?email=' + email)
      .then(res => {
        this.setState({ userInfos: res.data[0] });
        return res.data[0];
      })
      .catch(
        error => console.log('Error :', error));
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

  render() {
    return (
      <Block flex center style={styles.home}>
        <View style={styles.container}>
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
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
});
