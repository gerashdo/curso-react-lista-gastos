import React, { useContext, useEffect, useState } from 'react';
import useObtenerGastosMes from '../hooks/useObtenerGastosMes';

const TotalGastadoContext = React.createContext();

const useTotalDelMes = () => useContext(TotalGastadoContext);

const TotalGastadoProvider = ({ children }) => {

    const [total, setTotal] = useState( 0 );
    const gastos = useObtenerGastosMes();

    useEffect( () =>{

        let acumulado = 0;
        gastos.forEach( gasto => {
            acumulado += Number(gasto.cantidad);
        });

        setTotal( acumulado );

    }, [ gastos ]);

    return (
        <TotalGastadoContext.Provider value={{ total: total }}>
            { children }
        </TotalGastadoContext.Provider>
    );

}

export { useTotalDelMes, TotalGastadoProvider };