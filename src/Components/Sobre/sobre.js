import React, {useRef} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Linking
} from 'react-native';
import { Feather, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import { 
  Container,
  Header, 
  Title, 
  Card, 
  CardHeader, 
  Avatar, 
  Description, 
  Bold,
  CardBody,
  UserName,
  CardFooter,
  Details,
  Value,
  Divide,
  Date,
  Actions,
  Option,
  OptionLabel,
} from './styles';




export default function Info() {
  
  return (
    <Container>
      <Card>
        <CardHeader>
          <Description>
           Sobre a clínica
          </Description>
                 
        </CardHeader>

        <CardBody>
          <UserName>
          A Clínica Veterinária UniCatólica foi inaugurada ao público em outubro de 2018. Localiza - se no Campus II do Centro Universitário Católica do Tocantins– UniCatólica, na Rodovia TO - 050, Loteamento Coqueirinho, Lote 7, Palmas– TO.
           </UserName>
        </CardBody>

        <CardFooter>
          <Details>
          <TouchableOpacity TouchableOpacity onPress = {
            () => Linking.openURL('https://to.catolica.edu.br/portal/servicos/clinica-veterinaria/a-clinica-veterinaria/')
          } >
                 <Text style={{fontSize:16, color:'#fff' }}>Abrir Matéria</Text>
             </TouchableOpacity>                
            <Divide />           
          </Details>

          <Actions>
              <Option>
              <AntDesign name="hearto" size={14} color="#fff"/>
              <OptionLabel>1</OptionLabel>
            </Option>
          </Actions>
        </CardFooter>
      </Card>     
    </Container>   
  )
}