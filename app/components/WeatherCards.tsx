import { useState, useEffect } from "react";

import WeatherCard from "./WeatherCard";

export function WeatherCards({ weatherInfo, setLatitude, setLongitude }) {
  const [weatherCards, setWeatherCards] = useState([]);
  useEffect(() => {
    if (weatherInfo === null) {
      return;
    }
    if (weatherCards.length >= 5) {
      setWeatherCards([]);
    }
    setWeatherCards((current) => [...current, weatherInfo]);
  }, [weatherInfo]);
  return (
    <div className="mt-10 flex justify-center gap-6">
      {weatherCards.map((weatherInfo, index) => {
        return (
          <WeatherCard
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            weatherInfo={weatherInfo}
            index={index}
          />
        );
      })}
    </div>
  );
}
