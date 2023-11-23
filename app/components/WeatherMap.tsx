import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

export default function WeatherMap({ latitude, longitude }) {
  const defaultState = {
    center: [latitude, longitude],
    zoom: 5,
  };
  console.log(defaultState.center);
  return (
    <YMaps>
      <Map defaultState={defaultState}>
        <Placemark geometry={[latitude, longitude]} />
      </Map>
    </YMaps>
  );
}
