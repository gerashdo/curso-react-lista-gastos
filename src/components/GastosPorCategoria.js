import React from 'react';
import { Helmet } from 'react-helmet';
import BtnRegresar from '../elements/BtnRegresar';
import { Header, Titulo } from './../elements/Header';
import BarraTotalGastado from './BarraTotalGastado';



const GastosPorCategoria = () => {
    return (
        <>
            <Helmet>
                <title>Gastos por Categoria</title>
            </Helmet>

            <Header>
                <BtnRegresar ruta="/" />
                    <Titulo>Gastos por categoria</Titulo>
            </Header>
            <BarraTotalGastado />
        </>
    );
}

export default GastosPorCategoria;
