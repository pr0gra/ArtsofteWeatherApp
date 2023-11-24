import { useState, useEffect } from "react";

import WeatherCard from "./WeatherCard";

interface Props {
  weatherInfo: object;
  setLatitude: any;
  setLongitude: any;
  chosenWeatherCard: any;
  setChosenWeatherCard: any;
}

export function WeatherCards({
  chosenWeatherCard,
  setChosenWeatherCard,
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
        console.log(index, "index")
        return (
          <WeatherCard
            chosenWeatherCard={chosenWeatherCard}
            setChosenWeatherCards={setChosenWeatherCard}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            weatherInfo={weatherInfo}
            index={index}
            key={index}
          />
        );
      })}
    </div>
  );
}
