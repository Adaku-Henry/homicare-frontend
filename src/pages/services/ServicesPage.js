import React,{useState} from "react";



import ServiceList from "../../components/services/ServiceList";
import ServiceSearch from "../../components/services/ServiceSearch";
import ServiceFilter from "../../components/services/ServiceFilter";

import servicesData from "../../services/servicesData";

function ServicesPage(){

const [search,setSearch]=useState("");
const [category,setCategory]=useState("");

const filteredServices=servicesData.filter(service=>{

return(
service.name.toLowerCase().includes(search.toLowerCase()) &&
(category==="" || service.category===category)
)

})

return(

<div>


<div style={{padding:"40px"}}>

<h1>Available Services</h1>

<ServiceSearch search={search} setSearch={setSearch}/>

<ServiceFilter category={category} setCategory={setCategory}/>

<ServiceList services={filteredServices}/>

</div>

</div>

)

}

export default ServicesPage