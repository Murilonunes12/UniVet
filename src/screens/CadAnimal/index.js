import React, {useState, useEffect} from 'react';
import {
    Container,
    InputArea, 
    Inputs,
    Title,
    TouchableWithout,
    ViewCode,
    BtnCode,
    InputCode,
    Main,
    BtnScanAgain,
    TitleMain
    
} from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {TextInputMask} from 'react-native-masked-text';
import {useNavigation} from '@react-navigation/native';

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
    StyleSheet
  } from 'react-native';
import { Alert } from 'react-native';
import { View, Text, Dimensions } from 'react-native';

export default function CadProduto({navigation}){
     
    const [codigo, setCodigo] = useState();
    const [selectedCategoria, setSelectCategoria] = useState();
    const [name, setName] = useState();
    const [quantity, setQuantity] = useState();
    const [quantitymin, setQuantityMin] = useState();
    const [value, setValue] = useState();
    const [desc, setDesc] = useState();
    const [peso, setPeso] = useState();

    const [dataCategoria, setDataCategoria] = useState([]);

     
    const nav = useNavigation();


    //EFEITOS BORDER//
    const [isFocusName, setIsFocusName] = useState(false);
    const [isFocusValor, setIsFocusValor] = useState(false);
    const [isFocusQuantity, setIsFocusQuantity] = useState(false);
    const [isFocuscodigo, setIsFocusCodigo] = useState();
    const [isFocusQuantityMin, setIsFocusQuantityMin] = useState();
    const [isFocusDesc, setIsFocusDesc] = useState();
    const [isFocusPeso, setIsFocusPeso] = useState();

    const [isFilledName, setIsFilledName] = useState(false);
    const [isFilledValor, setIsFilledValor] = useState(false);
    const [isFilledQuantity, setIsFilledQuantity] = useState(false);
    const [isFilledCodigo, setIsFilledCodigo] = useState(false);
    const [isFilledQuantityMin, setIsFilledQuantityMin] = useState(false);
    const [isFilledDesc, setIsFilledDesc] = useState(false);
    const [isFilledPeso, setIsFilledPeso] = useState(false);
    
    
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
         
        //console.log(name, quantity, quantitymin, value, desc, codigo, selectedCategoria, peso)
        if(name && quantity && quantitymin && value && codigo && peso && selectedCategoria != undefined){
          
          if(quantity < 0) return alert("A quantidade não pode ser menor que zero.")
          const pesoReplace = peso.replace(" Kg","");
          const valorReplace = value.replace('R$','');
          const changeVirgula = valorReplace.replace(',', '.')
          const convertValue = parseFloat(changeVirgula);
         
          const response = await CadastroProduto.createProduto({codBar: codigo, nome: name , descricao: desc, peso: pesoReplace, quantidade:quantity, qtMin:quantitymin, valor:convertValue, id_categoria: selectedCategoria });
          //console.log(response);
          
          if(response > 0){
            Alert.alert("Animal Cadastrado ✅", "Cadastro bem sucedido")
            nav.navigate("HomeScreen")
          }else{
            Alert.alert("Algo deu errado ao cadastrar, verfique se não existe caracteres especiais nos campos.")
          }

        }else{
          Alert.alert("Campo vazio","Preencha todos os campos para cadastrar um novo animal.")
        };
  
      }

   


    //SCAN BARCODE//
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [showView ,setShowView] = useState(false);
    
    // useEffect(() => {
    //     checkMultiPermissions();
    //     //scanCodeBtn();
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
       const res = await checkMultiPermissions();
       
       if(res === 'granted'){
        setShowView(true);
       }else{
         await scanCodeBtn();
       }
        
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
                <TitleMain>Novo Animal</TitleMain>
                    <ViewCode
                      
                      style={[
                        (isFocuscodigo || isFilledCodigo) && {borderColor:'#32B768'}
                     ]}
                     >
                        <InputCode
                         keyboardType="numeric"
                        placeholder="Numero da solicitação"
                        value={codigo}
                        
                        
                        onChangeText={handleInputChangeCodigo}
                        onBlur={handleInputBlurCodigo}
                        onFocus={handleInputFocusCodigo}
                        />
                        <BtnCode onPress={() => showViewScan()}>
                         
                        </BtnCode>
                    </ViewCode>

                    <PickerCategoria 
                     navigation={navigation}
                     selectCategoria ={selectedCategoria}
                     onvalueChange= {(value) => {
                       
                       if(value){
                         if(value === 0) return alert('Escolha uma categoria')
                         setSelectCategoria(value);                        
                       }
                       
                     }}
                    />


               <View style={{width:'100%'}}> 
                    <Text style={isFocusName || isFilledName ? styles.labelStyle2 : styles.labelStyle}>Nome do Animal</Text>
                    <Inputs
                    style={[
                        (isFocusName || isFilledName) && {borderColor: '#32B768'}
                     ]}
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
                        
                        value={desc}
                        onChangeText={handleInputChangeDesc}
                        onBlur={handleInputBlurDesc}
                        onFocus={handleInputFocusDesc}
                     />
                   </View>

                  <View style={{width:'100%'}}> 
                    <Text style={isFocusQuantity || isFilledQuantity ? styles.labelStyle2 : styles.labelStyle}>Idade do animal</Text>     
                    <Inputs 
                    style={[
                        (isFocusQuantity || isFilledQuantity) && {borderColor: '#32B768'}
                     ]}
                        
                        value={quantity}
                        keyboardType="numeric"
                        onChangeText={handleInputChangeQuantity}
                        onBlur={handleInputBlurQuantity}
                        onFocus={handleInputFocusQuantity}
                        />
                  </View>
                 
                  <View style={{width:'100%'}}> 
                    <Text style={isFocusQuantityMin || isFilledQuantityMin ? styles.labelStyle2 : styles.labelStyle}>Vacinas Tomadas(para alerta)</Text>   
                    <Inputs
                      style={[
                          (isFocusQuantityMin || isFilledQuantityMin) && {borderColor: '#32B768'}
                      ]}
                          
                          value={quantitymin}
                          keyboardType="numeric"
                          onChangeText={handleInputChangeQuantitymin}
                          onBlur={handleInputBlurQuantityMin}
                          onFocus={handleInputFocusQuantityMin}
                      />
                  </View>
                
                <View style={{width:'100%'}}> 
                    <Text style={isFocusPeso || isFilledPeso ? styles.labelStyle2 : styles.labelStyle}>Peso unidade</Text>   
                    <TextInputMask
                      style={[styles.InputStyles,
                          (isFocusPeso || isFilledPeso) && {borderColor: '#32B768'}
                      ]}  
                       value={peso}
                          type={'money'}
                          options={{
                              precision: 1,
                              separator: '.',
                              delimiter: '.',
                              unit: '',
                              suffixUnit: 'Kg'
                          }}
                          
                          
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
                     

                  <BtnConfirm text="Cadastrar" onPress={() => handleConfirm()}/> 

                      
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
      height: Dimensions.get('window').height,
      width :Dimensions.get('window').width,
      
      
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

 