import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import classes from "./CurrentWeatherCard.module.scss";

// !!! Время
// new Date(dt * 1000).toDateString()

export default function CurrentWeatherCard() {
  const { dataLocation } = useSelector((state) => state.currentWeather);

  if (dataLocation) {
    const { current, timezone, daily } = dataLocation;
    const {
      clouds,
      dt,
      feels_like,
      humidity,
      pressure,
      sunrise,
      sunset,
      temp,
      wind_deg,
      wind_speed,
      weather,
    } = current;

    const currentUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    return (
      <div className={classes.card}>
        <div className={classes.card_left}>
          <div className={classes.left_head}>
            <div>
              <img src={currentUrl} alt="" />
            </div>
            <div className={classes.title_description}>
              <h3>{timezone}</h3>
              <p>Состоянием на {new Date(dt * 1000).toLocaleTimeString()}</p>
              <p>{weather[0].description}</p>
            </div>
          </div>

          <div className={classes.left_body}>
            <div className={classes.header_description}>
              <h4>Температура</h4>
              <ul>
                <li>{`${temp} *C`}</li>
                <li>{`Ощущается как ${feels_like} *С`}</li>
              </ul>
            </div>

            <div className={classes.header_description}>
              <h4>Восход / Закат</h4>
              <ul>
                <li>{new Date(sunrise * 1000).toLocaleTimeString()}</li>
                <li>{new Date(sunset * 1000).toLocaleTimeString()}</li>
              </ul>
            </div>

            <div className={classes.header_description}>
              <h4>Давление</h4>
              <ul>
                <li>{pressure}</li>
              </ul>
            </div>

            <div className={classes.header_description}>
              <h4>Влажность</h4>
              <ul>
                <li>{humidity}</li>
              </ul>
            </div>

            <div className={classes.header_description}>
              <h4>Ветер</h4>
              <ul>
                <li>{wind_deg}</li>
                <li>{wind_speed}</li>
              </ul>
            </div>

            <div className={classes.header_description}>
              <h4>Облачность</h4>
              <ul>
                <li>{`${clouds} %`}</li>
              </ul>
            </div>
          </div>
        </div>
        {/* left */}

        <div className={classes.card_right}>
          {daily.map((item) => {
            const {
              clouds,
              dt,
              humidity,
              pressure,
              rain,
              sunrise,
              sunset,
              weather,
              wind_deg,
              temp,
            } = item;

            const dayUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

            const windNavigate =
              "https://ssl.gstatic.com/m/images/weather/wind_unselected.svg";

            return (
              <div key={item.dt} className={classes.right_item}>
                <h4>{new Date(dt * 1000).toLocaleDateString()}</h4>
                <img src={dayUrl} alt="" />

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
                  <span>{` ${(pressure / 1.333).toFixed(1)}`}</span>
                </p>
                <p>
                  <span>Восход</span>
                  <span>{new Date(sunrise * 1000).toLocaleTimeString()}</span>
                </p>
                <p>
                  <span>Закат</span>
                  <span>{new Date(sunset * 1000).toLocaleTimeString()}</span>
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
                    transform: `rotate(${wind_deg}deg)`,
                    width: 24,
                    height: 24,
                  }}
                  src={windNavigate}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
