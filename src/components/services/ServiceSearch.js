import React from "react";

function ServiceSearch({search,setSearch}){

return(

<input

type="text"
placeholder="Search services..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

style={{
padding:"10px",
width:"100%",
marginTop:"20px"
}}

/>

)

}

export default ServiceSearch