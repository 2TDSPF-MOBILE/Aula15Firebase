//Contexto responsável pelo gerenciamento do tema(dart/light)
import React,{createContext,useContext,useState} from "react";
import { Appearance } from "react-native";

//Criando o contexto
const ThemeContext = createContext()

// Criando um hook personalizado que será importando nas telas
export function useTheme(){
    return useContext(ThemeContext)
}

//Provider que irá envolver toda a aplicação
export function ThemeProvider({children}){
    //Detectar que o tema está configura no dispositivo
    const colorSheme = Appearance.getColorScheme();

    //Estado para armazenar o tema(light ou dark)
    const[theme,setTheme]=useState(colorSheme||"light")

    //Função para alterar o tema
    const alterarTema = ()=>{
        setTheme((prev)=>(prev==="light"?"dark":"light"));
    }

    //Definição de cores por tema
    const themeColors = {
        light:{
            background:"#ffffff",
            textColor:"#000",
            button:"#007BFF",
            buttonText:"#fff"
        },
        dark:{
            background:"#121212",
            textColor:"#fff",
            button:"#FFA500",
            buttonText:"#000"
        }
    }
    return(
        <ThemeContext.Provider value={{theme,alterarTema,colors:themeColors[theme]}}>
            {children}
        </ThemeContext.Provider>
    )
}
