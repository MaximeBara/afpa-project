import React from 'react';
import { StyleSheet, Dimensions, View, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Text, theme } from 'galio-framework';
import axios from "axios";

const { width } = Dimensions.get('screen');


export default class Expenses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.navigation.state.params._id,
            usersList: this.props.navigation.state.params.usersList,
            category: '',
            expenseName: '',
            amount: '',
            expense: []
        };
    }

    componentDidMount() {
        axios.get('https://afpa-project.herokuapp.com/expenses?expenseGroupId=' + this.state._id)
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

    handleCreateExpense = () => {
        this.props.navigation.navigate('CreateExpense', { 'usersList': this.state.usersList });
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.expense}
                    renderItem={({ item }) => (
                        <ListItem
                            key={item._id}
                            title={`${item.expenseName}     ${item.amount}€`}
                            subtitle={item.expenseDesc}
                            leftAvatar={{ source: { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" } }}
                            bottomDivider
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />

                <View style={styles.MainContainer}>
                    <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5} onPress={() => this.handleCreateExpense()}>
                        <Text style={styles.TextStyle}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <Button title='Report' onPress={() => this.props.navigation.navigate('ExpensesReport', { 'expenseGroupId': this.state._id })} style={{ marginBottom: 80 }}></Button>
                </View>
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 50,
    },
    myButton: {
        padding: 5,
        height: 70,
        width: 70,
        borderRadius: 100,
        backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center',
    }, MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginTop: 50,
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

    ImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
    },

    TextStyle: {
        color: '#fff',
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginLeft: 20,
        marginRight: 10
    },

    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginTop: 50,
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
    
      ImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
      },
    
      TextStyle: {
        color: '#fff',
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 4,
      },
});
