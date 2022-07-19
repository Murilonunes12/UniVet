import React,{useState} from 'react';
import {Container,ContentArea,Title} from './style';
import {Feather} from '@expo/vector-icons';




export default function CardHome(props){

  
   
    return(

      <Container
      style={{elevation:12}}
        onPress={props.onPress}>
        <Feather name={props.icon} size={30} color={props.iconColor} />
          <ContentArea>
              <Title>{props.title}</Title>
          </ContentArea>

      </Container>

    )
}