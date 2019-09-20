import React from 'react';
import axios from 'axios';
import { View, StyleSheet, Text, FlatList } from 'react-native';
export default class App extends React.Component {

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




import React from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList } from 'react-native';

class ExpensesList extends React.Component {
  render() {
    return (
      <View style={styles.main_container}>
        <TextInput style={styles.textinput} placeholder='Titre du la dépense'/>
        <Button title='Rechercher' onPress={() => {}}/>
        <FlatList
          data={[{key: 'a'}, {key: 'b'}]}
          renderItem={({item}) => <Text>{item.key}</Text>}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 20
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  }
})

export default ExpensesList;