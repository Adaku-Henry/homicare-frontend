import React from "react";
import "./SearchBar.css";

function SearchBar(){

return(

<div className="search-bar">

<input
type="text"
placeholder="Search services, providers..."
/>

<button>Search</button>

</div>

)

}

export default SearchBar;