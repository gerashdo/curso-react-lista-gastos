import React, { useContext, useEffect, useState } from 'react';
import { authentication } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from "firebase/auth"; 

const AuthContext = React.createContext();

// hook para acceder al contexto

const useAuth = () => {
    return useContext( AuthContext );
}

const AuthProvider = ({ children }) => {

    const [ usuario, setUsuario ] = useState();
    const [cargando, setCargando] = useState(true);

    useEffect( () => {
        const cancelarSuscripcion = onAuthStateChanged( authentication, ( user ) => {
            setUsuario( user );
            setCargando( false );
        })

        return cancelarSuscripcion;
    }, []);

    return (
        <AuthContext.Provider value={{ usuario: usuario }}>
            { !cargando && children }
        </AuthContext.Provider>
    )
    
}

export { AuthProvider, AuthContext, useAuth };