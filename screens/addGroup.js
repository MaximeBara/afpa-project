import React from 'react';
import { StyleSheet, Dimensions, Picker, View, Button } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Block, Text, Input, theme, Icon, Card } from 'galio-framework';
import firebase from 'firebase';
const { width } = Dimensions.get('screen');
import axios from "axios";

export default class CreateGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expenseGroupName: "",
            Nom: "",
            Prenom: "",
            Age:"",
            Pays:""
           
        };

        this.handleSubmit = this.handleSubmit.bind(this);
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

        // handleSubmit.onPress(function () {
        //     axios.post('https://afpa-project.herokuapp.com/expensesGroups')
        //         .then((res) => {
        //             this.setState({
        //                 expenseGroupName: '',
        //                 usersList: [],

        //             })
        //         }
        //         );
        // })
        //     .catch(function (error) {
        //         console.log(error);
        //     })

        handleChange(event) {
            this.setState({value: event.target.value});
          }
        
          handleSubmit(event) {
            alert('Le nom a été soumis : ' + this.state.value);
            event.preventDefault();
          }
        


    render() {
        return (
            <View style={styles.container} >
                {/* <Avatar
                    size="xlarge"
                    rounded
                    source={{
                        uri:
                            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    }}
                />
                <Block >
                    <Input
                        rounded color='blue' placeholder="group name" defaultValue={'Entrez vos informations'}  placeholderTextColor='red' />
                    {/* <Input
                        rounded color='blue' placeholder="group name" defaultValue={'Entrez vos informations'}  placeholderTextColor='red' />
                    <Input
                        rounded color='blue' placeholder="group name" defaultValue={'Entrez vos informations'}  placeholderTextColor='red' /> */}
                {/* </Block>
                <Button
                    title="Confirmer"
                    // onPress={() => Alert.alert('Simple Button pressed')}
                    onPress={this.handleSubmit}
                />  */}


                <form onSubmit={this.handleSubmit}>
                    <label>
                        Nom :
          <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <label>
                        Nom :
          <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <label>
                        Nom :
          <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <label>
                        Nom :
          <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <label>
                        Nom :
          <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Envoyer" />
                </form>

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
