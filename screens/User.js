import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TextInput, View, Button, Image } from 'react-native';
import { Block, Text, Input, theme } from 'galio-framework';
import { FontAwesome } from '@expo/vector-icons';

import firebase from 'firebase';
const { width } = Dimensions.get('screen');

export default class User extends React.Component {

    constructor(props) {
        super(props);
        console.log("UserScreen");
        this.state = {
            name: '',
            firstname: '',
            phone: '',
            pseudo: ''
        };
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        this.setState({
            name: params && params.userInfos.name,
            firstname: params && params.userInfos.firstname,
            phone: params && params.userInfos.phone,
            pseudo: params && params.userInfos.pseudo
        });
    }

    render() {
        return (
            <View>
                <View style={styles.image}>
                    <Image style={{ margin: 30, width: 100, height: 100 }} source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }} />
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Name :</Text>
                    <Text
                        style={styles.text}>{this.state.name}</Text>
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Firstname :</Text>
                    <Text
                        style={styles.text}>{this.state.firstname}</Text>
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Pseudo :</Text>
                    <Text
                        style={styles.text}>{this.state.pseudo}</Text>
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Phone number :</Text>
                    <Text
                        style={styles.text}>{this.state.phone}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10
    },
    text: {
        marginTop: 5,
    },
    textInput: {
        width: '50%',
        borderColor: 'gray',
        borderBottomWidth: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});