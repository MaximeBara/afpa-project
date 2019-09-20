import React from 'react';
import axios from 'axios';
import { View, StyleSheet, Text, FlatList } from 'react-native';

export default class ExpensesList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      category: '',
      expenseName: '',
      amount: '',
      expense: []
    };
  }

  componentDidMount() {
    axios.get('https://afpa-project.herokuapp.com/expenses?expenseGroupId=5d832f3ae7179a0c79f06acc')
      .then((response) => {
        this.setState({
          category: response.data.category,
          expenseName: response.data.expenseName,
          amount: response.data.amount,
          expense: response.data[0].expensesList
        });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    return this.state.expense.map((currentExpense, indice) => {
      return (
        <View key={indice} style={this.styles.container}>
          <Text >
            {currentExpense.category}
          </Text>
          <Text>
            {currentExpense.expenseName}
          </Text>
          <Text>
            {currentExpense.amount}
          </Text>
        </View>
      );
    });
  }

}