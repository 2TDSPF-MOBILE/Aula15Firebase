import { Text, Button,Alert,TextInput,StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {auth} from "../services/firebaseConfig"
import { deleteUser } from "firebase/auth";
import ItemLoja from "../components/itemLoja";
import { useState} from "react"; 
import { addDoc,collection,db } from "../services/firebaseConfig";   

export default function HomeScreen() {
    const[title,setTitle]=useState("");

    const router = useRouter(); //Hook de navegação

    const salvarItem = async()=>{
        try{
            const docRef = await addDoc(collection(db,"items"),{
                nomeProduto:title,
                isChecked:false
            })
            console.log("Produto criado com ID:",docRef.id)
        }catch(e){
            console.log("Error ao salvar:",e)
        }
    }

    const realizarLogoff = async () => {
        await AsyncStorage.removeItem("@user")
        router.replace("/")
    }

    const excluirConta = ()=>{
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza que deseja excluir sua conta?",
            [
                {text:"Cancelar"},
                {
                    text:"Confirmar Exclusão",
                    onPress:async()=>{
                        try{
                            const user = auth.currentUser;
                            if(user){
                                await deleteUser(user);
                                await AsyncStorage.removeItem("@user");
                                Alert.alert("Conta excluída","Sua foi excluída com sucesso");
                                router.replace("/")
                            }
                        }catch(e){
                            console.log("Error ao excluir conta:",e);
                            alert("Não possivel deletar a conta.")
                        }
                    }

                }
            ]
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>Olá, Você está na Tela Inicial</Text>
            <Button
                title="Sair da Conta"
                onPress={realizarLogoff}
            />
            <Button 
                title="Excluir Conta"
                color="#d72c2c"
                onPress={excluirConta}
            />

            <ItemLoja />
            <ItemLoja />
            <ItemLoja />
            <ItemLoja />
            
            
            <TextInput 
                placeholder="Digite o nome do produto"
                style = {styles.input}
                value={title}
                onChangeText={(value)=>setTitle(value)}
                onSubmitEditing={salvarItem}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    input:{
        backgroundColor:"lightgrey",
        padding:10,
        fontSize:15,
        width:"90%",
        alignSelf:"center",
        borderRadius:10,
        marginTop:"auto"
    }
})