import React, { useState } from "react";
import './App.css';
import axios from "axios";

function Weather(){
  let [city, setCity] = useState("");
  let [info, setInfo] = useState(false);
  let [weather, setWeather] = useState({});

  function showData(response) {
    setInfo(true);
    setWeather({
      temperature: Math.round(response.data.main.temp),
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
    console.log(response.data);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const apiKey = "170ed67c56f7d3751961a6f26123ed61";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showData);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  if (info) {
    return (
      <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter a city"
              onChange={updateCity}
            />
            <input type="submit" value="Search" />
          </form>
          <ul>
            <li><strong>Temperature</strong>: {weather.temperature}ºC</li>
            <li><strong>Humidity</strong>: {weather.humidity}%</li>
            <li><strong>Wind</strong>: {weather.wind}km/h</li>
            <li>
              <img src={weather.icon} alt="Weather icon" />
            </li>
          </ul>
      </div>
    );
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter a city" onChange={updateCity} />
        <input type="submit" value="Search" />
      </form>
    );
  }
}

export default Weather;