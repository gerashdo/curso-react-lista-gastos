import React from 'react';
import Boton from './Boton';
import { ReactComponent as IconoCerrarSesion } from './../imagenes/log-out.svg';
import { authentication } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const BotonCerrarSesion = () => {

    const navigation = useNavigate();

    const cerrarSesion = async() => {

        try {
            await signOut( authentication );
            navigation('/iniciar-sesion');
        } catch (error) {
            console.log(error);
        }
        
    }

    return ( 
        <Boton iconoGrande as="button" onClick={ cerrarSesion }>
            <IconoCerrarSesion/>
        </Boton>
     );
}
 
export default BotonCerrarSesion;