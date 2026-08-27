import{addDoc,collection,doc,setDoc} from "firebase/firestore"

//Estrutura basica para operaçoes vinculadas ao usuario
type UsuarioBase = {
    uid: string;
    email:string
}

export async function criarPerfilUsuario(params:UsuarioBase & {nome?:string}) {
    const{uid,email,nome}=params;

    
}