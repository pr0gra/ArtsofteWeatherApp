"use client";
import ky from "ky";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { WeatherCards } from "./components/WeatherCards";
import WeatherMap from "./components/WeatherMap";

export default function Home() {
  async function getWeatherInfo() {
    const json: any = await ky
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${values.latitude}&longitude=${values.longitude}&current=temperature_2m,wind_speed_10m&hourly=rain,snowfall`
      )
      .json();
    setWeatherInfo(() => json);
  }
  const basicSchema = yup.object().shape({
    latitude: yup
      .number()
      .typeError("Должно быть число")
      .min(-90, "Должен быть больше 90")
      .max(90, "Должен быть меньше 90"),
    longitude: yup
      .number()
      .typeError("Должно быть число")
      .min(-180, "Должен быть больше 180")
      .max(180, "Должен быть меньше 180"),
  });
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      latitude: "",
      longitude: "",
    },
    onSubmit: (values) => {
      getWeatherInfo();
    },
    validationSchema: basicSchema,
  });

  const [weatherInfo, setWeatherInfo] = useState<any>({});
  console.log(latitude, longitude);

  return (
    <>
      <header className="bg-cyan-900 flex h-32 justify-between px-20  text-white items-center">
        <h1 className="flex items-center text-5xl">
          <span className="text-cyan-400">Weather</span>App
        </h1>
        <form onSubmit={handleSubmit} className="flex gap-20">
          <div className="flex items-center">
            <p className="text-xl mr-5">Широта</p>
            <div className="flex flex-col pt-2 w-36">
              <input
                className="text-black"
                type="text"
                id="latitude"
                placeholder="Введите широту"
                onChange={handleChange}
              />
              <div className="h-2">
                {errors.latitude && <p>{errors.latitude}</p>}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-xl mr-5">Долгота</p>
            <div className="flex flex-col pt-2 w-36">
              <input
                className="text-black"
                type="text"
                id="longitude"
                placeholder="Введите долготу"
                onChange={handleChange}
              />
              <div className="h-2">
                {errors.longitude && <p>{errors.longitude}</p>}
              </div>{" "}
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 py-px bg-cyan-500 flex items-center"
          >
            Показать погоду
          </button>
        </form>
      </header>
      <main className="px-20">
        <WeatherCards
          weatherInfo={
            Object.entries(weatherInfo).length === 0 ? null : weatherInfo
          }
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />

        <div className="flex justify-center mt-10">
          {Object.entries(weatherInfo).length !== 0 && (
            <WeatherMap latitude={latitude} longitude={longitude} />
          )}
        </div>
      </main>
    </>
  );
}
