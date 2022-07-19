import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';



import Tabs from '../Components/Tabs';
import Chart from '../screens/Charts'
import Entrada from '../screens/Entrada';
import Relatorio from '../screens/Relatorio';
import CadProduto from '../screens/CadAnimal';
import UpdateProduto from '../screens/UpdateProd';
import CadCategoria from '../screens/CadCategoria';
import EstoqueBaixo from '../screens/EstoqueBaixo';
import NewQuantidade from '../screens/NewQuantidade';
import ProductDetail from '../screens/ProductDetail';
import ConsultaAnimal from '../screens/ConsultaAnimal';



const myOptions = {
  title: "Detalhes", 
  headerTintColor:'#eeeeee',
  headerRight:() => (<Entypo name="menu" size={24} color="#ffcc00" />), 
  headerTitleAlign:'center' ,
  headerStyle:{
    backgroundColor:'#1a1a1a'
  }
}

const Routes = () => {

    const {Screen,Navigator} = createStackNavigator();

    return(   
            <Navigator Navigator initialRouteName = "ProfileScreen" >

                    <Screen 
                      options={{headerShown: false}}
                      name = "HomeScreen"
                      component={Tabs}
                    />

                    <Screen                     
                      name="Cadastro de Animal"
                      component={CadProduto}
                      options={{headerShown: false}} 
                    />


                    <Screen                      
                      name = "Consulta Animal"
                      component={ConsultaAnimal}
                      options={{headerShown: false}}
                    />


                    <Screen                      
                      name="Nova Categoria"
                      component={CadCategoria}
                      options={{headerShown: false}}
                    />  

                     <Screen                      
                      name="Chart"
                      component={Chart}
                      options={{headerShown: false}}
                    /> 

                    <Screen                      
                      name="Estoque Baixo"
                      component={EstoqueBaixo}
                      options={{headerShown:false}}  
                    />

                    <Screen                      
                      name="Detalhes do Produto"
                      component={ProductDetail}
                      options={{headerShown:false}}                  
                    />

                    <Screen                      
                      name="Entrada Estoque"
                      component={Entrada}
                      options={{headerShown:false}}                    
                    />

                    <Screen                      
                      name="Nova quantidade"
                      component={NewQuantidade}
                      options={{headerShown:false}}                   
                    />

                     <Screen                      
                      name="Atualizar produto"
                      component={UpdateProduto}
                      options={{headerShown:false}}                   
                    />

                    <Screen                      
                      name="Relatorio"
                      component={Relatorio}
                      options={{headerShown:false}}                  
                    />                 

            </Navigator>
  

    )}

function bootom (){
 <Tabs/>
}

export default Routes;