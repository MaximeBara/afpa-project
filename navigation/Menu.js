import React from "react";
import { DrawerItems } from 'react-navigation';
import { TouchableWithoutFeedback, ScrollView, StyleSheet, Dimensions, Image } from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Icon } from '../components/';
import { Images, materialTheme } from "../constants/";

import firebase from 'firebase';
import axios from 'axios';

import NavigationService from '../screens/NavigationService.js';

const { width } = Dimensions.get('screen');

//  Check userInfos : undefined ??
//  Facebook via firebase !!
//  Icones
//  Et c'est good pour ce soir !

function getUserInfos(email) {
  const data = axios.get('https://afpa-project.herokuapp.com/users?email=' + email)
    .then(res => {
      return res.data[0];
    })
    .catch(
      error => console.log('Error :', error));
  return data;
}

let userInfos;

firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    userInfos = getUserInfos(user.email).then(async data => {
      userInfos = data;
    });
  }
});

console.log('userInfos: ', userInfos);

const Drawer = (props) => (
  <Block style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
    <Block flex={0.2} style={styles.header}>
      <TouchableWithoutFeedback onPress={() =>
        NavigationService.navigate('User')} >
        <Block style={styles.profile}>
          <Image source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }} style={styles.avatar} />
          <Text h5 color="white">{userInfos.email}</Text>
        </Block>
      </TouchableWithoutFeedback>
      {/* <Block row>
        <Block middle style={styles.pro}>
          <Text size={16} color="white">NTM</Text>
        </Block>
        <Text size={16} muted style={styles.seller}>NTM</Text>
        <Text size={16} color={materialTheme.COLORS.WARNING}>
          NTM <Icon name="shape-star" family="GalioExtra" size={14} />
        </Text>
      </Block> */}
    </Block>
    <Block flex>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <DrawerItems {...props} />
      </ScrollView>
    </Block>
  </Block >
);

const Menu = {
  contentComponent: props => <Drawer {...props} />,
  drawerBackgroundColor: 'white',
  drawerWidth: width * 0.8,
  contentOptions: {
    activeTintColor: 'white',
    inactiveTintColor: '#000',
    activeBackgroundColor: 'transparent',
    itemStyle: {
      width: width * 0.75,
      backgroundColor: 'transparent',
    },
    labelStyle: {
      fontSize: 18,
      marginLeft: 12,
      fontWeight: 'normal',
    },
    itemsContainerStyle: {
      paddingVertical: 16,
      paddingHorizonal: 12,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#4B1958',
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 2,
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 28,
    justifyContent: 'flex-end'
  },
  profile: {
    marginBottom: theme.SIZES.BASE / 2,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: 8,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: 16,
  }
});

export default Menu;
