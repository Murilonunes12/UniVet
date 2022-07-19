import React from 'react';
import {BtnCadastrar,TextBtn} from './style';


export default function BtnConfirm (props){

    return(
         <BtnCadastrar 
         onPress={props.onPress}
         >
             <TextBtn>
                {props.text}
             </TextBtn>
         </BtnCadastrar>
    )
}