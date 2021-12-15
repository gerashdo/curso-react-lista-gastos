import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RutaPrivada = ({ children }) => {

    const { usuario } = useAuth();

    return usuario ?  children : <Navigate to="/iniciar-sesion" /> ;
}

export default RutaPrivada;
