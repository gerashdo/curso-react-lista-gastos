import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import WebFont from 'webfontloader'
import Contenedor from './elements/contenedor';
import{ BrowserRouter, Route, Routes } from 'react-router-dom';
import InicioSesion from './components/InicioSesion';
import EditarGasto from './components/EditarGasto';
import ListaGastos from './components/ListaGastos';
import RegistroUsuarios from './components/RegistroUsuarios';
import GastosPorCategoria from './components/GastosPorCategoria';
import { Helmet } from "react-helmet";
import favicon from './imagenes/logo.png';
import Fondo from './elements/fondo';
import { AuthProvider } from './contexts/AuthContext';
import RutaPrivada from './components/RutaPrivada';


WebFont.load({
  google: {
    families: ['Work Sans:400,500,700', 'sans-serif']
  }
});

const Index = () => {
  return (
      <>
      <Helmet>
        <link rel="shorcut icon" href={ favicon } type="image/x-icon"/>
      </Helmet>

      <AuthProvider>
        <BrowserRouter>
          <Contenedor>
            <Routes>
              <Route path='/iniciar-sesion' element={ <InicioSesion /> } />
              <Route path='/crear-cuenta' element={ <RegistroUsuarios /> } />
              <Route 
                path='/categorias' 
                element={
                  <RutaPrivada>
                    <GastosPorCategoria /> 
                  </RutaPrivada> 
                } 
              />
              <Route 
                path='/lista' 
                element={
                  <RutaPrivada>
                    <ListaGastos /> 
                  </RutaPrivada> 
                } 
              />
              <Route 
                path='/editar/:id' 
                element={
                  <RutaPrivada>
                    <EditarGasto /> 
                  </RutaPrivada> 
                } 
              />
              <Route 
                path='/' 
                element={
                  <RutaPrivada>
                    <App /> 
                  </RutaPrivada> 
                } 
              />
            </Routes>
          </Contenedor>
        </BrowserRouter>
      </AuthProvider>

      <Fondo />
    </> 
  );
}

ReactDOM.render( <Index />, document.getElementById('root') );