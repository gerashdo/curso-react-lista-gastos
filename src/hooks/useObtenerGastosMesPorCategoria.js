import { useEffect, useState } from 'react';
import useObtenerGastosMes from './useObtenerGastosMes';


const useObtenerGastosMesPorCategoria = () => {

    const [gastosPorCategoria, setGastosPorCategoria] = useState([]);
    const gastosDelMes = useObtenerGastosMes();

    useEffect( () => {

        const sumaDeGastos = gastosDelMes.reduce( ( objetoResultante, objetoActual ) => {
            const categoriaActual = objetoActual.categoria.toLowerCase();
            const cantidadActual = objetoActual.cantidad;
    
            objetoResultante[ categoriaActual ] += Number(cantidadActual);
    
            return objetoResultante;
        }, {
            'comida': 0,
            'cuentas y pagos': 0,
            'hogar': 0,
            'transporte': 0,
            'ropa': 0,
            'salud e higiene': 0,
            'compras': 0,
            'diversion': 0
        });
    
        setGastosPorCategoria( Object.keys( sumaDeGastos ).map( ( categoria ) => {
            return {
                categoria,
                'cantidad': sumaDeGastos[ categoria ]
            }
        }));

    }, [ gastosDelMes ]);


    return [ gastosPorCategoria ]
}

export default useObtenerGastosMesPorCategoria;
