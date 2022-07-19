import React, { useEffect, useState, useRef } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { NavigationContainer, StackRouter } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import styles from './styles';
import Tips from '../../Components/Tips';
import Banner from '../../Components/Banner';
import Activities from '../../Components/Activities';
import { ScrollView } from 'react-native-gesture-handler';
import { Container } from '../PetCard/style';
import Info from '../../Components/Sobre/sobre';

const {Screen,Navigator} = createStackNavigator();

export default function HomeScreen() {   
    return (

        <ScrollView>
            <Container>
                <View>              
             <Info/>
             <Activities/>
             <Banner /> 

        </View>
            </Container>
        </ScrollView>
    )
}
