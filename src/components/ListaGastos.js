import React from 'react';
import { Helmet } from 'react-helmet';
import BtnRegresar from '../elements/BtnRegresar';
import useObtenerGastos from '../hooks/useObtenerGastos';
import { Header, Titulo } from './../elements/Header';
import BarraTotalGastado from './BarraTotalGastado';
import {
    Lista,
    ElementoLista,
    Categoria,
    Descripcion,
    Valor,
    Fecha,
    ContenedorBotones,
    BotonAccion,
    BotonCargarMas,
    ContenedorBotonCentral,
    ContenedorSubtitulo,
    Subtitulo
} from './../elements/ElementosLista';
import IconoCategoria from './../elements/IconoCategoria';
import convertirMoneda from './../funciones/convertirMoneda';
import { ReactComponent as IconoEditar } from './../imagenes/editar.svg';
import { ReactComponent as InconoBorrar } from './../imagenes/borrar.svg';
import { Link } from 'react-router-dom';
import Boton from './../elements/Boton';
import { format, fromUnixTime } from 'date-fns';
import { es } from 'date-fns/locale';
import borrarGasto from '../firebase/boorarGasto';


const ListaGastos = () => {
    
    const [ gastos, obtenerMasGastos, hayMas ] = useObtenerGastos();

    const formatearFecha = ( fecha ) => {
        return format( fromUnixTime( fecha ), "dd 'de' MMMM 'de' yyyy", { locale: es } );
    }

    const fechaEsIgual = ( gastos, index, gasto ) => {
        if(index !== 0) {
            const fechaActual = formatearFecha(gasto.fecha);
            const fechaAnterior = formatearFecha(gastos[ index - 1 ].fecha);

            if ( fechaActual === fechaAnterior ) {
                return true;
            }
            return false;
        }

    }

    return (

        <>
            <Helmet>
                <title>Lista de Gastos</title>
            </Helmet>

            <Header>
                <BtnRegresar ruta="/" />
                    <Titulo>Lista de gastos</Titulo>
            </Header>

            <Lista>
                { gastos.map( (gasto, index) => {
                    return (
                        <div key={ gasto.id }>
                            { !fechaEsIgual( gastos, index, gasto )
                                && <Fecha>{ formatearFecha(gasto.fecha) }</Fecha>
                            }
                            <ElementoLista>
                                <Categoria>
                                    <IconoCategoria id={ gasto.categoria }/>
                                    { gasto.categoria }
                                </Categoria>
                                <Descripcion>
                                    { gasto.descripcion }
                                </Descripcion>
                                <Valor>
                                    { convertirMoneda( gasto.cantidad ) }
                                </Valor>
                                <ContenedorBotones>
                                    <BotonAccion as={ Link } to={ `/editar/${ gasto.id }` }> 
                                        <IconoEditar /> 
                                    </BotonAccion>
                                    <BotonAccion> 
                                        <InconoBorrar onClick={ () => borrarGasto( gasto.id ) }/> 
                                    </BotonAccion>
                                </ContenedorBotones>
                            </ElementoLista>
                        </div>
                    );
                })}

                { hayMas &&
                    <ContenedorBotonCentral>
                        <BotonCargarMas onClick={ () => obtenerMasGastos() }> Cargar más </BotonCargarMas>
                    </ContenedorBotonCentral>
                }

                { gastos.length === 0 && 
                   <ContenedorSubtitulo>
                       <Subtitulo> No hay gastos por mostrar </Subtitulo>
                       <Boton as={ Link } to='/'>Agregar gasto</Boton>
                   </ContenedorSubtitulo> 
                }
            </Lista>

            <BarraTotalGastado />
        </>
    );
}

export default ListaGastos;
