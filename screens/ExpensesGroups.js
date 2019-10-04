import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TextInput, View, Button, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Block, Text, Input, theme } from 'galio-framework';
import { FontAwesome } from '@expo/vector-icons';

import firebase from 'firebase';
const { width } = Dimensions.get('screen');

import axios from "axios";

export default class ExpensesGroups extends React.Component {

    constructor() {
        super();
        this.state = {
            allGroups: []
        }
    }

    componentDidMount() {
        axios.get('https://afpa-project.herokuapp.com/expensesGroups?userId=5d837333c3ae8f68ae680eec')
            .then(res => {
                let expensesGroups = res.data;
                this.setState(
                    {
                        allGroups: expensesGroups
                    }
                );
            });
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.allGroups}
                    renderItem={({ item }) => (
                        <ListItem
                            key={item.group._id}
                            title={`${item.group.expenseGroupName}`}
                            leftAvatar={{ source: { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" } }}
                            onPress={() => this.props.navigation.navigate('Expenses', { 'expensesGroup' : item.group })}
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
