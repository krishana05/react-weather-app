import { useWeather } from "../contexts/WeatherContext";
import { createDate, createDay } from "../utilities/utilities";

const Daily = () => {
  const {
    weathers
  } = useWeather();

  return (
    <div className="section-container">
    {weathers?.daily?.map((dayily, i) => (
      <div key={i} className='grid-item'>
        <div className="grid-item-header">{createDate(dayily?.dt)}</div>
        <div className="grid-item-container">
          <img alt="daily-weather"
            src={`http://openweathermap.org/img/wn/${dayily?.weather?.[0].icon}@2x.png`}
          />
          <span>{createDay(dayily?.dt)}</span>
          <span>{dayily?.weather?.[0]?.description}</span>
        </div>
        <div className="grid-item-footer">
          <div>
            Min: {Math.round(dayily?.temp?.min)}
            <span>&#8451;</span>
          </div>
          <div>
            Max: {Math.round(dayily?.temp?.max)}
            <span>&#8451;</span>
          </div>
        </div>
      </div>
    ))}
    </div>
  );
}
export default Daily;