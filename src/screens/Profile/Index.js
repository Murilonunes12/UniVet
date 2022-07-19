import React, { useState, useRef} from 'react';
import {View, SafeAreaView, StyleSheet, Modal} from 'react-native';
import { BackgroundImage } from 'react-native-elements/dist/config';
import {
  Avatar,
  Title,
  Caption,
  Text,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BtnMais, TextBtnMais } from '../ProductDetail/style';
import Cadastro from '../PetCard';
import { useNavigation } from '@react-navigation/native';


const ProfileScreen = () => { 
  function handleSubmit(data) {
    console.log(data);
  }
  const modalizeRef = useRef(null);
  function onOpen(){
    modalizeRef.current?.open();
  }  
  const [visible, setVisible] = useState(true)
  const nav = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={{
              uri: 'https://placeimg.com/90/90/people',
            }}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
          }]}>Murilo Nunes</Title>
            <Caption style={styles.caption}>@Nunes</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>Tocantins, Brasil</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}> (63) 99103-5915</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>murilognunes12@gmail.com</Text>
        </View>
      </View>
             <BtnMais style={{marginLeft:240}}  onPress={ () => nav.navigate('')}>
                <TextBtnMais>
                Sair
              </TextBtnMais>
            </BtnMais>
      <Text style={{color:"#777777", marginLeft: 20, fontSize: 18,}}>Gerencie seus Pets</Text> 
       <Cadastro/>   
     </SafeAreaView>
    
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#fff'

  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
