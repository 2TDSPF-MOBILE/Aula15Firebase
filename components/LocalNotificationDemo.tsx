import { useState } from "react";
import { Alert,Button,View } from "react-native";
import { agendarNotificacaoLocal } from "../services/localNotificationService";

export default function LocalNotificationDemo(){
    const[agendado,setAgendado]=useState(false)

    const testarNotificacao = async ()=>{
        setAgendado(true)
        try{
            await agendarNotificacaoLocal()
            Alert.alert("Notificação agendada")
        }catch(erro){
            console.error("Não foi possível agendar notificação local: ",erro)
            Alert.alert("Notificação não agendada!")
        }
        //Executa tanto no caso de sucesso, como no caso de error
        finally{
            setAgendado(false)
        }
    }
    return(
        <View>
            <Button 
                title={agendado?"Agendando...":"Testar Notificação Local"}
                onPress={testarNotificacao}
                disabled={agendado}
            />
        </View>
    )
}