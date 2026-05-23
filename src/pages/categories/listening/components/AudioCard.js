import React,{useContext} from "react"
import "./AudioCard.css"
import {PlayerContext} from "../context/PlayerContext"

function AudioCard({title,creator,duration,rating,cover,audio}){

const{playAudio}=useContext(PlayerContext)

return(

<div className="audio-card">

<img src={cover} alt={title}/>

<div className="audio-info">

<h4>{title}</h4>

<p>{creator}</p>

<div className="audio-meta">

<span>{duration}</span>
<span>⭐ {rating}</span>

</div>

</div>

<button
className="play-btn"
onClick={()=>playAudio(audio)}
>

▶

</button>

</div>

)

}

export default AudioCard