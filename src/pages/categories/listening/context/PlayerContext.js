import React,{createContext,useState} from "react"

export const PlayerContext=createContext()

export const PlayerProvider=({children})=>{

const[currentAudio,setCurrentAudio]=useState(null)
const[isPlaying,setIsPlaying]=useState(false)

const playAudio=(audio)=>{
setCurrentAudio(audio)
setIsPlaying(true)
}

const pauseAudio=()=>{
setIsPlaying(false)
}

return(

<PlayerContext.Provider value={{
currentAudio,
isPlaying,
playAudio,
pauseAudio
}}>

{children}

</PlayerContext.Provider>

)

}