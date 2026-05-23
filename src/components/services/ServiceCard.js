import React from "react";
import { Link } from "react-router-dom";

function ServiceCard({service}){

return(

<div style={{
background:"white",
padding:"10px",
borderRadius:"12px",
boxShadow:"0 3px 7px rgba(0,0,0,0.1)"
}}>

<h3>{service.name}</h3>

<p>{service.description}</p>

<p><strong>{service.price}</strong></p>

<Link to={`/services/${service.id}`}>

<button style={{
background:"#f97316",
color:"white",
border:"none",
padding:"10px"
}}>
View Details
</button>

</Link>

</div>

)

}

export default ServiceCard