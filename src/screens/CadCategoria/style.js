import styled from 'styled-components/native';


export const Container = styled.SafeAreaView `
 flex:1;
 align-items: center;

`;

export const Title = styled.Text `
 font-size: 22px;
 font-weight: bold;
 margin-top: 34px;
`;

export const BtnConfirm = styled.TouchableOpacity `
 width: 60%;
 background-color: #3b2046;
 align-items:center;
 justify-content:center;
 
 
`;

export const TextBtn = styled.Text `
 color:#000;
 text-align: center;
`;

export const ViewForm = styled.View `
 flex:1;
 background-color: #f2f2f2;
 padding:10px;
 align-items: center;
 justify-content:center;
 width: 100%;
 flex-direction: column;
`;


export const BtnDelete = styled.TouchableOpacity `
 width: 60%;
 height: 50px;
 margin-top: 20px;
 flex-direction: row;
 align-items:center;
 justify-content:center;

`;

export const ViewCategories = styled.View `
 
 flex:1;
 width: 100%;

 padding: 16px 24px;
`;

export const Categorie = styled.View `
  width: 100%;
  padding:10px;
  margin-bottom: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #e2e2e2;
  border-radius: 10px;
`;

export const InputCat = styled.TextInput `
  font-size: 20px;
  width: 70%;
`;

export const Row = styled.View `
 flex-direction: row;
 width: 100%;
 
 justify-content: space-between;
`;

export const Icons = styled.View `
 flex-direction: row;
 padding: 8px 16px;
`;

export const BtnEdit = styled.TouchableOpacity `

`;


export const BtnExclude = styled.TouchableOpacity `

`;