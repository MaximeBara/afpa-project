import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TextInput, View, Button, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Block, Text, Input, theme } from 'galio-framework';
import { FontAwesome } from '@expo/vector-icons';

import firebase from 'firebase';
const { width } = Dimensions.get('screen');

import axios from 'axios';

export default class ExpensesReport extends React.Component {

    constructor(props) {
        super(props);
        console.log("ExpensesReportScreen");
        const { params } = this.props.navigation.state;
        this.state = {
            _id: params && params.expensesGroup._id,
            expenseGroupName: params && params.expensesGroup.expenseGroupName,
            expenseList: params && params.expenseList,
            usersList: params && params.expensesGroup.usersList,
            usersMap: params && params.usersMap,
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
        this.state.expenseList.forEach(expense => {
            let nbTos = expense.to.length;
            expense.to.forEach(to => {
                let currentWow = this.state.whoOwesWhom;
                let exists = (this.state.whoOwesWhom.length != 0) ? this.checkIfExists(expense.from, to) : 0;
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
        });

    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.whoOwesWhom}
                    renderItem={({ item }) => (
                        <ListItem
                            key={item}
                            title={`${item.amount}` > 0 ? `${this.state.usersMap.get(item.to)} doit ${Math.abs(item.amount.toFixed(2))}€ à ${this.state.usersMap.get(item.from)}` : `${this.state.usersMap.get(item.from)} doit ${Math.abs(item.amount.toFixed(2))}€ à ${this.state.usersMap.get(item.to)}` }
                            leftAvatar={{ source: { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" } }}
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
