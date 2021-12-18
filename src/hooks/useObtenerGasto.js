import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { db } from "../firebase/firebaseConfig";

const useObtenerGasto = ( id ) => {

    const [gasto, setGasto] = useState('');
    const navigation = useNavigate();

    useEffect( () => {

        const obtenrGasto = async () => {
            const documento = await getDoc( doc( db, 'gastos', id ) );
            if( documento.exists() ) {
                setGasto( documento );
            } else {
                navigation('/');
            }
        }

        obtenrGasto();

    }, [ id, navigation ]);

    return [ gasto ];

}

export default useObtenerGasto;