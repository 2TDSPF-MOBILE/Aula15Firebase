import { Text, Button,Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {auth} from "../services/firebaseConfig"
import { deleteUser } from "firebase/auth";

export default function HomeScreen() {
    const router = useRouter();

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
        <SafeAreaView>
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
        </SafeAreaView>
    )
}