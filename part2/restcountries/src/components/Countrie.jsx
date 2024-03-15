import { useEffect, useState } from "react"
import axios from "axios"
import Weather from './Weather'

const Countrie = ({countrie}) => {
  const languages = Object.values(countrie.languages)
  const [weather,setWeather]=useState({})
  const keyApi = import.meta.env.VITE_KEY_API
  const query= countrie.name.common
  useEffect(()=>{
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${keyApi}&q=${query}`)
    .then(response=>{
      setWeather(response.data)
    })
  },[countrie])
  return (
    <div>
      <h2>{countrie.name.common}</h2>
      <p>capital {countrie.capital}</p>
      <p>area {countrie.area}</p>
      <h3>languages:</h3>
      <ul>
        {languages.map(lenguage =>
          <li key={lenguage}>{lenguage}</li>
        )}
      </ul>
      <img src={countrie.flags.png} />
      <h2>Weather in {countrie.name.common}</h2>
      <Weather weather={weather}/>
    </div>
  )
}

export default Countrie
