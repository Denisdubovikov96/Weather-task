import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { fetchWeather } from "../../store/weather/actions";

import { fetchWeatherByLocation } from "../../store/CurrentWeather/actions";

import classname from "./Searchpanel.module.scss";

export default function Searchpanel() {
  const dispatch = useDispatch();

  const [term, setTerm] = useState("");

  const searchHandler = (term) => {
    dispatch(fetchWeather(term));
    setTerm("");
  };
  return (
    <div className={classname.Searchpanel}>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button onClick={() => searchHandler(term)}>Search</button>
      <button onClick={() => dispatch(fetchWeatherByLocation())}>
        GPS Weather
      </button>
    </div>
  );
}
