import React from 'react';
import { StyleSheet, Dimensions, Picker, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Block, Text, Input, theme, Icon, Card } from 'galio-framework';
import firebase from 'firebase';
const { width } = Dimensions.get('screen');
import axios from "axios";

export default class UpdateGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expenseGroupName: "",
            usersList: [],
            expenseList: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('https://afpa-project.herokuapp.com/expensesGroups/5d832ee2e7179a0c79f06aa8')
            .then((res) => {
                let itemData = res.data[0];
                this.setState({
                    expenseGroupName: itemData.expenseGroupName,
                    usersList: itemData.usersList,
                    expenseList: itemData.expenseList
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleChange(event) {
        console.log(event)
        this.setState({ expenseGroupName: event });
    }

    handleCreateExpense = () => {
        this.props.navigation.navigate('addGroup');
    }

    handleSubmit(event) {
        axios.put('https://afpa-project.herokuapp.com/expensesGroups/5d832ee2e7179a0c79f06aa8', this.state)
            .then((res) => {
                alert('Le nom a été soumis : ' + this.state.expenseGroupName);
                event.preventDefault();
                console.log("Res: ", res);

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (

            <View style={styles.container} >
                {/* <ScrollView style={styles.scrollView}> */}
                <Avatar
                    size="xlarge"
                    rounded
                    source={{
                        uri:
                            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    }}
                />
                <Block >
                    <Input
                        rounded color='blue' placeholder="group name" defaultValue={this.state.expenseGroupName} onChangeText={this.handleChange} placeholderTextColor='red' />
                </Block>
                <View style={styles.MainContainer}>
                    <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5} onPress={() => this.handleCreateExpense()}>
                        <Text style={styles.TextStyle}>+</Text>
                    </TouchableOpacity>
                </View>
                <Button
                    title="Confirmer"
                    // onPress={() => Alert.alert('Simple Button pressed')}
                    onPress={this.handleSubmit}
                />


            </View>


        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    containerBis: {
        backgroundColor: '#fff',
    },
    // scrollView: {
    //     backgroundColor: 'pink',
    //     marginHorizontal: 20,
    //   },
    MainContainer: {
      //  flex: 1,
       // justifyContent: 'center',
       // alignItems: 'center',
      //  margin: 10,
      //  marginTop: 50,
    },
    FacebookStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#485a96',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 70,
        width: 70,
        borderRadius: 140,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextStyle: {
        color: '#fff',
        fontSize: 50,
        fontWeight: 'bold',
       // marginBottom: 4,
    },
});
