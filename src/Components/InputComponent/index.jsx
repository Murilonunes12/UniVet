import React from 'react';
import { InputArea, Input } from './style';

export default function InputComponent(props) {
 return (
   <InputArea>
     
      <Input 
       placeholder={props.holder}
       placeholderTextColor='#738078'
       value={props.value}
       onChangeText={props.onChangeText}
      
      />
      
   </InputArea>
  );
}