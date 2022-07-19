import React, {useState} from 'react';
import {
    Container,
    TextLabel,
    TextInputField,

} from './style';

import {StyleSheet, Text, TextInput} from 'react-native';

export default function InputUpdate(props){

     
 const [isFocus, setIsFocus] = useState(false);

 const handleFocus = () =>{
    setIsFocus(true)
 }
 const handleBlur = () => {
     setIsFocus(false);
 } 

    return(
     <Container>
         <Text style={[ isFocus ? styles.labelStyle2 : styles.labelStyle]}>
             {props.label}
         </Text>

         <TextInput
         onBlur={handleBlur}
         onFocus={handleFocus}
         style={{ height: 26, fontSize: 20, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555' }}>
            
         </TextInput>
     </Container>
    )
}

const styles = StyleSheet.create({
    labelStyle : {
        position: 'absolute',
        left: 0,
        top: 0,
        fontSize: 14,
        color: '#000',
    },
    labelStyle2 : {
        position: 'absolute',
        left: 0,
        top:-18, 
        fontSize:20,
        color: '#aaa' 
    }
})