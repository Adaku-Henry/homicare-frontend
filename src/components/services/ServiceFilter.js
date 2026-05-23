import React from "react";

function ServiceFilter({category,setCategory}){

return(

<select

value={category}

onChange={(e)=>setCategory(e.target.value)}

style={{
padding:"20px",
marginTop:"30px"
}}

>

<option value="">All Categories</option>
<option value="Cleaning">Cleaning</option>
<option value="Laundry">Laundry</option>
<option value="Child Care">Child Care</option>
<option value="Plumbing">Plumbing</option>
<option value="Electrical">Electrical</option>
<option value="Cooking">Cooking</option>

</select>

)

}

export default ServiceFilter