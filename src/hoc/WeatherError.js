import React from "react";
import { useSelector } from "react-redux";

export default function WeatherError({ children }) {
  const { error } = useSelector((state) => state.weather);

  return (
    <>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
      {children}
    </>
  );
}
