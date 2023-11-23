import { useState, useEffect } from "react";

import WeatherCard from "./WeatherCard";

interface Props {
  weatherInfo: object;
  setLatitude: any;
  setLongitude: any;
}

export function WeatherCards({
  weatherInfo,
  setLatitude,
  setLongitude,
}: Props) {
  const [weatherCards, setWeatherCards] = useState<any>([]);
  useEffect(() => {
    if (weatherInfo === null) {
      return;
    }
    if (weatherCards.length >= 5) {
      setWeatherCards([]);
    }
    setWeatherCards((current: any) => [...current, weatherInfo]);
  }, [weatherInfo]);
  return (
    <div className="mt-10 flex justify-center gap-6">
      {weatherCards.map((weatherInfo: object, index: number) => {
        return (
          <WeatherCard
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            weatherInfo={weatherInfo}
            key={index}
          />
        );
      })}
    </div>
  );
}
