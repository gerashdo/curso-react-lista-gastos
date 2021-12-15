import React from 'react';
import { Helmet } from 'react-helmet';
import BtnRegresar from '../elements/BtnRegresar';
import { Header, Titulo } from './../elements/Header';

const ListaGastos = () => {

    return (
        <>
            <Helmet>
                <title>Lista de Gastos</title>
            </Helmet>

            <Header>
                <BtnRegresar ruta="/" />
                    <Titulo>Lista de gastos</Titulo>
            </Header>
        </>
    );
}

export default ListaGastos;
