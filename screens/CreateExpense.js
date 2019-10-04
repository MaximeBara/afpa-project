import React from 'react';
import { View, StyleSheet, Picker, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Block, Input, Text, Checkbox } from 'galio-framework';
import axios from "axios";

export default class CreateExpense extends React.Component {

    constructor(props) {
        super(props);
        this.state = { usersList: [], categoryList: [], from: 'error', category: 'error', name: 'error', amount: 'error', checked: [] };
    }

    componentDidMount() {
        let array = [];
        this.props.navigation.state.params.usersList.forEach(element => {
            let res = this.nameUserList(element).then(async data => {
                array.push(data);
                this.setState({
                    usersList: array
                });
            });
        });
        this.categoriesList().then(data => {
            this.setState({
                categoryList: data
            });
        })
    }

    categoriesList() {
        let data = axios.get('https://afpa-project.herokuapp.com/categories')
            .then(response => {
                console.log('response.data : ', response.data);
                return response.data
            })
            .catch(function (error) {
                console.log(error);
            });
        return data;
    }

    nameUserList(element) {
        const data = axios.get('https://afpa-project.herokuapp.com/users/' + element)
            .then((response) => {
                let res = { _id: element, name: response.data[0].name, firstname: response.data[0].firstname };
                return res;
            })
            .catch(function (error) {
                console.log(error);
            })
        return data;
    }

    checkboxUsersList() {
        return (
            <View >
                {this.state.usersList.map(i => {
                    return (
                        <Checkbox
                            checkboxStyle={{
                                borderWidth: 3
                            }}
                            label={i.firstname}
                            onChange={(itemValue, itemIndex) =>
                                this.checkedOrnot(itemValue,i.firstname)
                            }
                        />
                    );
                })}
            </View>
        )
    }

    checkedOrnot(itemValue,label) {
        let array = this.state.checked;
        if(itemValue.target) {
            console.log('true');
            array.push(label);
            this.setState({ checked: array })
        } else {
            console.log('false');
            for(let i = 0; i < array.length; i++){
                if(array[i] == label) {
                    array.splice(i,1);
                }
            }
            this.setState({ checked: array })
        }
        console.log('checked : ', this.state.checked);
    }

    pickerUserList() {
        return (
            <Picker
                selectedValue={this.state.from}
                style={styles.textInput}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({ from: itemValue })
                }>
                {this.state.usersList.map(i => {
                    return <Picker.Item label={i.firstname} value="rndm" />
                })}
            </Picker>
        );
    }

    pickerCategory() {
        return (
            <Picker
                selectedValue={this.state.category}
                style={styles.textInput}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({ category: itemValue })
                }>
                {this.state.categoryList.map(i => {
                    return <Picker.Item label={i.categoryName} value="rndm" />
                })}
            </Picker>
        );
    }

    onPressButton() {
        alert('expense add with success !');

        const newExpense = {
            category: this.state.category,
            expenseName: this.state.name,
            amount: this.state.amount,
            currency: this.state.currency,
            from: this.state.from,
            to: this.state.checked,
        }

        axios.post('https://afpa-project.herokuapp.com/expenses', newExpense)
            .then(res => {
                console.log(res.data);
                this.props.update();
            });

        this.setState({
            title: '',
            completed: false
        })

    }

    render() {
        console.log('RENDER');
        return (
            <View>
                <View style={styles.view}>
                    <Text style={styles.text} p>Category :</Text>
                    {this.pickerCategory()}
                </View>
                <View style={styles.view}>
                    <Text style={styles.text} p>Name :</Text>
                    <Block>
                        <Input
                            placeholder="Name"
                            color='black'
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ name: itemValue })
                            }
                        />
                    </Block>
                </View>
                <View style={styles.view}>
                    <Text style={styles.text} p>Description :</Text>
                    <Block>
                        <Input
                            placeholder="Description"
                            color='black'
                        />
                    </Block>
                </View>
                <View style={styles.view}>
                    <Text style={styles.text} p>Amount :</Text>
                    <Block>
                        <Input
                            placeholder="Amount"
                            type='numeric'
                            color='black'
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ amount: itemValue })
                            }
                        />
                    </Block>
                </View>
                <View style={styles.view}>
                    <Text style={styles.text} p>currency :</Text>
                    <Picker
                        selectedValue={this.state.currency}
                        style={styles.textInput}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ currency: itemValue })
                        }>
                        <Picker.Item label="dollard" value="us" />
                        <Picker.Item label="livre" value="uk" />
                        <Picker.Item label="dinard" value="dz" />
                        <Picker.Item label="leu" value="ro" />
                    </Picker>
                </View>
                <View style={styles.view}>
                    <Text style={styles.text} p>from :</Text>
                    {this.pickerUserList()}
                </View>
                <View style={styles.view}>
                    <Text style={styles.text} p>to :</Text>
                    <View style={styles.checkbox}>
                        {this.checkboxUsersList()}
                    </View>
                </View>
                <View
                    style={styles.button}>
                    <Button
                        onPress={() => this.onPressButton()}
                        title="Press Me"
                    >
                    </Button>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10
    },
    text: {
        marginTop: 5,
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
    },
    textStyle: {
        margin: 24,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#344953'
    },
    checkbox: {
        flexDirection: 'column',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
