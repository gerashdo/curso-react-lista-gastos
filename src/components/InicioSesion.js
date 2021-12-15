import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Boton from '../elements/Boton';
import { ContenedorBoton, Formulario, Input } from '../elements/ElementosFormulario';
import { ContenedorHeader, Header, Titulo } from '../elements/Header';
import { ReactComponent as SvgLogin } from './../imagenes/login.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { authentication } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Alerta from '../elements/Alerta';

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 12.5rem; /* 100px */
    margin-bottom: 1.25rem; /* 20px */
`;

const InicioSesion = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ estadoAlerta, setEstadoAlerta ] = useState(false);
    const [ alerta, setAlerta ] = useState({});
    const navigate = useNavigate();

    const handleChange = ( e ) => {
        if( e.target.name === 'email') {
            setEmail( e.target.value );
        } else if( e.target.name === 'password' ) {
            setPassword( e.target.value );
        }
    }

    const handleSubmit = async( e ) => {
        e.preventDefault();
        setEstadoAlerta(false);
        setAlerta({});

        // Validar del lado del cliente
        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        
        if ( email === '' || password === '' ) {
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

        // Iniciar sesion

        try {

            await signInWithEmailAndPassword( authentication, email, password );
            navigate('/');
            
        } catch (error) {

            setEstadoAlerta( true );

            let mensaje; 
            switch ( error.code ) {
                case 'auth/user-not-found':
                    mensaje = 'No existe ningún registro de usuario con estos datos'
                    break;
                case 'auth/wrong-password':
                    mensaje = 'La contraseña no corresponde a esta cuenta'
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
                <title>Iniciar Sesión</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Iniciar sesión</Titulo>
                    <div>
                        <Boton to="/crear-cuenta">Registrarme</Boton>
                    </div>
                </ContenedorHeader>
            </Header>

            <Formulario onSubmit={ handleSubmit }>
                <Svg />
                <Input 
                    type="email"
                    name="email"
                    placeholder="Correo"
                    value={ email }
                    onChange={ handleChange }
                />
                <Input 
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={ password }
                    onChange={ handleChange }
                />
                <ContenedorBoton>
                    <Boton as="button" type="submit" primario>Iniciar sesión</Boton>
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

export default InicioSesion;
