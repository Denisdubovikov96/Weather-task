import React from "react";
import { useDispatch } from "react-redux";
import { addCity } from "../../store/weather/actions";

import classes from "./CurrentWeatherCard.module.scss";

export default function CurrentWeatherCard({ data }) {
  const dispatch = useDispatch();

  if (data) {
    const { current, daily } = data;
    const { clouds, dt, wind, weather, name, main, sys } = current;

    const currentUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    const windNavigate =
      "https://ssl.gstatic.com/m/images/weather/wind_unselected.svg";

    return (
      <div className={classes.card}>
        <div className={classes.card_left}>
          <div className={classes.left_head}>
            <div>
              <img src={currentUrl} alt="" />
            </div>

            <div className={classes.title_description}>
              <h3>{name}</h3>
              <p>Состоянием на {new Date(dt * 1000).toLocaleTimeString()}</p>
              <p>{weather[0].description}</p>
            </div>
          </div>

          <div className={classes.left_body}>
            <div className={classes.header_description}>
              <h4>Температура</h4>
              <ul>
                <li>{`${main.temp} *C`}</li>
                <li>{`Ощущается как ${main.feels_like} *С`}</li>
              </ul>
            </div>

            <div className={classes.header_description}>
              <h4>Восход / Закат</h4>
              <ul>
                <li>{new Date(sys.sunrise * 1000).toLocaleTimeString()}</li>
                <li>{new Date(sys.sunset * 1000).toLocaleTimeString()}</li>
              </ul>
            </div>

            <div className={classes.header_description}>
              <h4>Давление</h4>
              <ul>
                <li>{(main.pressure / 1.333).toFixed(1)}</li>
              </ul>
            </div>

            <div className={classes.header_description}>
              <h4>Влажность</h4>
              <ul>
                <li>{`${main.humidity} %`}</li>
              </ul>
            </div>

            <div className={classes.header_description}>
              <h4>Ветер</h4>
              <ul>
                <li>{`${wind.speed} м/с`}</li>
                <li>
                  <img
                    style={{
                      transform: `rotate(${wind.deg}deg)`,
                      width: 24,
                      height: 24,
                    }}
                    src={windNavigate}
                    alt=""
                  />
                </li>
              </ul>
            </div>

            <div className={classes.header_description}>
              <h4>Облачность</h4>
              <ul>
                <li>{`${clouds.all} %`}</li>
              </ul>
            </div>
          </div>

          <div className={classes.left_footer}>
            <button onClick={() => dispatch(addCity(name))}>Click</button>
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
              wind_deg: itemDeg,
              wind_speed,
              temp,
            } = item;

            const dayUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

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
                  <span>{`${(pressure / 1.333).toFixed(1)}`}</span>
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
                    transform: `rotate(${itemDeg}deg)`,
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
