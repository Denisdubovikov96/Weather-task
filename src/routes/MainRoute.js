import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CurrentWeatherCard from "../components/CurrentWeattherCard/CurrentWeatherCard";
import Loader from "../components/Loader/Loader";
import { fetchWeatherByLocation } from "../store/CurrentWeather/actions";

export default function MainRoute() {
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.weather);
  const { dataLocation } = useSelector((state) => state.currentWeather);

  useEffect(() => {
    dispatch(fetchWeatherByLocation());
  }, []);

  return (
    <>
      {data ? <CurrentWeatherCard data={data} /> : loading ? <Loader /> : null}
      {dataLocation ? <CurrentWeatherCard data={dataLocation} /> : <Loader />}
    </>
  );
}
