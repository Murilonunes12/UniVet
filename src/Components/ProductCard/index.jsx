import React from 'react';
import {ViewProduct,Product,NameProduct,PriceProduct,QuantityProduct} from './style';


export default function ProductCard({data}){

    return(
        <ViewProduct>
            <Product>
                <NameProduct>{data?.descricao}</NameProduct>
                <PriceProduct>Preço: {data?.valor}</PriceProduct>
                <QuantityProduct>Vacinas : {data?.quantidade}</QuantityProduct>
            </Product>
        </ViewProduct>
    )
}