import { Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function HomeScreen() {
    const router = useRouter();

    const realizarLogoff = async () => {
        await AsyncStorage.removeItem("@user")
        router.replace("/")
    }

    return (
        <SafeAreaView>
            <Text>Olá, Você está na Tela Inicial</Text>
            <Button
                title="Sair da Conta"
                onPress={realizarLogoff}
            />
        </SafeAreaView>
    )
}