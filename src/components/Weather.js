import { useState } from "react";
import Daily from "./Daily";
import { useWeather } from "../contexts/WeatherContext";
import { createDate, createDay } from "../utilities/utilities";
import Hourly from "./Hourly";

function Weather() {
  const {
    selected,
    setSelected,
    weathers,
  } = useWeather();

  const [cityName, setCityName] = useState('');
  const [frequency, setFrequency] = useState('hourly');

  const handleChange = (e) => {
    const newValue = e.target.value;
    setCityName(newValue);
  };
  const getWeather = () => {
    cityName && setSelected(cityName);
    setCityName(''); // clear input field
  }
  const handleFreqSwitch = () => {
    setFrequency(frequency === "daily" ? "hourly" : "daily");
  };
  const dt = weathers?.current?.dt;

  return (
    <>
      <aside>
        <div className='aside'>
          <div className="aside-container">
            <div className="aside-header">
              <input placeholder="Enter city name" onChange={handleChange} type='text' value={cityName} />
              <button onClick={getWeather}>search</button>
            </div>
            <div className="aside-main">
              <h1>{selected}</h1>
              <h2>
                <span>{createDate(dt)}</span>
                <span>{createDay(dt)}</span>
              </h2>
              {weathers?.current?.weather?.[0].icon && (
                <img alt="current-wheather"
                  src={`http://openweathermap.org/img/wn/${weathers?.current?.weather?.[0].icon}@2x.png`}
                />
              )}
              <span className="aside-degree">
                {Math.round(weathers?.current?.temp)}
                <span>&#8451;</span>
              </span>
              <div className="aside-main-item">
                <div className="icon-name">
                  Feels Like
                  <span className="material-symbols-rounded">
                    device_thermostat
                  </span>
                </div>
                <span>
                  {Math.round(weathers?.current?.feels_like)}
                  <span>&#8451;</span>
                </span>
              </div>
              <div className="aside-main-item">
                <div className="icon-name">
                  Day
                  <span className="material-symbols-rounded">light_mode</span>
                </div>
                <span>
                  {Math.round(weathers?.daily?.[0]?.temp?.day)}
                  <span>&#8451;</span>
                </span>
              </div>
              <div className="aside-main-item">
                <div className="icon-name">
                  Night
                  <span className="material-symbols-rounded">bedtime</span>
                </div>
                <span>
                  {Math.round(weathers?.daily?.[0]?.temp?.night)}
                  <span>&#8451;</span>
                </span>
              </div>
              <div className="aside-main-item">
                <div className="icon-name">
                  Humidity
                  <span className="material-symbols-rounded">water</span>
                </div>
                <span>{weathers?.current?.humidity}%</span>
              </div>
              <div className="aside-main-item">
                <div className="icon-name">
                  Wind
                  <span className="material-symbols-rounded">air</span>
                </div>
                <span>{weathers?.current?.wind_speed}</span>
              </div>
            </div>
            <div className="aside-footer">
              <div className="frequency">
                <div>Hourly</div>
                <div>
                  <label className="switch">
                    <input type="checkbox" onChange={handleFreqSwitch} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div>Daily</div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <section>
        {
          frequency === 'daily'? <Daily /> : <Hourly />
        }
        
      </section>
    </>
  );
}

export default Weather;