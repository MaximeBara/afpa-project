import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput } from 'react-native';
import axios from "axios";


export default class ExpenseGroupScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allGroups: []
        }
    }

    componentDidMount() {
        axios.get('http://10.115.21.16:3000/api/v1/expensesGroups')
            .then(res => {
                let expensesGroups = res.data;
                this.setState(
                    {
                        allGroups: expensesGroups
                    }
                );
                console.log("AAAAA : ", expensesGroups[0].expenseGroupName);
            });
    }

    render() {
        return this.state.allGroups.map((group) => {
            return (
                <View key={1} style={this.styles.container}>
                    <Text>{group.expenseGroupName}</Text>
                </View>
            );
        });
    }

    styles = StyleSheet.create({
        container: {
            marginTop: 100,
            flexDirection: 'row',
            flex: 6,
            justifyContent: 'center',
        },
        textinput: {
            flex: 1,
            borderWidth: 1,
        }
    });
}