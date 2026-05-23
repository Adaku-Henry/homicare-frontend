import React from "react";
import services from "../data/services";
import { Link } from "react-router-dom";

function Services(){

return(

<div>

<h1>Services</h1>

{services.map(service=>(
<div key={service.id}>

<h3>{service.name}</h3>

<Link to={`/providers/${service.name}`}>
View Providers
</Link>

</div>
))}

</div>

)

}

export default Services