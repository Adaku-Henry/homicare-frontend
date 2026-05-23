import React,{useContext,useRef,useEffect} from "react"
import "./AudioPlayer.css"
import {PlayerContext} from "../context/PlayerContext"

function AudioPlayer(){

const{currentAudio,isPlaying}=useContext(PlayerContext)

const audioRef=useRef()

useEffect(()=>{

if(isPlaying && audioRef.current){

audioRef.current.play()

}

},[currentAudio,isPlaying])

if(!currentAudio) return null

return(

<div className="audio-player">

<audio ref={audioRef} src={currentAudio} controls/>

</div>

)

}

export default AudioPlayer