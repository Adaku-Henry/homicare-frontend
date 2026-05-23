import React from "react";
import ProviderCard from "./ProviderCard";

function ProviderList({providers}){

return(

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
gap:"20px",
marginTop:"20px"
}}>

{providers.map(provider=>(
<ProviderCard key={provider.id} provider={provider}/>
))}

</div>

)

}

export default ProviderList