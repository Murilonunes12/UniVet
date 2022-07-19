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




export default function Activities() {
  
  return (
    <Container>
      <Card>
        <CardHeader>
          <Description>
           Atendimento Emergencial 
          </Description>
                 
        </CardHeader>

        <CardBody>
          <UserName>
          Restrito aos casos graves em que o paciente não poderia aguardar por um agendamento de consulta com antecedência.Recomenda - se, portanto, que o interessado ligue para a Clínica Veterinária antes de se dirigir ao local em busca de pronto atendimento.Assim, conseguimos assegurar a qualidade dos serviços prestados.
          </UserName>
        </CardBody>

        <CardFooter>
          <Details>
          <TouchableOpacity TouchableOpacity onPress = {
            () => Linking.openURL('https://wa.me/5563992017224')
          } >
                 <Text style={{fontSize:16, color:'#fff' }}>Ligar para a clínica</Text>
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