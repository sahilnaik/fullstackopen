import React  from "react";
const Name =({id, name, phone, deleteName})=>{
    return(
      <div>
      <li key={id}>{name}: {phone}</li>
      <button onClick={deleteName}>Delete</button>
      </div>
    )
  }

export default Name