import React, { useEffect, useState } from 'react';
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { weaterApi, weatherSelecter } from './reducer/weatherToolkit';
import { CiSearch } from "react-icons/ci";
// image import 
import clear from './img/clear.png';
import clouds from './img/clouds.png'
import rain from './img/rain.png'
import mist from './img/mist.png';
import snow from './img/snow.png';

import himidity from './img/humidity.png';
import wind from './img/wind.png'
const App = () => {
  const [city, setCity] = useState('delhi')
  const [empty, setEmpty] = useState(false);
  const [notMatchCity, setNotMatchCity] = useState(false)
  const dispatch = useDispatch();
  const { data, error } = useSelector(weatherSelecter);
  useEffect(() => {
    dispatch(weaterApi(city))
    setCity('')
  }, [])

  const handleSearch = (e) => {
    if (city.trim() !== '') {
      dispatch(weaterApi(city));
      setCity('');
      setEmpty(false)
      setNotMatchCity(false)
    }
     else {
      setEmpty(true)
    }
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  // finding the degree.
  const deg = 348;
  let dir = ''
  if ((deg > 315 && deg <= 360) || (0 >= deg && deg < 45)) {
    dir = 'North'
  } else if (deg >= 45 && deg <= 135) {
    dir = 'East'
  }
  else if (deg < 135 && deg >= 225) {
    dir = 'South'
  } else {
    dir = 'West'
  }


  return (
    <div className="card">
      {/* -------search input----- */}
      <div className="search">
        <input type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          spellCheck="false"
          required />
        <button onClick={(e) => handleSearch(e)} >
          <CiSearch />
        </button>
      </div>
      <div className="error">
        <p >{empty ? "Please enter a city name" : null}</p>
      </div>
      {/* handling error */}
      {!data ? <div>
        <p className='error'>search with city name</p>
      </div> : <>
        {/* current day weather show */}
        <div className="weather">
          <div className="heading">
            <div className="heading-image">
              <img src={data?.list[0].weather[0].main === 'Clouds' ? clouds : clear} alt="" className="weather-icon" />
              <h2 className='discription'>{data?.list[0].weather[0].main} <span className='disc'>({data?.list[0].weather[0].description})</span></h2>
            </div>
            <div className="heading-title">
              <h1 className="temp">{Math.floor(data?.list[0].main.temp)}°C</h1>
              <h2 className="city">{data?.city.name}</h2>
            </div>
          </div>
          <div className="graph"></div>
          <div className="details">
            <div className="col">
              <img src={himidity} alt='himidity' />
              <div>
                <p className="humidity">{data?.list[0].main.humidity}%</p>
                <p className='light'>humidity</p>
              </div>
            </div>
            <div className="col">
              <img src={wind} alt='wind' />
              <div>
                <p className="wind">{data?.list[0].wind.speed} km/h</p>
                <p className='light'>Wind Speed</p>
              </div>
            </div>
            <div className="col">
              <img src='https://cdn-icons-png.flaticon.com/128/1777/1777114.png' alt='wind' />
              <div>
                <p className="wind">{dir}</p>
                <p className='light'>Wind Directon</p>
              </div>
            </div>
            <div className="col">
              <img src='https://cdn-icons-png.flaticon.com/128/11331/11331739.png' alt='wind' />
              <div>
                <p className="wind">{data?.list[0].main.temp_min}°C</p>
                <p className='light'>Min.. Temp..
                </p>
              </div>
            </div>
            <div className="col">
              <img src='https://cdn-icons-png.flaticon.com/128/1684/1684375.png' alt='wind' />
              <div>
                <p className="wind">{data?.list[0].main.temp_max}°C</p>
                <p className='light'>Max.. Temp..
                </p>
              </div>
            </div>
          </div>
          {/* forecase 5 day weather  */}
          <div className="forecase">
            {data?.list?.slice(1).map((d) => (
              <>
                <div className="boxes">
                  <div className="date">
                    {d.dt_txt}
                  </div>
                  <div className="image">
                    <img src={d.weather[0].main === 'Clear'
                      ? clear
                      : d.weather[0].main === 'Rain'
                        ? rain
                        : d.weather[0].main === 'Snow'
                          ? snow
                          : d.weather[0].main === 'Clouds'
                            ? clouds
                            : mist} alt="img" />
                  </div>
                  <div className="second">
                    <div>
                      <p>{d.main.temp}°C</p>
                    </div>
                    <div>
                      <p>{d.weather[0].description}</p>
                    </div>
                  </div>
                  <div className="third">
                    <div>
                      <p>{d.main.humidity}%</p>
                      <p className='light'>humidity</p>
                    </div>
                    <div>
                      <p>{d.wind.speed}km/h</p>
                      <p className='light'>wind speed</p>
                    </div>
                  </div>
                </div>
              </>
            ))}

          </div>
        </div>
      </>}
    </div>

  )
}

export default App
