import { createContext, useContext, useState, useEffect } from "react";
import { API_KEY, REFRESH_TIME } from "../utilities/constants";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [selected, setSelected] = useState('Singapore');
  const [weathers, setWeathers] = useState({});
  const [latLon, setLatLon] = useState({});

  const values = {
    selected,
    setSelected,
    weathers,
    setWeathers,
  };

  const getWeather = (citylat, citylon) => {
    // get weather
    fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${citylat}&lon=${citylon}&exclude=minutely&units=metric&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
            const slicedData = {
                ...data,
                hourly: data?.hourly?.slice(0, 24), // show only for 24 hours (default 48 hours)
            };
            setWeathers(slicedData);
        });
  }
  useEffect(() => {
    // get the lat and lon from geolocation api
    fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${selected}&limit=1&appid=${API_KEY}
        `
      )
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            setLatLon({
                lat: data[0]?.lat,
                lon: data[0]?.lon,
            });
            getWeather(data[0]?.lat, data[0]?.lon);
        });
  }, [selected]);

  // refreshed every minute
  useEffect(() => {
    const inetrval = setInterval(()=> {
        getWeather(latLon?.lat, latLon?.lon);
    }, REFRESH_TIME);
    return () => {
        clearInterval(inetrval);
    }
  }, [latLon]);

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);