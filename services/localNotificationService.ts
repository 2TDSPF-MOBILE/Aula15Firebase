import * as Notifications from "expo-notifications"
import { Platform } from "react-native"

//Definir com as notificações serão recebidas e exibidas
Notifications.setNotificationHandler({
    handleNotification: async ()=>({
        shouldShowBanner:true,
        shouldShowList:true,
        shouldPlaySound:true,
        shouldSetBadge:false
    })
})

export async function agendarNotificacaoLocal():Promise<string>{
    if(Platform.OS==="android"){
        await Notifications.setNotificationChannelAsync("lembretes",{
            name:"Lembretes",
            importance:Notifications.AndroidImportance.HIGH,
            vibrationPattern:[0,250,250,250],
            lightColor:"#2E7D32"
        })
    }
    //Consulta se o sistema já autorizou as notificações do app
    const{status:permissaoAtual} = await Notifications.getPermissionsAsync()
    let permissaoFinal = permissaoAtual;

    //Mostrar para o usuário de solicitação de permissão
    if(permissaoAtual!=="granted"){
        const resposta = await Notifications.requestPermissionsAsync()
        permissaoFinal = resposta.status
    }
    if(permissaoFinal!=="granted"){
        throw new Error("Permissão para notificações não concedidas")
    }

    //Criando a notificação local
    return Notifications.scheduleNotificationAsync({
        content:{
            title:"Lembrete do dia!",
            body:"Hora de estudar o challenge",
            sound:true
        },
        trigger:{
            type:Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds:5,
            channelId:"lembretes"
        }
    })
}