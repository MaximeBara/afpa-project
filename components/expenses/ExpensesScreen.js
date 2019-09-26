import React from 'react';
import axios from 'axios';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

export default class ExpensesScreen extends React.Component {

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
    title: 'ExpensesList'
  }

  componentDidMount() {
    axios.get('http://10.115.21.19:3000/expenses?expenseGroupId=5d80629c50a36c9b802333aa')
      .then((response) => {
        this.setState({
          category: response.data.category,
          expenseName: response.data.expenseName,
          amount: response.data.amount,
          expense: response.data[0].expenseList
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.expense}
          renderItem={({ item }) => (
            <ListItem
              key={item}
              title={`${item.expenseName}     ${item.amount}€`}
              subtitle={item.expenseDesc}
              leftAvatar={{ source: { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" } }}
              bottomDivider
            />
          )}
        />


        <View style={styles.buttonPlus}>
          <Button
            title="Press me"
            onPress={() => this.props.navigation.navigate('AddExpense', { parametre: 'toto' })}
          />
        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  buttonPlus: {
    alignItems: 'center',
    marginTop: 50
  }
});
