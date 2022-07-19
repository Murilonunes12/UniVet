import styled from 'styled-components/native';



export const Keyboarder = styled.KeyboardAvoidingView`
 flex:1;
 width: 100%; 
 
`;

export const Main = styled.View`
 flex:1;
 width: 100%;

`;

export const TitleMain = styled.Text`
 font-size: 22px;
 font-weight: 700;
 padding: 16px 24px;
`;

export const Container = styled.ScrollView`
 flex:1;
 background-color: transparent;

`;

export const Title = styled.Text`
 font-size: 25px;
 font-weight:bold;
 line-height: 40px;
 text-align: center;
 color: #52665A;
`;



export const InputArea = styled.View`
   width: 100%;
   padding: 30px;
   
   justify-content: center;
   align-items: center;
   
`;

export const InputCode = styled.TextInput`
 
 padding: 10px;
 font-size: 18px;
`;

export const Inputs = styled.TextInput`
 border-bottom-width: 2px;

 border-color: #CFCFCF;
 color :#52665A;
 font-size: 18px;
 width: 100%;
 margin-top: 40px;
 padding: 10px;
`;


export const BtnCadastrar = styled.TouchableOpacity`
  height: 56px;
  width: 60%;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  background-color: #32B768;
  margin-top: 42px;
`;

export const TextBtn = styled.Text`
 color: #FFFFFF;
 font-size: 20px;
`;

export const TouchableWithout = styled.TouchableWithoutFeedback`

`;

export const ViewCode = styled.View`

 padding: 10px;
 padding-bottom: -20px;
 flex:1;
 flex-direction: row;
 width: 100%;
 justify-content: space-between;
 border-bottom-width:2px ;
 border-color: #CFCFCF;
 color :#52665A;
 
`;

export const BtnCode = styled.TouchableOpacity`

 
 align-items: center;
 justify-content: center;
`;

export const BtnScanAgain = styled.TouchableOpacity`
 
 background-color: #62B1F6;
 padding: 8px 16px;
 margin-top: 10px;
`;

