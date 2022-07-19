import React,{ useState, useEffect, useRef } from 'react';
import {
    BtnDelete, 
    Container,
    TextBtn,
    Title, 
    ViewForm,
    ViewCategories,
    Categorie,
    InputCat,
    Row,
    Icons,
    BtnEdit,
    BtnExclude
} from './style';
import InputComponent from '../../Components/InputComponent';
import BtnConfirm from '../../Components/BtnConfirm';
import {Alert , FlatList, KeyboardAvoidingView}  from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import Categoria from '../../services/Sqlite/Categoria';

//modal
import { Modalize } from 'react-native-modalize';


export default function CadCategoria(){

    const [categoria, setCategoria] = useState("");
    const [data, setData] = useState([]);
    const [updateCat, setUpdateCat] = useState("");

    const modalizeRef = useRef(null);

    const navigation = useNavigation();

    useEffect(() => {
        getAllCategories();

    }, [])

    async function handleCategoria(){
         
      
         if(categoria == ""){
             
            Alert.alert("Campo vazio", "Preencha o campo para cadastrar");

         }else{
            //console.log(categoria);
            const randomColor = ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
            const fontColor ="#7F7F7F";
            const fontSize = 15;
            
            const response = await Categoria.createCategoria(categoria, randomColor, fontColor, fontSize);

            if(response != 0){
                Alert.alert("Sucesso", "Agora sua nova categoria aparecerá ao cadastrar um novo Animal.");
                navigation.navigate("Cadastro de Animal");
            }else{
                Alert.alert("Erro" , "Erro ao cadastrar uma nova categoria");
            }
         }
       
     }

     function onOpen(){
        modalizeRef.current?.open();
        
     }

    async function handleUpdata(id , name){
        //console.log(id + name +  " para atualizar")
        Alert.alert('Confirmar', `Atualizar categoria?`,[
            {
              text: 'Não ❌',
              type: 'cancel',
            },
            {
              text: 'Sim ✅',
              onPress: async () =>{
                const res = await Categoria.updateCategory(id, name);
                if(res !== 0){
                  Alert.alert('Sucesso  ✅', 'Categoria Atualizada')
                  navigation.navigate('Cadastro de Animal')
                }
              }
            }
          ])
    }

    async function handleDelete(id){
        //console.log(id +  " para deletar")
        Alert.alert('Confirmar', `Deletar categoria?`,[
            {
              text: 'Não ❌',
              type: 'cancel',
            },
            {
              text: 'Sim ✅',
              onPress: async () =>{
                const res = await Categoria.deletebyid(id);
                //console.log("RES " + res)
                if(res !== 0) {
                  Alert.alert('Sucesso  ✅', 'Categoria Excluida')
                  navigation.navigate('Cadastro de Animal')
                }
              }
            }
          ])
       
    } 

    async function getAllCategories(){
        const res = await Categoria.selectAll();
        //console.log(res);
        setData(res);
    }

    // const renderItem = ({item}) => (
       
        
        
       
    // )

    return(
      
        <Container>
             <Title>Nova categoria</Title> 
            
                <ViewForm>  
                         
                        <InputComponent 
                            holder = "ex: (Animais de pequeno porte, Animais de médio porte, etc...)"
                            value={categoria}
                            onChangeText={t => setCategoria(t)}
                        />
                        <BtnConfirm 
                            onPress={() => handleCategoria()}
                            text="Confirmar"
                        />
                        <BtnDelete onPress={onOpen}>
                        <FontAwesome style={{marginRight:20}} name="list-ul" size={24} color="black" />
                            <TextBtn>Categorias Cadastradas</TextBtn>
                        </BtnDelete>
                    </ViewForm> 
           
               
               
                <Modalize
                 ref={modalizeRef}
                 modalHeight={550}
                >  
                <ViewCategories>
                  {data ? data.map((item) => (
                     <Categorie key={item.idCategoria}>           
                     <Row>
                     <InputCat
                     
                     placeholder={item.name}
                     onChangeText={t => setUpdateCat(t)}
                     />
                     <Icons>
                         <BtnEdit onPress={() => handleUpdata(item.idCategoria, updateCat)}>
                            <FontAwesome  name="check" size={24} color="#3cff22" />
                         </BtnEdit>   
                         
                         <BtnExclude onPress={() => handleDelete(item.idCategoria)}>
                           
                            <MaterialCommunityIcons name="delete-forever" size={24} style={{marginLeft:20}} color="#ff4733" />
                         </BtnExclude>      
                      </Icons>
                     </Row>
                 </Categorie>
                  )) 
                  :
                  <TextBtn>Não há categorias</TextBtn>
                }
                </ViewCategories>
                </Modalize>
              
          
        </Container>
    )
}