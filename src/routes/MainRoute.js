import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CurrentWeatherCard from "../components/CurrentWeattherCard/CurrentWeatherCard";
import Loader from "../components/Loader/Loader";
import { fetchWeatherByLocation } from "../store/weather/actions";

export default function MainRoute() {
  const dispatch = useDispatch();
  const { dataSearch, loading, dataLocation } = useSelector(
    (state) => state.weather
  );

  useEffect(() => {
    dispatch(fetchWeatherByLocation());
  }, []);

  return (
    <>
      {dataSearch ? (
        <CurrentWeatherCard data={dataSearch} />
      ) : loading ? (
        <Loader />
      ) : null}
      {dataLocation ? <CurrentWeatherCard data={dataLocation} /> : <Loader />}
    </>
  );
}
