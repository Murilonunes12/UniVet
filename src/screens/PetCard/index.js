import React, { Component } from 'react';
import { Container, CardArea}  from './style';

import { useNavigation } from '@react-navigation/native';
import CardHome from '../../Components/CardProfile';


export default function Cadastro(){
    const navigation = useNavigation();
    
    return(
        <Container>
            <CardArea>
                <CardHome
                title="Cadastre seu Animal"
                icon= "github"  
                iconColor= '#2aa919'
                onPress={
                    () => navigation.navigate("Cadastro de Animal")
                
                }
                />

                <CardHome
                title="Meus Animais"
                icon ="list"
                iconColor='#005fed'
                onPress = {
                    () => navigation.navigate("Consulta Animal")
                }
            />                
            </CardArea> 

            <CardArea>
            <CardHome
              title="Movimentação"
              icon="zap"
              iconColor='#0c1b54'
              onPress={() => navigation.navigate("Entrada Estoque")}
            />
            <CardHome
                title="Relatório"
                icon="activity"
                iconColor='#ff9f22'
                onPress={() => navigation.navigate("Relatorio")}
            />
        </CardArea>

        </Container>
   )
}