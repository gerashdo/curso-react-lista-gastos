import { db } from './firebaseConfig';
import { collection, addDoc } from "firebase/firestore"; 

const agregarGasto = ({ descripcion, cantidad, categoria, fecha, uidUsuario }) => {
    return addDoc(collection( db, 'gastos'), { 
        descripcion, cantidad, categoria, fecha, uidUsuario
    });
}

export default agregarGasto;