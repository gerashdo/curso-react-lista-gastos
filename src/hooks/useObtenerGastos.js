import { useEffect, useState } from 'react';
import { db } from './../firebase/firebaseConfig';
import { collection, onSnapshot, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { useAuth } from './../contexts/AuthContext';

const useObtenerGastos = () => {

    const [gastos, setGastos] = useState([])
    const [ultimoGasto, setUltimoGasto] = useState(null);
    const [hayMas, setHayMas] = useState(false);
    const { usuario } = useAuth();

    const obtenerMasGastos = () => {
        const q = query(
            collection(db, 'gastos'), 
            where('uidUsuario', "==", usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10),
            startAfter( ultimoGasto )
        );
        
        onSnapshot( q, ( snapshot ) => {
            if ( snapshot.docs.length > 0 ) {
                setUltimoGasto( snapshot.docs[ snapshot.docs.length - 1 ] );

                setGastos(gastos.concat( snapshot.docs.map( ( gasto ) => {
                    return { ...gasto.data(), id: gasto.id }
                })));

                if ( snapshot.docs.length < 10 ) {
                    setHayMas( false );
                }

            } else {
                setHayMas( false );
            }
        }, error => {
            console.error( error );
        });

    }

    useEffect(() => {
        const q = query(
            collection(db, 'gastos'), 
            where('uidUsuario', "==", usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10)
        );

        const unsuscribe = onSnapshot(q, ( snapshot ) => {
            if ( snapshot.docs.length > 0 ) {
                setUltimoGasto( snapshot.docs[ snapshot.docs.length - 1 ] );

                if ( snapshot.docs.length === 10 ) {
                    setHayMas( true );
                }

            } else {
                setHayMas( false );
            }
            
            setGastos( snapshot.docs.map( ( gasto ) => {
                return { ...gasto.data(), id: gasto.id }
            }));
        });

        return unsuscribe;

    }, [ usuario ])

    return [ gastos, obtenerMasGastos, hayMas ];
}
 
export default useObtenerGastos;