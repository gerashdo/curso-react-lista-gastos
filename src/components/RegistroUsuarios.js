import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Boton from '../elements/Boton';
import { ContenedorBoton, Formulario, Input } from '../elements/ElementosFormulario';
import { ContenedorHeader, Header, Titulo } from '../elements/Header';
import { ReactComponent as SvgLogin } from './../imagenes/registro.svg';
import styled from 'styled-components';
import { authentication } from './../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Alerta from '../elements/Alerta';

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 6.35rem; /* 100px */
    margin-bottom: 1.25rem; /* 20px */
`;

const RegistroUsuarios = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ password2, setPassword2 ] = useState('');
    const [ estadoAlerta, setEstadoAlerta ] = useState(false);
    const [ alerta, setAlerta ] = useState({});
    const navigate = useNavigate();

    const handleChange = ( e ) => {
        const { name, value } = e.target;
        switch ( name ) {
            case 'email':
                setEmail( value );
                break;
            case 'password':
                setPassword( value );
                break;
            case 'password2':
                setPassword2( value );
                break;
            default:
                break;
        }
    }

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        setEstadoAlerta( false );
        setAlerta({});

        // Validar del lado del cliente
        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        
        if ( email === '' || password === '' || password2 === '' ) {
            setEstadoAlerta( true );
            setAlerta({
                tipo: 'error',
                mensaje: 'Todos los campos son requeridos'
            });
            return;
        }

        if ( !expresionRegular.test( email ) ) {
            setEstadoAlerta( true );
            setAlerta({
                tipo: 'error',
                mensaje: 'Por favor ingresa un correo válido'
            });
            return;
        }


        if ( password !== password2 ) {
            // alert( 'Las contraseñas no coinciden' );
            setEstadoAlerta( true );
            setAlerta({
                tipo: 'error',
                mensaje: 'Las contraseñas no coinciden'
            });
            return;
        }

        // Crear usuario

        try {

            await createUserWithEmailAndPassword( authentication, email, password );
            navigate('/iniciar-sesion');
            
        } catch (error) {

            setEstadoAlerta( true );

            let mensaje; 
            switch ( error.code ) {
                case 'auth/weak-password':
                    mensaje = 'La contraseña debe contener al menos 6 caracteres';
                    break;
                case 'auth/email-already-in-use':
                    mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado.'
                    break;
                case 'auth/invalid-email':
                    mensaje = 'El correo electrónico no es válido.'
                    break;
                default:
                    mensaje = 'Hubo un error al intentar crear la cuenta.'
                break;
            }

            
            setAlerta({
                tipo: 'error',
                mensaje: mensaje
            });
        }
    }

    return (
        <>
            <Helmet>
                <title>Crear Cuenta</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Crear cuenta</Titulo>
                    <div>
                        <Boton to="/iniciar-sesion">Iniciar Sesion</Boton>
                    </div>
                </ContenedorHeader>
            </Header>

            <Formulario onSubmit={ handleSubmit }>
                <Svg />
                <Input 
                    type="email"
                    name="email"
                    placeholder="Correo"
                    value={ email}
                    onChange={ handleChange }
                />
                <Input 
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={ password }
                    onChange={ handleChange }
                />
                <Input 
                    type="password"
                    name="password2"
                    placeholder="Repetir contraseña"
                    value={ password2 }
                    onChange={ handleChange }
                />
                <ContenedorBoton>
                    <Boton as="button" type="submit" primario>Crear cuenta</Boton>
                </ContenedorBoton>
            </Formulario>

            <Alerta 
                tipo={ alerta.tipo }
                mensaje={ alerta.mensaje }
                estadoAlerta={ estadoAlerta }
                setEstadoAlerta={ setEstadoAlerta } 
            />
        </>
    );
}

export default RegistroUsuarios;