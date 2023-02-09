import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import './index.css'
import Rain from './assets/Rain.gif'
import Sunny from './assets/Sunny.gif'
import Clouds from './assets/Cloudy.gif'
import Snowy from './assets/Snow.gif'
import Drizzle from './assets/Drizzle.gif'

function App() {
  const [data,setData]= useState({})  
  const [location,setLocation]= useState('Baku')  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&&appid=c2aa41acf01b9fff4c4d537a34fd4cfb`
  const weather = {
    'Rain' : Rain,
    'Clear' : Sunny,
    'Clouds' : Clouds,
    'Snow': Snowy,
    'Drizzle': Drizzle,
  };
  const searchLocation =(event)=>{
    if(event.key==='Enter'){
      axios.get(url).then((response)=>{
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }
  useEffect(()=>{
    const defaultLocation =()=>{
        axios.get(url).then((response)=>{
          setData(response.data)
          console.log(response.data)
        })
        setLocation('')
      }
      defaultLocation()
    }
  ,[])
return (
  <>
  {data ?  <div className="app" style={{background:`url("${weather[data?.weather?.[0].main]}") no-repeat center center/cover`,
  filter: 'brightness(.9)',
}}>
<div className="search">
<input type="text" 
value={location}
onChange={event=>setLocation(event.target.value)}
onKeyPress={searchLocation}
placeholder='Enter Location'
/>
</div>
<div className="container">
<div className="top">
  <div className="location">
    <p>{data.name}</p>
  </div>
  <div className="temp">
    {
      data.main ? <h1>{parseInt(data.main.temp)-273}°</h1> : null
    }
  </div>
  <div className="description">
    {
      data.weather ? <p>{data.weather[0].main}</p>: null
    }
  </div>
</div>
<div className="bottom">
  <div className="feels">
    {
      data.main ? <p>{parseInt(data.main.feels_like)-273}°</p> :null
    }
    <p>Feels Like</p>
  </div>
  <div className="humidity">
    {
      data.main ? <p>{data.main.humidity}%</p> : null
    }
    <p>Humidity</p>
  </div>
  <div className="wind">
    {
      data.wind ? <p>{data.wind.speed}MPH</p> : null
    }
    <p>Winds</p>
  </div>
</div>
</div>  
</div> : <></>}
</>
  );
}

export default App;
