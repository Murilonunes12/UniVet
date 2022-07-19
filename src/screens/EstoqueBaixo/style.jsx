import styled from 'styled-components/native';

export const Container = styled.View`
 flex:1;
 align-items: center;
 background-color: #f2f2f2;
`;

export const ListStyle = styled.View`
 border:1px solid blue;
 background-color: #a5a519;
`;

export const Text = styled.Text`
 color:#000000;
`;

export const ListArea = styled.View`
 flex:1;
 width: 100%;
 padding: 16px 24px;
 background-color: #f2f2f2;
`;

export const ListAreaNull = styled.View`
 flex:1;
 width: 100%;
 padding: 16px 24px;
 justify-content: center;
 align-items: center;
 background-color: #f2f2f2;
`;

export const TextNull = styled.Text`
 font-size: 18px;
 color: #828282;
`;


export const Product = styled.TouchableOpacity`
  width: 100%;
  flex:1;
  
  padding:10px;
  margin-bottom: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #e2e2e2;
  border-radius: 10px;
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

export const Title = styled.Text`
 font-size: 28px;
 font-weight: 700;
`;

export const Header = styled.View`
 width: 100%;
 padding: 16px 24px;
 margin-top: 8%;
 flex-direction: row;
 justify-content: center;
`;

export const ViewIconHeader = styled.View`
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 
`;

export const ViewIcon = styled.TouchableOpacity`
 margin-left: 12px;
`;