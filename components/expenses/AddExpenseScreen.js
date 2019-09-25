import React from 'react';
import axios from 'axios';
import { View, Text, FlatList, StyleSheet, Button, Alert, TextInput } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

export default class AddExpenseScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: '',
            expenseName: '',
            amount: '',
            expense: []
        };
    }

    static navigationOptions = {
        title: 'ADD EXPENSE D:'
    }

    render() {
        console.log('propsNav: ', this.props.navigation);
        return (
            <View style={styles.container}>
                <Text>Expense Name :</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => onChangeText(text)}
                    value={'value'}
                />
                <Text>Expense Description</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => onChangeText(text)}
                    value={'value'}
                />
                <Text>Amount</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => onChangeText(text)}
                    value={'value'}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    buttonPlus: {
        alignItems: 'center',
        marginTop: 50
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    }
});
