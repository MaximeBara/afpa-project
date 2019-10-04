import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TextInput, View, Button, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Block, Text, Input, theme } from 'galio-framework';
import { FontAwesome } from '@expo/vector-icons';

import firebase from 'firebase';
const { width } = Dimensions.get('screen');

import axios from 'axios';

export default class ExpensesReport extends React.Component {

    constructor() {
        super();
        console.log("ExpensesReportScreen");
        this.state = {
            _id: '',
            expenseGroupName: '',
            usersList: [],
            expensesList: [],
            whoOwesWhom: []
        }
    }

    checkIfExists(from, to) {
        let res = 0;
        this.state.whoOwesWhom.forEach(wowElt => {
            if (wowElt.from === from && wowElt.to === to)
                res = 1;
            else if (wowElt.from === to && wowElt.to === from)
                res = 2;
        });
        return res;
    }

    componentWillMount() {
        axios.get('https://afpa-project.herokuapp.com/expensesGroups/' + this.props.navigation.state.params.expenseGroupId)
            .then(res => {
                let expenseGroup = res.data[0];
                this.setState({
                    _id: expenseGroup._id,
                    expenseGroupName: expenseGroup.expenseGroupName,
                    usersList: expenseGroup.usersList,
                    expensesList: expenseGroup.expenseList
                });
                console.log('Test WhoOwesWhom: ', this.state.whoOwesWhom);
                this.state.expensesList.forEach(expenseId => {
                    axios.get('https://afpa-project.herokuapp.com/expenses/' + expenseId).then(result => {
                        let expense = result.data[0];
                        console.log('Expense: ', expenseId);
                        let nbTos = expense.to.length;
                        console.log('nbTos: ', nbTos);
                        expense.to.forEach(to => {
                            let currentWow = this.state.whoOwesWhom;
                            let exists = (this.state.whoOwesWhom.length != 0)?this.checkIfExists(expense.from, to):0;
                            console.log('Exists: ', exists);
                            if (exists == 0)
                                currentWow.push({
                                    from: expense.from,
                                    to: to,
                                    amount: expense.amount / (nbTos + 1)
                                })
                            else if (exists == 1) {
                                currentWow.forEach(wowElt => {
                                    if (wowElt.from == expense.from && wowElt.to == to)
                                        wowElt.amount += (expense.amount / (nbTos + 1));
                                });
                            } else {
                                currentWow.forEach(wowElt => {
                                    if (wowElt.from == to && wowElt.to == expense.from)
                                        wowElt.amount -= (expense.amount / (nbTos + 1));
                                });
                            }
                            this.setState({ whoOwesWhom: currentWow });
                        });
                        console.log('WhoOwesWhom: ', this.state.whoOwesWhom);
                    })
                });
            })
            .catch(err => {
                console.log('Axios Error: ', err);
            })

    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.whoOwesWhom}
                    renderItem={({ item, i }) => (
                        <ListItem
                            key={i}
                            title={`from: ${item.from} - to: ${item.to} - amount: ${item.amount}€`}
                            bottomDivider
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
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
