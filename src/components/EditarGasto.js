import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';
import BtnRegresar from '../elements/BtnRegresar';
import useObtenerGasto from '../hooks/useObtenerGasto';
import { Header, Titulo } from './../elements/Header';
import BarraTotalGastado from './BarraTotalGastado';
import FormularioGasto from './FormularioGasto';

const EditarGasto = () => {

  const { id } = useParams();
  const [ gasto ] = useObtenerGasto( id );

  return (
    <>
        <Helmet>
            <title>Editar Gasto</title>
        </Helmet>

        <Header>
            <BtnRegresar ruta="/lista" />
                <Titulo>Editar gasto</Titulo>
        </Header>

        <FormularioGasto gasto={ gasto }/>

        <BarraTotalGastado />
    </>
  );
}

export default EditarGasto;
