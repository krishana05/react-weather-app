import { useWeather } from "../contexts/WeatherContext";
import { createDate, createHour } from "../utilities/utilities";

const Hourly = () => {
  const {
    weathers
  } = useWeather();

  return (
    <div className="section-container">
    {weathers?.hourly?.map((hourly, i) => (
      <div key={i} className='grid-item'>
        <div className="grid-item-header">{createDate(hourly?.dt)}</div>
        <div className="grid-item-container">
          <img alt="daily-weather"
            src={`http://openweathermap.org/img/wn/${hourly?.weather?.[0].icon}@2x.png`}
          />
          <span>{createHour(hourly?.dt)}</span>
          <span>{hourly?.weather?.[0]?.description}</span>
        </div>
        <div className="grid-item-footer">
          <div>
            Temp: {Math.round(hourly?.temp)}
            <span>&#8451;</span>
          </div>
        </div>
      </div>
    ))}
    </div>
  );
}
export default Hourly;