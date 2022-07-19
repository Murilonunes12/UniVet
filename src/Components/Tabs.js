import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import Agenda from '../screens/New/Index'
import Profile from '../screens/Profile/Index'
import Pesquisar from "../screens/Pesquisar/Index"


import { FontAwesome, MaterialCommunityIcons,AntDesign,Ionicons } from '@expo/vector-icons'; 
import CadAnimal from '../screens/CadAnimal';
import Chat from '../screens/Chat/Chat';


const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
         screenOptions = {
                 {
                 tabBarShowLabel: false,
                 tabBarStyle: {
                     display:'flex',
                     bottom: 12,
                     left: 0,
                     right: 40,
                     elevation: 0,
                     backgroundColor: '#fff',
                     borderRadius: 30,
                     height: 65,
                     ...styles.shadow,
                 },
             }
         }
        >

        <Tab.Screen name="Início"component={HomeScreen} 
        options={{
            tabBarIcon: ({focused}) => (
                <View style={{alignItems:'center',justifyContent:'center', top: 10}}>
                 <FontAwesome name="home" size={24} color='#748c94' /> 
                  <Text style={{
                      color: focused ? '#fff ' : '#748c94', fontSize: 16
                      }}> Início </Text>
                </View>
            ), headerShown: false,
               
            
        }}/>
                
        <Tab.Screen name="Consulta"component={Agenda}
         options={{
            tabBarIcon: ({focused}) => (
                <View style={{alignItems:'center',justifyContent:'center', top: 10}}>
                 <AntDesign name="pluscircle" size={24} color='#748c94' /> 
                  <Text style={{
                      color: focused ? '#acfae5 ' : '#748c94', fontSize: 16
                      }}> Agenda </Text>
                </View>
            ), headerShown: false,
        }}/>
        <Tab.Screen name="Pesquisar"component={Pesquisar}
         options={{
            tabBarIcon: ({focused}) => (
                <View style={{alignItems:'center',justifyContent:'center', top: 10}}>
                 <AntDesign name="search1" size={24} color='#748c94' /> 
                  <Text style={{
                      color: focused ? '#acfae5 ' : '#748c94', fontSize: 16
                      }}> Pesquisar </Text>
                </View>
            ), headerShown: false,
        }}/>
        
        <Tab.Screen name="Perfil"component={Profile}
         options={{
            tabBarIcon: ({focused}) => (
                <View style={{alignItems:'center',justifyContent:'center', top: 10}}>
                 <MaterialCommunityIcons name="face-profile" size={24} color='#748c94'  /> 
                  <Text style={{
                      color: focused ? '#acfae5 ' : '#748c94', fontSize: 16
                      }}> Perfil </Text>
                </View>
            ), headerShown: false,
        }}/>    
        
    </Tab.Navigator>
    );
}



const styles = StyleSheet.create({
    shadow:{
        shadowColor: '#755df0',
        shadowOffset:{
            width:0,
            height:10,
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5,
    }
});

export default Tabs;