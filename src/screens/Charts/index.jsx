import React, {useState, useEffect , useRef} from 'react';
import {
    Container ,
    TxtBtn,
    Title,
    ViewScroll,
    MainContainer,
    DivRow,
    BoxRow,
    BoxColumn,
    Column,
    Content,
    TitleContent,
    ValueContent,
    ContentRow,
    TitleContentRow,
    ValueContentRow,
    Row,
    Content2,
    BtnNav
} from './styles';
import { PieChart } from 'react-native-chart-kit';
import Produtos from '../../services/Sqlite/CadastroProduto';
import Categorias from '../../services/Sqlite/Categoria';
import {Dimensions, View , ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//intl conversor para moeda
import Intl from 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export default function Chart(){

    const [containCategory , setContainCategory] = useState(false);

    const [prodCad, setProdCad] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);
    const [sumQuantity, setSumQuantity] = useState(0);
    const [sumValor, setSumValor] = useState(0);
    const [sumPeso, setSumPeso] = useState(0);
    const [data, setData] = useState([]);

    const nav = useNavigation();
    

    useEffect(() => {
        //getProducts();
        getCategorias();    
    },[])

    useEffect(() => {
        allProd();
        getTotalCategories();
        getSumQuantity();
        getSumPeso();
        getSumPreco();
    },[data])
    
    
   
 
  
    //CONSULTAS DB//
    async function getCategorias(){
        const response = await Produtos.selectQuantityPerCategory();
        //console.log(response);
        setData(response);
        if(response.length != 0){
            setContainCategory(true);
        }
    };

    async function allProd() {
        const response = await Produtos.selectCountAllProducts();
        const total = response[0].quantidade;
        setProdCad(total);
     }
 
    async function getTotalCategories(){
         const response = await Categorias.selectCountAllCategories();
         const total = response[0].quantidade;
         setTotalCategories(total);
    }

    async function getSumQuantity(){
        const response = await Produtos.selectSumAllQuantity();
        const total = response[0].total;
        if(total !== null){
            setSumQuantity(total);
        }else{
            setSumQuantity(0);
        }
        
    }

    async function getSumPeso(){
        const response = await Produtos.selectSumAllPeso();
        const total = response[0].totalpeso;
        if(total !== null){
            setSumPeso(total);
        }else{
            setSumPeso(0);
        }
        
    }

    async function getSumPreco(){
        const response = await Produtos.selectSumAllPreco();
        const total = response[0].totalpreco;
        
        if(total !== null){
            const valorFormatado = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)
            setSumValor(valorFormatado);
        }else{
            setSumValor(0);
        }
        
    }

   
    
    const chartConfig = {
        backgroundGradientFrom: "#b2ca13",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 1,    
        color: (opacity = 1) => `rgb(137, 87, 191, ${opacity})`,
        useShadowColorFromDataset: false // optional
    };
      


    const RenderChart = () =>{
           return(
            <PieChart
                data={data}
                width={Dimensions.get('window').width}
                height={300}
                chartConfig={chartConfig}
                accessor={"quantidade"}             
                paddingLeft={"35"}   
                absolute
            />  
           )
    }



    return(
        <>
        <Container>
        
          <Content2>
          <Title>Animais por categoria</Title>
            {
                containCategory ? 
                RenderChart() :
                <ActivityIndicator size="small" color="#0000ff" />
            }
           </Content2>
            <ViewScroll>
                <MainContainer>
                    {/* <TxtBtn style={{marginTop:10}}>Total</TxtBtn> */}
                    <DivRow>
                        <BoxColumn style={{elevation: 2}}>
                         <FontAwesome5 name="box-open" size={34} color="#c6eff3" />
                         <Content>
                             <TitleContent> Aniamais Cadastrados</TitleContent>
                             <ValueContent>{prodCad}</ValueContent>
                         </Content>
                        </BoxColumn>
                       
                       <Column>
                            <BoxRow style={{elevation: 2}}>
                              <ContentRow>
                                  <Row>
                                    <FontAwesome name="th-list" size={24} color="#c6eff3" />
                                    <TitleContentRow>
                                        Categorias Cadastradas
                                    </TitleContentRow> 
                                  </Row>
                              
                                  <ValueContentRow>{totalCategories}</ValueContentRow>
                              </ContentRow>
                            </BoxRow>

                            <BoxRow style={{elevation: 2}}>
                             <ContentRow >
                                  <Row>
                                  <FontAwesome5 name="money-check-alt" size={24} color="#c6eff3" />
                                    <TitleContentRow>
                                       Valor total
                                    </TitleContentRow> 
                                  </Row>
                              
                                  <ValueContentRow>{sumValor}</ValueContentRow>
                              </ContentRow>
                            </BoxRow>
                       </Column> 

                    </DivRow>


                    <DivRow>

                       <Column style={{marginRight:10, marginLeft:0}}>
                            <BoxRow style={{elevation: 2}}>                            
                             <ContentRow>
                                  <Row>
                                  <FontAwesome5 name="database" size={24} color="#c6eff3" />
                                    <TitleContentRow>
                                        Animais cadastrados
                                    </TitleContentRow> 
                                  </Row>
                              
                                  <ValueContentRow>{sumQuantity}</ValueContentRow>
                              </ContentRow>
                            </BoxRow>
                        <BtnNav onPress={ () => nav.navigate('Consulta')}>
                            <BoxRow style={{elevation: 2}}>
                                <ContentRow style={{justifyContent:'center'}}> 
                                
                                    <Row>
                                     <FontAwesome5 name="searchengin" size={34} color="#c6eff3"/>
                                            <ValueContent style={{marginLeft:20}}>
                                                    Consulta
                                            </ValueContent>
                                    </Row>
                               </ContentRow>
                            </BoxRow>
                        </BtnNav>
                       </Column> 

                        <BoxColumn style={{elevation: 2}}>                          
                          <MaterialCommunityIcons name="weight-kilogram" size={44} color="#c6eff3" />
                            <Content>
                                <TitleContent>Peso em estoque</TitleContent>
                                <Row style={{alignItems:'center'}}>
                                 <ValueContent>{sumPeso}</ValueContent><TitleContent> kg</TitleContent>
                                </Row>
                               
                            </Content>
                        </BoxColumn>
                    
                    </DivRow>
                </MainContainer>
            </ViewScroll>
                        
        </Container> 
       </>  
    )
}