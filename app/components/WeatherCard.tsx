import raining from "../assets/icons/raining.png";
import sun from "../assets/icons/sun.png";
import snow from "../assets/icons/snow.png";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  weatherInfo: any;
  key: number;
  setLatitude: any;
  setLongitude: any;
}

export default function WeatherCard({
  weatherInfo,
  key,
  setLatitude,
  setLongitude,
}: Props) {
  function getIsRainToday() {
    return (
      !!weatherInfo?.hourly.rain.reduce((a: number, b: number) => a + b, 0) || 0
    );
  }

  function getIsSnowfallToday() {
    return (
      !!weatherInfo?.hourly.snowfall.reduce(
        (a: number, b: number) => a + b,
        0
      ) || 0
    );
  }
  const [isRainyToday, setIsRainyToday] = useState<boolean>(false);
  const [isSnowfallToday, setIsSnowFallToday] = useState(false);
  useEffect(() => {
    if (weatherInfo === null) {
      return;
    }
    setIsSnowFallToday((prev) => !!getIsSnowfallToday());
    setIsRainyToday((prev) => !!getIsRainToday());
  }, [weatherInfo]);

  return (
    <div
      className=" bg-sky-100 shadow-lg cursor-pointer rounded-xl w-64 border-2"
      key={key}
      onClick={() => {
        setLatitude(weatherInfo?.latitude);
        setLongitude(weatherInfo?.longitude);
      }}
    >
      <div className="rounded-b-3xl rounded-t-xl p-6 bg-white">
        <Image
          src={isRainyToday ? raining : isSnowfallToday ? snow : sun}
          alt="Погода"
        />
      </div>
      <div className="p-6">
        <p>Время: {weatherInfo?.current?.time}</p>
        <p>Температура: {weatherInfo?.current?.temperature_2m}°C</p>
        <p>Скорость ветра: {weatherInfo?.current?.wind_speed_10m}km/h</p>
      </div>
    </div>
  );
}
