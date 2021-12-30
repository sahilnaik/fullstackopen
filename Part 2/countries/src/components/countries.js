import React, { useEffect, useState } from "react";
import Name from "./name"
import axios from "axios";

const Countries=({obj, search, setSearch})=>{
    const [weather, setWeather]= useState('');
   
    const filterSearch=obj.searchResult;
    const cap=obj.searchResultCapital
  
   
    const api_key = process.env.REACT_APP_API_KEY
    useEffect(()=>{
        let keyWord=cap[0]
        if(keyWord===undefined){
          keyWord="Valletta"
        }
       
        
      
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${keyWord}&units=metric&appid=${api_key}`).then(response=>setWeather(response.data))
        
    },[cap, api_key])

   
  
   
    
    if(filterSearch.length>10 && search.length!==0){
      return(
        <div>
          <p>Too many matches, specify another filter</p>
        </div>
      )
    }
    else if(filterSearch.length===1){
      let stuff=filterSearch[0]
      
     
     let img =  `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`
    
      return(
        <div>
        <h1>{stuff.name.common}</h1>
        <p>Capital: {stuff.capital}</p>
        <p>Population: {stuff.population}</p>
        <h2>Spoken Languages</h2>
        
        <ul>
    {Object.entries(stuff.languages).map(([key,value]) => <li key={key}>{value}</li>)}
        </ul>
        <img src={stuff.flags.png} alt={stuff.name.common}></img>
        <h2>Weather in {cap}</h2>
        <p>Temperature: {weather.main.temp}°C</p>
        <p>Wind: {weather.wind.speed} mph {weather.wind.direction}</p>
        
        <img src={img} alt="weather icon"></img>
       </div>
      )
    }
    else if(search.length!==0 && filterSearch.length<11){
    return(
      <div>
    {filterSearch.map((country,i)=><div key={i} ><Name name={country.name.common}/><button onClick={()=>{console.log("clicked")
    setSearch(country.name.common)}}>show</button></div>)}
    </div>
    )
    }
    return(
        <div>
      {filterSearch.map((country,i)=><Name key={i} name={country.name.common}/>)}
      
      </div>
      )
  }

  export default Countries