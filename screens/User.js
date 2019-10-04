import React, { useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, View, Image } from 'react-native';
import { Block, Text, TextInput, Input, theme, Button } from 'galio-framework';
import Toast from 'react-native-simple-toast';
import { FontAwesome } from '@expo/vector-icons';

import axios from 'axios';
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
            _id: params && params.userInfos._id,
            name: params && params.userInfos.name,
            firstname: params && params.userInfos.firstname,
            phone: params && params.userInfos.phone,
            pseudo: params && params.userInfos.pseudo,
            initials: params && params.userInfos.initials,
            email: params && params.userInfos.email,
            imgPath: params && params.userInfos.imgPath,
            friendsList: params && params.userInfos.friendsList
        });
    }

    updateUser() {
        let newValues = this.state;
        const config = { headers: {'Content-Type': 'application/json'} };
        axios
            .put('https://afpa-project.herokuapp.com/users/' + this.state._id, newValues, config)
            .then(res => {
                console.log(res);
                Toast.show('Your profile has been updated !');
            })
            .catch(error => {
                console.error('Error: ', error);
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
                    <Input
                        defaultValue={this.state.name} onChangeText={(name) => this.setState({ name: name })}></Input>
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Firstname :</Text>
                    <Input
                        defaultValue={this.state.firstname} onChangeText={(firstname) => this.setState({ firstname: firstname })}></Input>
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Pseudo :</Text>
                    <Input
                        defaultValue={this.state.pseudo} onChangeText={(pseudo) => this.setState({ pseudo: pseudo })}></Input>
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Phone number :</Text>
                    <Input
                        defaultValue={this.state.phone} onChangeText={(phone) => this.setState({ phone: phone })}></Input>
                </View>
                <View style={styles.button}>
                    <Button onPress={() => this.updateUser()} style={{ marginBottom: 80 }}>Update</Button>
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
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginLeft: 20,
        marginRight: 10
    },
    text: {
        marginTop: 17,
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