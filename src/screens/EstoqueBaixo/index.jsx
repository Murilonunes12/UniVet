import React,{useEffect, useState, useCallback} from 'react';
import {
    Container, 
    ListStyle, 
    Text, 
    ListArea,
    Product,
    NameProduct,
    QuantityProduct,
    Header,
    Title,
    ViewIconHeader,
    ViewIcon,
    ListAreaNull,
    TextNull,
    
} from './style';
import {Alert, FlatList} from 'react-native';
import Produtos from '../../services/Sqlite/CadastroProduto';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function EstoqueBaixo(){

    const [allData, setAllData] = useState([]);
    const [filterData, setFilterData] = useState();

    const nav = useNavigation();

    useEffect(() => {
        getList();
    },[])

    useEffect(() => {
          lowEstoque();
    }, [allData])

    async function getList(){
        try {
            const response = await Produtos.selectAll();
            setAllData(response);
        } catch (error) {
            console.log(error)
        }
    }

    const handleDetailProduct = (product) => {
        nav.navigate("Detalhes do Produto" , {product})
    }

    const renderItem = useCallback (({item}) =>  
    <Product onPress={() => handleDetailProduct(item)} key={item?.idProduto}>
        <NameProduct>{item?.nome}</NameProduct>

            <QuantityProduct>Estoque: {item?.quantidade}</QuantityProduct>
    </Product>, []
) 

  const lowEstoque = () => {
      
    let filterData = allData.filter(produto => {
        if(produto.quantidade <= produto.qtMin){
            return produto
        }
    })
    setFilterData(filterData);
  
  }

    return(
        <Container>
            <Header>
                <ViewIconHeader>
                    <Title>
                        Estoque baixo
                    </Title>
                    <ViewIcon onPress={() => Alert.alert(' baixo ⚠', 'Aqui aparecerão os produtos que estão com a quantidade em estoque menor ou igual a quantidade minima que você definiu ao cadastrar.')}>
                     <MaterialCommunityIcons name="comment-question" size={28} color="black" /> 
                    </ViewIcon>                             
                </ViewIconHeader>
            </Header>
            {filterData != '' ? 
              <ListArea>
                <FlatList
                data={filterData}
                keyExtractor={item => String(item.idProduto)}
                renderItem={renderItem}                
                />
            </ListArea> : 
               <ListAreaNull> 
                <TextNull>
                    Nenhum produto com estoque baixo.               
                </TextNull>                
                </ListAreaNull>
            } 
               
        </Container>
    )
}