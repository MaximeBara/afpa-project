import React from 'react';
import { StyleSheet, Dimensions, Picker, View, Button } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Block, Text, Input, theme, Icon, Card } from 'galio-framework';
import firebase from 'firebase';
const { width } = Dimensions.get('screen');
import axios from "axios";
//import DatePicker from 'react-native-datepicker'
import RNPickerSelect from 'react-native-picker-select';
export default class CreateGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expenseGroupName: "",
            Nom: "",
            Prenom: "",
            Age: "",
            Pays: "",
            date: "",
            sexe: "",

        };
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeSexe = (sexe) => {
        this.setState({ sexe: sexe })
    }
    // onSubmit(e) {
    //     e.preventDefault();
    //     const newGroup = {

    //         expenseGroupName: expenseGroupName.target.value,
    //         usersList: usersList.target.value,
    //         expenseList: expenseList.target.value
    //     }
    //     axios.post('https://afpa-project.herokuapp.com/expensesGroups', newGroup)
    //         .then(res => {
    //             console.log(res.data);

    //         });
    //     this.setState({
    //         title: '',
    //         completed: false
    //     })
    // }

    //    handleSubmit.onPress(function () {
    //         axios.post('https://afpa-project.herokuapp.com/expensesGroups')
    //             .then((res) => {
    //                  this.setState({
    //                     expenseGroupName: "",
    //             Nom: "",
    //             Prenom: "",
    //             Age: "",
    //             Pays: "",
    //             date:""
    //                 })
    //             }
    //             );
    //     })
    // .catch(function (error) {
    //     console.log(error);
    // })


    /*
    * a garder
    */
    // handleChange(event) {
    //     this.setState({ value: event.target.value });
    // }

    // handleSubmit(event) {
    //     axios.post('https://afpa-project.herokuapp.com/expensesGroups')
    //         .then((res) => {
    //             this.setState({
    //                 expenseGroupName: "",
    //                 Nom: "",
    //                 Prenom: "",
    //                 Age: "",
    //                 Pays: "",
    //                 date: ""
    //             });
    //         }
    //         )

    //     .catch (function(error) {
    //         console.log(error);
    //     })
    //     alert('Le nom a été soumis : ' + this.state.value);
    //     event.preventDefault();
    // }



    render() {
        return (
            <View style={styles.container} >
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
                        color='blue' placeholder="group name" defaultValue={'Nom du groupe'} placeholderTextColor='red' />
                    <Text></Text>
                    <Input
                        rounded color='blue' placeholder="group name" defaultValue={'Nom'} placeholderTextColor='red' />
                    <Input
                        rounded color='blue' placeholder="group name" defaultValue={'Prenom'} placeholderTextColor='red' />
                    <Input
                        rounded color='blue' placeholder="group name" defaultValue={'Pays'} placeholderTextColor='red' />
                </Block>
                <RNPickerSelect
                    onValueChange={(value) => console.log(value)}
                    items={[
                        { label: 'Homme', value: 'Homme' },
                        { label: 'Femme', value: 'Femme' },
                        { label: 'Trav', value: 'Trav' },
                    ]}
                />
                <Button
                    title="Confirmer"
                    // onPress={() => Alert.alert('Simple Button pressed')}
                    onPress={this.handleSubmit}
                />


                <Text>wesh ma poule</Text>
            </View>
        );
    }
}

styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    containerBis: {
        backgroundColor: '#fff',
    },
});
