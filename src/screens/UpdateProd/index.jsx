import React, {useState, useEffect} from 'react';
import {Keyboarder,
    Container,
    InputArea,
    BtnCadastrar,
    Inputs,
    TextBtn,
    Title,
    TouchableWithout,
    ViewCode,
    BtnCode,
    InputCode,
    Main,
    BtnScanAgain,
    TitleMain
    
} from './style';
import InputComponent from '../../Components/InputComponent';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {TextInputMask} from 'react-native-masked-text';
import {useNavigation, useRoute} from '@react-navigation/native';


//Components//
import PickerCategoria from '../../Components/PickerCategoria';
import BtnConfirm from '../../Components/BtnConfirm';

//models//
import Categorias from '../../services/Sqlite/Categoria';
import CadastroProduto from '../../services/Sqlite/CadastroProduto';
import {BarCodeScanner} from 'expo-barcode-scanner';
import BarCodeMask from 'react-native-barcode-mask';


import { 
    Keyboard,
    StyleSheet,
    View, 
    Text,
  } from 'react-native';
import { Alert } from 'react-native';


export default function CadProduto({navigation}){
  
   const route= useRoute();
   const { product } = route.params;
   console.log(product)
    const [categoriaProduto, setCategoriaProduto] = useState([]);
    const [codigo, setCodigo] = useState(String(product.codBar));
    const [selectedCategoria, setSelectCategoria] = useState();
    const [name, setName] = useState(product.nome);
    const [quantity, setQuantity] = useState(String(product.quantidade));
    const [quantitymin, setQuantityMin] = useState(String(product.qtMin));
    const [value, setValue] = useState(product.valor);
    const [desc, setDesc] = useState(product.descricao);
    const [peso, setPeso] = useState(String(product.peso));

    const [dataCategoria, setDataCategoria] = useState();

     
    const nav = useNavigation();

  



   

    //EFEITOS BORDER//
    const [isFocusName, setIsFocusName] = useState(false);
    const [isFocusValor, setIsFocusValor] = useState(false);
    const [isFocusQuantity, setIsFocusQuantity] = useState(false);
    const [isFocuscodigo, setIsFocusCodigo] = useState();
    const [isFocusQuantityMin, setIsFocusQuantityMin] = useState();
    const [isFocusDesc, setIsFocusDesc] = useState();
    const [isFocusPeso, setIsFocusPeso] = useState();

    const [isFilledName, setIsFilledName] = useState(true);
    const [isFilledValor, setIsFilledValor] = useState(true);
    const [isFilledQuantity, setIsFilledQuantity] = useState(true);
    const [isFilledCodigo, setIsFilledCodigo] = useState(true);
    const [isFilledQuantityMin, setIsFilledQuantityMin] = useState(true);
    const [isFilledDesc, setIsFilledDesc] = useState(true);
    const [isFilledPeso, setIsFilledPeso] = useState(true);
    
    
   //\EFEITOS BORDER\//
   
    function handleInputBlurName() {
        setIsFocusName(false);
        setIsFilledName(!!name)
      }
      function handleInputBlurValor() {
        setIsFocusValor(false);
        setIsFilledValor(!!value)
      }
      function handleInputBlurCodigo() {
        setIsFocusCodigo(false);
        setIsFilledCodigo(!!codigo)
      }
      function handleInputBlurQuantity() {
        setIsFocusQuantity(false);
        setIsFilledQuantity(!!quantity)
      }

      function handleInputBlurQuantityMin() {
        setIsFocusQuantityMin(false);
        setIsFilledQuantityMin(!!quantitymin);
      }

      function handleInputBlurDesc() {
        setIsFocusDesc(false);
        setIsFilledDesc(!!desc)
      }
      
      function handleInputBlurPeso(){
        setIsFocusPeso(false);
        setIsFilledPeso(!!peso)
      }

      
      
      function handleInputFocusName() {
        setIsFocusName(true);
      }
    
      function handleInputFocusValor() {
        setIsFocusValor(true);
     }
    
     function handleInputFocusQuantity() {
        setIsFocusQuantity(true);
    }
     
    function handleInputFocusCodigo() {
        setIsFocusCodigo(true);
    }

    function handleInputFocusQuantityMin() {
      setIsFocusQuantityMin(true);
     }

     function handleInputFocusDesc() {
      setIsFocusDesc(true);
    }

    function handleInputFocusPeso() {
      setIsFocusPeso(true);
    }

    
    
      function handleInputChangeName(name) {
        setIsFilledName(!!name);
        setName(name);
      }
    
      function handleInputChangeValor(valor) {
        setValue(valor);
        setIsFilledValor(!!valor);
      }

      function handleInputChangeQuantitymin(quantitymin){
        setIsFilledQuantityMin(!!quantitymin);
        setQuantityMin(quantitymin)
      }

      
      function handleInputChangeDesc(desc){
        setIsFilledDesc(!!desc);
        setDesc(desc)
      }

      function handleInputChangePeso(peso){
        setIsFilledPeso(!!peso);
        setPeso(peso)
      }
    
      function handleInputChangeQuantity(quantity) {
        setQuantity(quantity);
        setIsFilledQuantity(!!quantity);
      }

      function handleInputChangeCodigo(codigo) {    
        setCodigo(codigo);
        setIsFilledCodigo(!!codigo);
      }
      
     



      async function handleConfirm (){
         
  
        if(name && codigo && peso && selectedCategoria != undefined){        
          const pesoReplace = peso.replace(",",".");
          const response = await CadastroProduto.update( product.idProduto,{ codBar: codigo, nome: name , descricao: desc, peso: pesoReplace, quantidade:quantity, qtMin:quantitymin, valor:value, id_categoria:selectedCategoria});
 
          if(response > 0){
            Alert.alert("Animal Atualizado ✅", "Atualizado com sucesso")
            nav.navigate("HomeScreen")
          }else{
            Alert.alert("Algo deu errado ao cadastrar, verfique se não existe caracteres especiais nos campos.")
          }

        }else{
          Alert.alert("Campo vazio","Preencha todos os campos para atualizar o produto.")
        };
  
      }

    


    //SCAN BARCODE//
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [showView ,setShowView] = useState(false);
    
    useEffect(() => {
        checkMultiPermissions();
        //scanCodeBtn();
    },[])

    const scanCodeBtn = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    }

    async function checkMultiPermissions() {
        const { status } = await BarCodeScanner.getPermissionsAsync(
          
        );
        if (status !== 'granted') {
         console.log("Nao tem permissao")
        }
        else{
            console.log("ja tem permissao")
            console.log(status);
        }
      }
  
  
    const handleBarCodeScanned =  ({ type, data }) => {
          
      setScanned(true);    
      Alert.alert('Confirmar', `O código está correto? ${data}`,[
          {
            text: 'Não ❌',
            type: 'cancel',
          },
          {
            text: 'Sim ✅',
            onPress: () =>{
              setCodigo(data), 
              setShowView(false);
              
            }
          }
        ])
      
    };

    const showViewScan = async () => {
       await scanCodeBtn(); 
        setShowView(true);
        //console.log(showView);
    }
    

    return(
        
           <Main>
                  {showView && 
                   <>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={[StyleSheet.absoluteFillObject, styles.container]}                
                    >
                      
                      
                      <BarCodeMask edgeColor="#62B1F6" showAnimatedLine/>

                   
                    </BarCodeScanner>
                    {scanned && <BtnScanAgain onPress={() => setScanned(false)}>
                                      <Title>Escanear novamente</Title>
                                  </BtnScanAgain>
                    }
                   </>
                   
                  }

            <TouchableWithout onPress={Keyboard.dismiss}>
                <Container>

                  
                  {!showView &&  
                 <InputArea>
                    <TitleMain>Atualizar produto</TitleMain>
                        <ViewCode
                          
                          style={[
                            (isFocuscodigo || isFilledCodigo) && {borderColor:'#32B768'}
                        ]}
                        >
                            <InputCode
                            keyboardType="numeric"
                            placeholder="Código"
                            value={codigo}
                            onChangeText={handleInputChangeCodigo}
                            onBlur={handleInputBlurCodigo}
                            onFocus={handleInputFocusCodigo}
                            />
                            <BtnCode onPress={() => showViewScan()}>
                            <MaterialCommunityIcons 
                            name="barcode" 
                            size={44} 
                            color="black" 
                            />
                            </BtnCode>
                        </ViewCode>

                        <PickerCategoria 
                        navigation={navigation}
                        selectCategoria ={selectedCategoria}                    
                        onvalueChange= {(value) => {
     
                            if(value){
                            
                             setSelectCategoria(value)                 
                            }
                  
                          }}
                        />
    

                 <View style={{width:'100%'}}> 
                    <Text style={isFocusName || isFilledName ? styles.labelStyle2 : styles.labelStyle}>Nome do Produto</Text>
                        <Inputs
                        style={[
                            (isFocusName || isFilledName) && {borderColor: '#32B768'}
                        ]}
                            placeholder="Nome do Produto"
                            value={name}
                            onChangeText={handleInputChangeName}
                            onBlur={handleInputBlurName}
                            onFocus={handleInputFocusName}
                        />
                  </View>

                  <View style={{width:'100%'}}> 
                        <Text style={isFocusDesc || isFilledDesc ? styles.labelStyle2 : styles.labelStyle}>Pequena Descrição da ocorrência</Text>
                        <Inputs
                        style={[
                            (isFocusDesc || isFilledDesc) && {borderColor: '#32B768'}
                        ]}
                            placeholder="Pequena Descrição"
                            value={desc}
                            onChangeText={handleInputChangeDesc}
                            onBlur={handleInputBlurDesc}
                            onFocus={handleInputFocusDesc}
                        />
                  </View>

                  <View style={{width:'100%'}}> 
                        <Text style={isFocusQuantity || isFilledQuantity ? styles.labelStyle2 : styles.labelStyle}>Idade do Animal</Text>
                        <Inputs 
                        style={[
                            (isFocusQuantity || isFilledQuantity) && {borderColor: '#32B768'}
                        ]}
                            placeholder="Quantidade de vacinas "
                            value={quantity}
                            keyboardType="numeric"
                            onChangeText={handleInputChangeQuantity}
                            onBlur={handleInputBlurQuantity}
                            onFocus={handleInputFocusQuantity}
                            />
                  </View>
                    
                  <View style={{width:'100%'}}> 
                        <Text style={isFocusQuantityMin || isFilledQuantityMin ? styles.labelStyle2 : styles.labelStyle}>Vacinas Aplicadas(para alerta)</Text>   
                        <Inputs
                          style={[
                              (isFocusQuantityMin || isFilledQuantityMin) && {borderColor: '#32B768'}
                          ]}
                              placeholder="Quantidade Minima(para alerta-lo)"
                              value={quantitymin}
                              keyboardType="numeric"
                              onChangeText={handleInputChangeQuantitymin}
                              onBlur={handleInputBlurQuantityMin}
                              onFocus={handleInputFocusQuantityMin}
                          />
                  </View>
                    
                  <View style={{width:'100%'}}> 
                        <Text style={isFocusPeso || isFilledPeso ? styles.labelStyle2 : styles.labelStyle}>Peso unidade</Text> 
                        <Inputs
                          style={[
                              (isFocusPeso || isFilledPeso) && {borderColor: '#32B768'}
                          ]}
                              placeholder="peso"
                              keyboardType="numeric"
                              value={peso}
                              onChangeText={handleInputChangePeso}
                              onBlur={handleInputBlurPeso}
                              onFocus={handleInputFocusPeso}
                          />
                  </View>

                  <View style={{width:'100%'}}> 
                        <Text style={isFocusValor || isFilledValor ? styles.labelStyle2 : styles.labelStyle}>Valor da consulta</Text> 
                        <TextInputMask
                          
                          style={[styles.InputStyles,
                              (isFocusValor || isFilledValor) && {borderColor: '#32B768'}
                            ]}
                              
                              value={value}
                              type={'money'}
                              options={{
                                  precision: 2,
                                  separator: ',',
                                  delimiter: '.',
                                  unit: 'R$',
                                  suffixUnit: ''
                              }}
                              onChangeText={handleInputChangeValor}
                              onBlur={handleInputBlurValor}
                              onFocus={handleInputFocusValor}
                          /> 
                  </View>
                            <BtnConfirm text="Confirmar" onPress={() => handleConfirm()}/> 
                </InputArea>
              }
          </Container>
         </TouchableWithout>
        </Main>
         
    )
}

const styles = StyleSheet.create({
    InputStyles:{
       borderBottomWidth: 2,
       
       color: '#52665A',
       borderColor: '#CFCFCF',
       fontSize: 18,
       width: '100%',
       marginTop: 40,
       padding: 10
    },
    container: {
      flex: 1,
      
      alignItems:'center',
      justifyContent: 'center',
      
      
   },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },

    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%', 
    },

    labelStyle : {
      position: 'absolute',
      left: 10,
      top: 60,
      fontSize: 18,
      color: '#7f8f85',
  },
  labelStyle2 : {
      position: 'absolute',
      left: 0,
      top:18, 
      fontSize: 18,
      color: '#7f8f85',
  } 
 });

 