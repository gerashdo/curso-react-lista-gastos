import React, { useEffect, useState } from 'react';
import Boton from '../elements/Boton';
import agregarGasto from '../firebase/agregarGasto';
import { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton } from './../elements/ElementosFormulario';
import { ReactComponent as IconoPlus } from './../imagenes/plus.svg'
import DatePicker from './DatePicker';
import SelectCategorias from './SelectCategorias';
import getUnixTime from 'date-fns/getUnixTime';
import fromUnixTime from 'date-fns/fromUnixTime';
import { useAuth } from '../contexts/AuthContext';
import Alerta from './../elements/Alerta';
import { useNavigate } from 'react-router';
import editarGasto from '../firebase/editarGasto';

const FormularioGasto = ({ gasto }) => {

    const [inputDescripcion, setInputDescripcion] = useState('');
    const [inputCantidad, setInputCantidad] = useState('');
    const [categoria, setCategoria] = useState('hogar');
    const [fecha, setFecha] = useState(new Date());
    const [estadoAlerta, setEstadoAlerta] = useState(false);
    const [alerta, setAlerta] = useState({});
    const { usuario } = useAuth();
    const navigation = useNavigate();

    useEffect( () => {

        if( gasto ) {
            if( gasto.data().uidUsuario === usuario.uid ) {
                setCategoria( gasto.data().categoria );
                setInputCantidad( gasto.data().cantidad );
                setFecha( fromUnixTime(gasto.data().fecha) );
                setInputDescripcion( gasto.data().descripcion );
            } else {
                navigation('/lista');
            }

        }

    }, [ gasto, usuario, navigation ]);

    const handleChange = ( e ) => {
        if ( e.target.name === 'descripcion' ) {
            setInputDescripcion( e.target.value );
        } else if ( e.target.name === 'cantidad' ) {
            setInputCantidad( e.target.value.replace(/[^0-9.]/g, '') );
        }
    }

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        let cantidad = parseFloat(inputCantidad).toFixed(2);
        
        // haya descripcion y valor
        if ( inputDescripcion.trim().length > 0 && cantidad && cantidad > 0 ) {

            if ( gasto ) {

                editarGasto({ 
                    id: gasto.id,
                    descripcion: inputDescripcion,
                    cantidad: cantidad,
                    categoria: categoria,
                    fecha: getUnixTime(fecha)
                }).then( () => {

                    navigation('/lista');

                }).catch( ( error ) => {

                    setEstadoAlerta(true);
                    setAlerta({
                        mensaje: 'Ocurrió un error al editar el gasto',
                        tipo: 'error'
                    });

                });

            } else {

                try {
                    
                    await agregarGasto({
                        uidUsuario: usuario.uid,
                        descripcion: inputDescripcion,
                        cantidad: cantidad,
                        categoria: categoria,
                        fecha: getUnixTime(fecha)
                    });
    
                    setInputDescripcion('');
                    setInputCantidad('');
                    setCategoria('hogar');
                    setFecha(new Date());
    
                    setEstadoAlerta(true);
                    setAlerta({
                        mensaje: 'Gasto agregado correctamente',
                        tipo: 'exito'
                    });
    
                } catch (error) {
    
                    setEstadoAlerta(true);
                    setAlerta({
                        mensaje: 'Ocurrió un error al agregar el gasto',
                        tipo: 'error'
                    });
    
                }

            }

        } else {

            setEstadoAlerta(true);
            setAlerta({
                mensaje: 'Algunos datos no son correctos',
                tipo: 'error'
            });

        }

    }

    return (
        <Formulario onSubmit={ handleSubmit }>
            <ContenedorFiltros>
                <SelectCategorias categoria={ categoria } setCategoria={ setCategoria }/>
                <DatePicker fecha={ fecha } setFecha={ setFecha }/>
            </ContenedorFiltros>
            <div>
                <Input 
                    type="text"
                    name="descripcion"
                    id="descripcion"
                    placeholder="Descripción"
                    value={ inputDescripcion }
                    onChange={ handleChange }
                />
                <InputGrande 
                    type="text"
                    name="cantidad"
                    id="cantidad"
                    placeholder="$0.00"
                    value={ inputCantidad }
                    onChange={ handleChange }
                />
            </div>
            <ContenedorBoton>
                <Boton as="button" primario conIcono type="submit">
                    { gasto ? 'Guardar' : 'Agregar gasto' }<IconoPlus />
                </Boton>
            </ContenedorBoton>
            <Alerta 
                tipo={ alerta.tipo }
                mensaje={ alerta.mensaje }
                estadoAlerta={ estadoAlerta }
                setEstadoAlerta={ setEstadoAlerta }
            />
        </Formulario>
    );
}

export default FormularioGasto;
