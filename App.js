import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { firebase } from './src/firebase/config'
import { NavigationContainer, StackRouter } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import {decode, encode} from 'base-64'
import Tables from './src/services/Sqlite/CreateTables';


if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

import { LogBox } from 'react-native'
import Routes from './src/routes/StackRouts';
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();
export default function App() {
  
  useEffect(() => {
    const CreateTables = () => {
      try {
        Tables.createTables();
      } catch (error) {
        console.log(error)
      }
    }
  
    CreateTables();
  }, [])  

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

    
  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) {
    return (
      <></>
    )
  }

  return ( 
         
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <Stack.Screen name = "Inicio"
          component = {Routes}
          options = {{headerShown: false,}}
          />
        ) : (
          <>
            
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
            <Stack.Screen name="Registration" component={RegistrationScreen} options={{headerShown:false}}/>  
            
          </>
          )}
           
      </Stack.Navigator>
    </NavigationContainer>
  );
}