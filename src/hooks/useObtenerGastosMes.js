import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { startOfMonth, endOfMonth, getUnixTime } from 'date-fns';
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { useAuth } from '../contexts/AuthContext';

const useObtenerGastosMes = () => {
	const [gastos, establecerGastos] = useState([]);
	const {usuario} = useAuth();

	useEffect( () => {
		const inicioDeMes = getUnixTime( startOfMonth(new Date()) );
		const finDeMes = getUnixTime( endOfMonth(new Date()) );

		if( usuario ){
			const q = query(
				collection( db, 'gastos' ),
				orderBy( 'fecha', 'desc' ),
				where( 'fecha', '>=', inicioDeMes ),
				where( 'fecha', '<=', finDeMes ),
				where( 'uidUsuario', '==', usuario.uid )
			);
			
			const unsuscribe = onSnapshot( q, ( snapshot ) => {
				establecerGastos( snapshot.docs.map( ( documento ) => {
					return { ...documento.data(), id: documento.id };
				}));
			});

			// Use Effect tiene que retornar una funcion que se va a ejecutar cuando se desmonte el componente.
			// En este caso queremos que ejecute el unsuscribe a la coleccion de firestore.
			return unsuscribe;
		}
	}, [usuario]);

	return gastos;
}
 
export default useObtenerGastosMes;