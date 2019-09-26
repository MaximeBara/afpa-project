import React from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TextInput, Picker } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class AddExpenseScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currency: 'euro',
            from: '',
            to: '',
            category: '',
            expenseName: '',
            amount: '',
            expense: []
        };
    }

    static navigationOptions = {
        title: 'ADD EXPENSE'
    }

    render() {
        console.log('propsNav: ', this.props.navigation);
        return (
            <View>
                <View style={styles.view}>
                    <Text style={styles.text}>Category :</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Category'
                        maxLength={20}
                    />
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Name :</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Name'
                        maxLength={20}
                    />
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Description :</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Description'
                        maxLength={40}
                    />
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Amount :</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='€€'
                        maxLength={5}
                    />
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>currency :</Text>
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
                    <Text style={styles.text}>from :</Text>
                    <Picker
                        selectedValue={this.state.from}
                        style={styles.textInput}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ from: itemValue })
                        }>
                        <Picker.Item label="Abdelhak" value="ab" />
                        <Picker.Item label="Anthony" value="am" />
                        <Picker.Item label="Maxime" value="mb" />
                    </Picker>
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>to :</Text>
                    <Picker
                        selectedValue={this.state.to}
                        style={styles.textInput}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ to: itemValue })
                        }>
                        <Picker.Item label="Abdelhak" value="ab" />
                        <Picker.Item label="Anthony" value="am" />
                        <Picker.Item label="Maxime" value="mb" />
                    </Picker>
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
    }
});
