const Weather = ({ weather }) => {
  if(Object.keys(weather).length){
  return (
    <div>
      <p>temperature {weather.current.temp_c}°C</p>
      <img src={weather.current.condition.icon} />
      <p>wind {weather.current.wind_mph} m/h</p>
    </div>
  )
  }
  return(
    <div></div>
  )
}

export default Weather
