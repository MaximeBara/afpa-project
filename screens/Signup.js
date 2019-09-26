import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TextInput, View, Button } from 'react-native';
import { Block, Text, Input, theme } from 'galio-framework';
import { FontAwesome } from '@expo/vector-icons';

import firebase from 'firebase';
const { width } = Dimensions.get('screen');

export default class Signup extends React.Component {

    constructor() {
        super();
        console.log("SignupScreen");
        this.state = { errorMessage: '' };
    }

    signUp = (state) => {
        try {
            firebase.auth().createUserWithEmailAndPassword(state.email, state.password);
            axios
                .post('https://afpa-project.herokuapp.com/users', state)
                .then(res => {
                    this.props.navigation.navigate('ExpensesGroups');
                })
                .catch(error => {
                    console.error(error);
                })
        } catch (error) {
            console.log(error.toString(error));
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                </Text>
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="email"
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
                <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Confirm password"
                />
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Surname"
                    onChangeText={surname => this.setState({ surname })}
                    value={this.state.surname}
                />
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Firstname"
                    onChangeText={firstname => this.setState({ firstname })}
                    value={this.state.firstname}
                />
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Nickname"
                    onChangeText={nickname => this.setState({ nickname })}
                    value={this.state.nickname}
                />
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Phone number"
                    onChangeText={phoneNumber => this.setState({ phoneNumber })}
                    value={this.state.phoneNumber}
                />
                <Button title="Signup" onPress={() => this.signUp(this.state)} />
            </View>
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
