import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchWeatherByLocation } from "../../store/CurrentWeather/actions";

import CurrentWeatherCard from "../CurrentWeattherCard/CurrentWeatherCard";
import Searchpanel from "../Searchpanel/Searchpanel";
import WeatherCard from "../WeatherCard/WeatherCard";

import classname from "./App.module.scss";

function App() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.weather);
  const { dataLocation } = useSelector((state) => state.currentWeather);

  // useEffect(() => {
  //   dispatch(fetchWeatherByLocation());
  // }, [dispatch]);

  return (
    <div className={classname.App}>
      <Searchpanel />
      <div>
        {data ? <WeatherCard /> : null}
        {dataLocation ? <CurrentWeatherCard /> : <CurrentWeatherCard />}
      </div>
    </div>
  );
}

export default App;
