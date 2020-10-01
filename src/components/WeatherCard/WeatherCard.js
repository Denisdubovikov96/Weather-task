import React from "react";
import { useSelector } from "react-redux";

import classes from "./WeatherCard.module.scss";

export default function WeatherCard() {
  const { loading, error, data } = useSelector((state) => state.weather);

  if (loading) {
    return <div>Загрузка</div>;
  }

  if (data) {
    const { name, main, weather, clouds } = data;
    const imageUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    return (
      <div className={classes.SearchCard}>
        <h3>{name}</h3>
        <img src={imageUrl} alt="" />
        <ul>
          <li>
            Температура:
            <span>{` ${main.temp} *С`}</span>
          </li>
          <li>
            Чувствуеться как:
            <span>{` ${main.feels_like} *С`}</span>
          </li>
          <li>
            Погода:
            <span>{` ${weather[0].description}`}</span>
          </li>
          <li>
            Облачность:
            <span>{` ${clouds.all} %`}</span>
          </li>
        </ul>
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }
}
