import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput } from 'react-native';
import axios from "axios";


export default class ExpensesGroupsScreen extends Component {

    static navigationOptions = {
        title: 'ExpensesGroup'
    }

    constructor(props) {
        super(props);
        this.state = {
            allGroups: []
        }
        console.log("ExpenseGroupScreen");
    }

    componentDidMount() {
        axios.get('https://afpa-project.herokuapp.com/expensesGroups')
            .then(res => {
                let expensesGroups = res.data;
                console.log("Doc: ", expensesGroups);
                this.setState(
                    {
                        allGroups: expensesGroups
                    }
                );
            });
    }


    // Pour aller vers ExpensesScreen : onPress={() => this.props.navigation.navigate('Expenses', {ICI LES DATAS QUE TU VEUX ENVOYER SOUS FORMAT JSON})}
    render() {
        return this.state.allGroups.map((group) => {
            console.log("Group: ", group);
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