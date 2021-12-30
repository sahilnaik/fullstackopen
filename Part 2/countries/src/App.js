import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Countries from "./components/countries";

const App=()=>{
  const [countries, setCountries]=useState([]);
  const [search, setSearch]=useState('');
  
  const handleSearch=(event)=>{
    event.preventDefault();
    console.log(event.target.value);
    setSearch(event.target.value)
  }
  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all').then(response=>setCountries(response.data))
    },[])
  
  const filterSearch = useMemo(()=>{
    console.log('entered')
    let searchResult= countries.filter(country=>country.name.common.toLowerCase().includes(search.toLowerCase()));
    let searchResultCapital = searchResult.map(capital=>capital.capital);
    console.log("searchResult",searchResultCapital)
    let obj={searchResult, searchResultCapital}
    return obj
  },[search, countries]
  
  )


  return (
    <div>
      <form>
        search:<input value={search} onChange={handleSearch}></input>
        
      </form>
      <Countries obj={filterSearch} search={search} setSearch={setSearch}></Countries>
      
      
    </div>
  )
}
export default App;
