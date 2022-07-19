import React,{useState, useEffect} from 'react';
import {
  Container,
  Btn,
  TxtBtn,
  Header,
  Title
} from './style';

import { Text, View, StyleSheet, Button, FlatList } from 'react-native';

import Produtos from '../../services/Sqlite/CadastroProduto';
import { AntDesign } from '@expo/vector-icons';

import * as Print from 'expo-print';

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing'

export default function Relatorio(){

  const [data, setData] = useState([]);
   
   useEffect(() => {
    getProducts();
   }, [])
   

   const getProducts = async () => {
        
    const res = await Produtos.selectAll();
    setData(res);
    
   }

   const renderItem = ({item}) => (
     <View key={item.idProduto}>
       <Text style={styled.textColor}>
       Animal: {item.nome}
       </Text>

       <Text style={styled.textColor}>
        Código do Atendimento: {item.codBar}
       </Text>

       <Text style={styled.textColor}>
       Vacinas tomadas: {item.quantidade}
       </Text>


       
       <View style={styled.hr}/>
     </View>
   )
  
 
  const createAndSavePDF = async (html) =>{
    try {
      const url = await Print.printToFileAsync({ html: html })
      
      const pdfName = `${url.uri.slice(
        0,
        url.uri.lastIndexOf('/') + 1
      )}EstoqueRelatório_${Math.floor(Math.random() * 256)}.pdf`
      
      await FileSystem.moveAsync({from: url.uri, to: pdfName});
      sharePdf(pdfName)
     
     }  
     catch (error) {
      console.log(error)
    }
     
  }

  const sharePdf = async (url) => {
       await Sharing.shareAsync(url);
  }
 
  const loop = data.map(prod => 
    `
     <div>
      <div>Animal: ${prod.nome}</div>
      <div>Código do Atendimento: ${prod.codBar}</div>
      <div>Vacinas tomadas: ${prod.quantidade}</div>    
      
     </div>
     <hr/>
    `  
  )

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <style> 
    body{   
    }
     .test{
       color: #000;
       text-align: center;
     }
    
     .text{
       color: #000;
       
     }
     .teste{  
         
     }
    </style>
    <body>
       <h1 class="test">Relatório</h1>
       
        <div id="teste1" class="teste"> 
          ${loop}
        </div>     
    </body>
    </html>
  `


    return(
        
     <Container>

       <Header>
        <Title>Relatório</Title>
        <Btn onPress={() => createAndSavePDF(htmlContent)}>
        <AntDesign name="sharealt" size={24} color="white" />
            <TxtBtn>
               PDF
            </TxtBtn>
          </Btn>
       </Header>
        

        <FlatList 
         data={data}
         renderItem={renderItem}
         keyExtractor={item => String(item.idProduto)}
        />
     </Container>

        

    )
}

const styled = StyleSheet.create({
  hr:{
    borderWidth:1,
    borderColor: '#ccc',
    marginBottom:10,
  },
  textColor:{
   color: '#000',
   fontWeight:'700',
  }
})