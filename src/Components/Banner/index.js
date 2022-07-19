import React from 'react';
import { Container, Details, Img, Title, Description } from './styles';
import img13 from '../../../assets/images/13.png'

export default function Banner ({navigation}) {
  return (
    <Container >
      <Details>
        <Title>Cuide de seu Pet</Title>        
        <Description>
          Matenha seus amigos sempre saudáveis.
        </Description>
      </Details>
      <Img source={img13} />
    </Container>  
  );
}

