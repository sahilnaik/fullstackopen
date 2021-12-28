import React  from "react";
const Name =({id, name, phone})=>{
    return(
      <li key={id}>{name}: {phone}</li>
    )
  }

export default Name