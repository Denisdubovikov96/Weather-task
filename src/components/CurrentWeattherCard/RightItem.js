import React from "react";
import { openWeaterIcon, windDirection } from "../../static/imgUrls";
import { dtToTime } from "../../helperFunctions/helperFunctions";

export default function RightItem({ item, className }) {
  const {
    clouds,
    dt,
    humidity,
    pressure,
    rain,
    sunrise,
    sunset,
    weather,
    wind_deg: itemDeg,
    wind_speed,
    temp,
  } = item;

  return (
    <div key={item.dt} className={className}>
      <h4>{dtToTime(dt)}</h4>
      <img src={openWeaterIcon(weather[0].icon)} alt="" />
      <div>
        <span>{temp.min}</span>
        <span>{temp.max}</span>
      </div>
      <p>
        <span>Облачность</span>
        <span>{` ${clouds} %`}</span>
      </p>
      <p>
        <span>Влажность</span>
        <span>{` ${humidity} %`}</span>
      </p>
      <p>
        <span>Давление</span>
        <span>{`${(pressure / 1.333).toFixed(1)}`}</span>
      </p>
      <p>
        <span>Восход</span>
        <span>{dtToTime(sunrise)}</span>
      </p>
      <p>
        <span>Закат</span>
        <span>{dtToTime(sunset)}</span>
      </p>
      <p>
        <span>Ветер</span>
        <span>{`${wind_speed} м/с`}</span>
      </p>
      {rain ? (
        <p>
          <span>Осадки</span>
          <span>{`${rain} мм`}</span>
        </p>
      ) : null}
      <img
        style={{
          transform: `rotate(${itemDeg}deg)`,
          width: 24,
          height: 24,
        }}
        src={windDirection}
        alt=""
      />
    </div>
  );
}
