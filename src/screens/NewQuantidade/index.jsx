import React from 'react'
import {
  Container,
  Btns,
  DataArea,
  SubTitle,
  Title,
  Main,
  Btn2,
  Btn1,
  Btn3,
  Btn4,
  InputQuantity,
  ViewBtn,
  Column,
  TextBtn,
  CardTitle,
  CardText,
  TxtBtnConfirm

} from './style';
import {useRoute} from '@react-navigation/native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Produtos from '../../services/Sqlite/CadastroProduto';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function NewQuantidade(){
   
    const route = useRoute();
    const { product } = route.params;
    const [quantity, setQuantity] = useState(product.quantidade);
    const navigation = useNavigation();

    async function handleConfirm(){
         
      Alert.alert("Atualizar", "Confirmar nova quantidade de vacinas", [
        {
          text: 'Não ❌',
          style: 'cancel',
        },
        {
          text: 'Sim ✅',
          onPress: async () =>{
            if(quantity < 0) return alert("A quantidade não pode ser menor que zero.")
            const response = await Produtos.updateQuantity(product.idProduto, quantity)
            if(response > 0){
             Alert.alert('Sucesso ✅', 'Vacinas atualizadas com sucesso')
             navigation.navigate("HomeScreen")
            }
          }
        }
      ]) 
    }
    
    return(
      <Container>
        
        <Title>Movimentação</Title>
           <DataArea>
             <CardText>
              <CardTitle>{product.nome}</CardTitle>
             </CardText>
             <SubTitle>Código: {product.codBar}</SubTitle>
             <SubTitle>Valor:R$ {product.valor}</SubTitle>
             <SubTitle>Vacinas Tomadas: {product.quantidade}</SubTitle>
           </DataArea>
         

           <Main>
               
              <Column>
              <SubTitle>Entrada</SubTitle>  
                <ViewBtn>
                  <Btn1 onPress={() => setQuantity(quantity + 1)}>
                    <MaterialIcons name="exposure-plus-1" size={24} color="white" />
                  </Btn1>
                          
                  <Btn2 onPress={() => setQuantity(quantity + 2)}>
                    <MaterialIcons name="exposure-plus-2" size={24} color="white" />
                  </Btn2>
                </ViewBtn>
              </Column>  
                 
                 <InputQuantity
                  
                  value={quantity.toString()}
                  onChangeText={t => {setQuantity(t)}}
                  keyboardType="numeric"
                 />

              <Column>
              <SubTitle>Saída</SubTitle>                 
                <ViewBtn> 
                  <Btn3 onPress={() => setQuantity(quantity - 1)}>
                    <MaterialIcons name="exposure-neg-1" size={24} color="white" />
                  </Btn3>
                      
                  <Btn4 onPress={() => setQuantity(quantity - 2)}>
                    <MaterialIcons name="exposure-neg-2" size={24} color="white" />
                  </Btn4>
                </ViewBtn>   
              </Column>
           </Main>


           <Btns onPress={() => handleConfirm()}>
             <TxtBtnConfirm>Salvar</TxtBtnConfirm>
           </Btns>
      </Container>
    )
}