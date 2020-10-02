import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CurrentWeatherCard from "../components/CurrentWeattherCard/CurrentWeatherCard";
import Loader from "../components/Loader/Loader";
import { fetchWeathersMyCities } from "../store/weather/actions";

export default function MyLocations() {
  const { data, dataTrackedCities, loading } = useSelector(
    (state) => state.weather
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWeathersMyCities());
  }, []);

  return (
    <>
      {data ? <CurrentWeatherCard data={data} /> : loading ? <Loader /> : null}

      <h2 style={{ textAlign: "center", margin: "10px 0" }}>
        Отслеживаемые локации
      </h2>

      {dataTrackedCities && dataTrackedCities.length !== 0 ? (
        dataTrackedCities.map((city) => {
          return (
            <CurrentWeatherCard key={city} loading={loading} data={city} />
          );
        })
      ) : loading ? (
        <Loader />
      ) : (
        <h5 style={{ textAlign: "center" }}>Нет отслеживаемых локаций</h5>
      )}
    </>
  );
}
