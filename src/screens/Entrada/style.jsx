import styled from 'styled-components/native';

export const Container = styled.View`
 flex:1;
 background-color: #f2f2f2;
 align-items: center;
 margin-top: 35px;
`;

export const SearchArea = styled.View`

 width: 100%;

 
 flex-direction: column;
 margin-top: 8px;

`;

export const SearchRow = styled.View`
 flex-direction: row;
 width: 100%;
 align-items: flex-start;
 
`;

export const ViewIcon = styled.TouchableOpacity`
 padding:10px;
`;


export const BtnScan = styled.TouchableOpacity`

`;

export const ViewProduct = styled.View`
 
 flex:1;
 width: 100%;
 padding: 16px 24px;
`;

export const Product = styled.TouchableOpacity`
  width: 100%;
  
  padding:10px;
  margin-bottom: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #e2e2e2;
  border-radius: 10px;
`;

export const ProductContentRow = styled.View`
 flex-direction: row;
 align-items: center;
`;

export const BtnIconAlert = styled.TouchableOpacity`
 
`;

export const ProductContentColum = styled.View`
  flex-direction: column;
`;

export const NameProduct = styled.Text`
 font-size: 22px;
 font-weight: 500;
 padding:10px;
`;

export const PriceProduct= styled.Text`
 font-size: 16px;
 color: #3d3d3d;
 padding:10px;
`;

export const QuantityProduct = styled.Text`
 font-size: 16px;
 color: #3d3d3d;
 padding:10px;
`;


export const BtnSearch = styled.TouchableOpacity`
  width: 48%;
  height: 65px;
  
  margin-left: 16px;
  border-radius: 15px;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  
  
`;

export const TxtSearchAll = styled.Text`
  padding: 10px;
  font-size: 14px;
  font-weight: 700;
`;

export const SectionBtns = styled.View`
 width: 80%;
 flex-direction: row;
 justify-content: space-between;
 
`;


export const ViewScan = styled.View`
 flex:1;
 border:1px solid red;
 flex-direction: column;
 justify-content: flex-end;
`;

export const BtnScanAgain = styled.TouchableOpacity`
 
 background-color: #62B1F6;
 padding: 8px 16px;
 margin-top: 10px;
`;

export const TextBtn = styled.Text`
 font-weight: bold;
`;