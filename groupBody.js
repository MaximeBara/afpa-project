import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput } from 'react-native';
// import { Avatar, Card, Title, Paragraph, Button } from 'react-native-paper';
import axios from "axios";
import Constants from 'expo-constants';

export default class GroupBody extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
        }
    }


    render() {
       

       
            return (
                <View key={1} style={this.styles.container}> 
                         <TextInput  placeholder='rechercher'/>             
                     
                    {/* <FlatList
                        data={group}
                        keyExtractor={(item ) => item.id.toString()}
                        renderItem={({ item }) => <Text>{item.expenseGroupName}</Text>}
                    /> */}
                </View>
            );
        });
    }

    styles = StyleSheet.create({
        container: {
            marginTop: 100,
            flexDirection: 'row',
            flex: 6,
            justifyContent: 'center',
        },
        textinput: {
            flex: 1,
            borderWidth: 1,
        }
    });
}