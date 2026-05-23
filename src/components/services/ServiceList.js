import React from "react";
import ServiceCard from "./ServiceCard";

function ServiceList({services}){

return(

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
gap:"20px",
marginTop:"20px"
}}>

{services.map(service=>(
<ServiceCard key={service.id} service={service}/>
))}

</div>

)

}

export default ServiceList