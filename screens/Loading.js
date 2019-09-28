import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TextInput, View, Button, ActivityIndicator } from 'react-native';
import { Block, Text, Input, theme } from 'galio-framework';
import { FontAwesome } from '@expo/vector-icons';

import axios from 'axios';
import firebase from 'firebase';

const { width } = Dimensions.get('screen');

export default class Loading extends React.Component {

    constructor() {
        super();
        this.state = { userInfos: {} };
    }

    async getUserInfos(user) {
        await axios.get('https://afpa-project.herokuapp.com/users?email=' + user.email)
            .then(res => {
                this.setState({ userInfos: res.data[0] });
                return res.data[0];
            })
            .catch(
                error => console.log('Error :', error));
    }

    componentDidMount() {
        console.log("LoadingScreen");
        firebase.auth().onAuthStateChanged(user => {
            const page = (user) ? 'AuthDrawerNavigator' : 'NonAuthDrawerNavigator';
            this.props.navigation.navigate(page);
        });
    }

    render() {
        return (
            <Block flex center style={styles.home}>
                <View>
                    <Text>Loading</Text>
                    <ActivityIndicator size="large" />
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
