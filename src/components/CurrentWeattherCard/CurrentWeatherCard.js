import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCity, removeCity } from "../../store/weather/actions";
import classes from "./CurrentWeatherCard.module.scss";
import { openWeaterIcon, windDirection } from "../../static/imgUrls";
import { dtToTime } from "../../helperFunctions/helperFunctions";
import RightItem from "./RightItem";

export default function CurrentWeatherCard({ data }) {
  const { trackedCities } = useSelector((state) => state.weather);

  const dispatch = useDispatch();
  const LeftDescription = ({ title, value1, value2, img }) => {
    return (
      <div className={classes.left_description}>
        <h4>{title}</h4>
        <ul>
          <li>{value1}</li>
          {value2 ? <li>{value2}</li> : null}
          {img ? <li>{img}</li> : null}
        </ul>
      </div>
    );
  };
  const StyledImg = (src, deg, size = 24) => {
    return (
      <img
        style={{
          transform: `rotate(${deg}deg)`,
          width: size,
          height: size,
        }}
        src={src}
        alt=""
      />
    );
  };
  if (data) {
    const { current, daily } = data;
    const { clouds, dt, wind, weather, name, main, sys } = current;
    return (
      <div className={classes.card}>
        <div className={classes.card_left}>
          <div className={classes.left_head}>
            <div>
              <img src={openWeaterIcon(weather[0].icon)} alt="" />
            </div>
            <div className={classes.title_description}>
              <h3>{name}</h3>
              <p>Состоянием на {dtToTime(dt)}</p>
              <p>{weather[0].description}</p>
            </div>
          </div>
          <div className={classes.left_body}>
            <LeftDescription
              title={"Температура"}
              value1={`${main.temp} ${"\u00B0"} C`}
              value2={`${main.feels_like} ${"\u00B0"} С`}
            />
            <LeftDescription
              title={"Восход / Закат"}
              value1={dtToTime(sys.sunrise)}
              value2={dtToTime(sys.sunset)}
            />
            <LeftDescription
              title={"Давление"}
              value1={(main.pressure / 1.333).toFixed(1)}
            />
            <LeftDescription
              title={"Влажность"}
              value1={`${main.humidity} %`}
            />
            <LeftDescription
              title={"Ветер"}
              value1={`${wind.speed} м/с`}
              img={StyledImg(windDirection, wind.deg)}
            />
            <LeftDescription title={"Облачность"} value1={`${clouds.all} %`} />
          </div>
          <div className={classes.left_footer}>
            {trackedCities.includes(name) ? (
              <button onClick={() => dispatch(removeCity(name))}>
                Удалить из моих локации
              </button>
            ) : (
              <button onClick={() => dispatch(addCity(name))}>
                Добавить в мои локации
              </button>
            )}
          </div>
        </div>
        <div className={classes.card_right}>
          {daily.map((item) => {
            return (
              <RightItem
                key={item.dt}
                item={item}
                className={classes.right_item}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
