import React, {useState, useCallback} from 'react';
import { Container, 
    SearchRow, 
    SearchArea, 
    ViewIcon, 
    BtnScan, 
    ViewProduct, 
    Product, 
    NameProduct, 
    PriceProduct, 
    QuantityProduct,
    BtnSearch,
    TxtSearchAll,
    SectionBtns,
    ProductContentColum,
    ProductContentRow,
    ViewScan,
    BtnScanAgain,
    TextBtn,
    BtnIconAlert
 } from './style';

import InputComponent from '../../Components/InputComponent';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Produto from '../../services/Sqlite/CadastroProduto';
import { Alert ,FlatList,StyleSheet,Text,Dimensions } from 'react-native';
import { useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';




export default function ConsultaAnimal(){
    
    const [data, setData] = useState([]);
    const [filterDatas, setfilterData] = useState([]);
    const [searchName, setSearchName] = useState();
    const [searchcod, setSearchcod] = useState();
    const [showView ,setShowView] = useState(false);


    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    
    const navigation = useNavigation();


    useEffect(() => {
        getProducts();
    } ,[])

    const searchText = (e) => {
     
        
            let text = e.toLowerCase();
            let filterData = data.filter((item) =>{
                //console.log(item.nome);
                if(item.codBar == text){
                    return item
                }
                return item.nome.toLowerCase().match(text)
            })
            setfilterData(filterData);
       
     
    }

    const searchAll = () => {
        setfilterData(data);
    }

    const searchNumber = (e) => {
        let number = e;
   
        let filterData = data.filter((item) =>{
            if(item.codBar == number){
                //console.log( "TESTE" + item)
                return item
            }   
        })
    
        setfilterData(filterData)
        
    }

    async function getProducts(){
       
            const response = await Produto.selectAll();
            if(response !=""){
                setData(response);
                //console.log(data)
            }
            else{
                Alert.alert("Você ainda não tem nenhum animal cadastrado!")
            }      
    }

    
    function handleDetailProduct (product){
        navigation.navigate("Detalhes do Produto" , { product })
    }
     
    

    const ComponentIconAlert = () => {

        return(
            <BtnIconAlert onPress={() => Alert.alert('poucas vacinas aplicadas!')}>
                <MaterialCommunityIcons name="comment-alert" size={24} color="red" />
            </BtnIconAlert>
        )
    }

    const renderItem = useCallback (({item}) =>  
        <Product key={item.idProduto} onPress={() => handleDetailProduct(item)}>
            <ProductContentRow>
             <NameProduct>{item?.nome}</NameProduct>
             {item.quantidade <= item.qtMin ? <ComponentIconAlert/> : null}
            </ProductContentRow> 
                <QuantityProduct>Vacinas: {item?.quantidade}</QuantityProduct>
             
        </Product>, []
    ) 

    //SCAN BARCODE//
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    
    // useEffect(() => {
    //     checkMultiPermissions();
              
    // },[])

    const scanCodeBtn = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');

        if(status === 'granted'){
            setShowView(true)
        }
    }

    async function checkMultiPermissions() {
        const { status } = await BarCodeScanner.getPermissionsAsync();
        return status;
      }
  
  
    const handleBarCodeScanned = ({ type, data }) => {
      scanCodeBtn();     
      setScanned(true);    

        Alert.alert('Confirmar', `O código está correto? ${data}`,[
          {
            text: 'Não ❌',
            type: 'cancel',
          },
          {
            text: 'Sim ✅',
            onPress: () =>{
              setSearchcod(data),
              setShowView(false);
            }
          }
        ])
      
    };

    const test = async () => {
       const res = await checkMultiPermissions();
        
        if(res === 'granted'){
            setShowView(true);
        }else{
           await scanCodeBtn();
        }
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, SetItemsPerPage] = useState(5);
    


   
    // if (hasPermission === null) {
    //   return <Text>Requesting for camera permission</Text>;
    // }
    // if (hasPermission === false) {
    //   return <Text>No access to camera</Text>;
    // }
   
    return(
        <Container style={showView ? styles.container : ''}>
             
             {showView &&  
              
                <>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={[StyleSheet.absoluteFillObject, styles.container]}                
                    >
                   
                    <BarcodeMask edgeColor="#62B1F6" showAnimatedLine/>
                    </BarCodeScanner>
                    {scanned && <BtnScanAgain onPress={() => setScanned(false)}>
                                     <TextBtn>Escanear novamente</TextBtn>
                                 </BtnScanAgain>
                    }
                </>
             }
          
          {!showView && 
           <>   
            <SearchArea>
             <SearchRow>

                {/* <InputComponent 
                holder="Pesquisar..."
                value={searchName , searchcod}
                onChangeText={t => {    
                                   
                        setSearchName(t);
                        searchText(t);
                        setSearchcod(t);
                                   
                }}
                /> */}

                 <ViewIcon onPress={() => searchText(searchName || searchcod)}>
                             <FontAwesome name="search" size={24} color="black" />
                 </ViewIcon>
               
                </SearchRow>

            
    
                <SectionBtns>
                    <BtnSearch onPress={() => searchAll()}>
                                                 
                        <MaterialCommunityIcons name="database-search" size={34} color="black" /> 
                        <TxtSearchAll>
                            Todos
                        </TxtSearchAll>                 
                    </BtnSearch>
                                        
                </SectionBtns>

                 
            </SearchArea> 

            <ViewProduct>
            <FlatList 
                data={filterDatas}
                keyExtractor={item => String(item.idProduto)}                     
                renderItem={renderItem}           
                showsVerticalScrollIndicator={false}
                                     
                />             
            </ViewProduct>
                    
           </>
             
          }
                      
        </Container>
    )
}

const styles = StyleSheet.create({
    
        container: {
            flex: 1,
            height: Dimensions.get('window').height,
            width :Dimensions.get('window').width,
            marginTop: 0,
        },
    
        title: {
            fontSize: 20,
            fontWeight: 'bold',
        },
   
        separator: {
            marginVertical: 30,
            height: 1,
            width: '80%', 
        },
   
});