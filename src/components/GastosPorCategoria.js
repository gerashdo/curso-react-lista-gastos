import React from 'react';
import { Helmet } from 'react-helmet';
import BtnRegresar from '../elements/BtnRegresar';
import useObtenerGastosMesPorCategoria from '../hooks/useObtenerGastosMesPorCategoria';
import { Header, Titulo } from './../elements/Header';
import BarraTotalGastado from './BarraTotalGastado';
import { ListaDeCategorias,  ElementoListaCategorias, Categoria, Valor } from './../elements/ElementosLista';
import IconoCategoria from '../elements/IconoCategoria';
import formatearCantidad from './../funciones/convertirMoneda';


const GastosPorCategoria = () => {

    const [ gastosPorCategoria ] = useObtenerGastosMesPorCategoria();

    return (
        <>
            <Helmet>
                <title>Gastos por Categoria</title>
            </Helmet>

            <Header>
                <BtnRegresar ruta="/" />
                    <Titulo>Gastos por categoria</Titulo>
            </Header>

            <ListaDeCategorias>
                {
                    gastosPorCategoria.map( ( elemento, index ) => {
                        return (
                            <ElementoListaCategorias key={ index }>
                                <Categoria> 
                                    <IconoCategoria id={elemento.categoria}/> 
                                    { elemento.categoria }
                                </Categoria>
                                <Valor>{ formatearCantidad( elemento.cantidad ) }</Valor>
                            </ElementoListaCategorias>
                        )
                    })
                }
            </ListaDeCategorias>
            <BarraTotalGastado />
        </>
    );
}

export default GastosPorCategoria;
