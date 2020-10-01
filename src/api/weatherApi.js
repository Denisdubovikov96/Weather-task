import axios from "axios";

export const axiosWeather = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  params: {
    appid: "bdef87e098c7c4cba5216dc66212a1fa",
    lang: "ru",
    units: "metric",
  },
});

export const axiosWeatherCurrent = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  params: {
    appid: "bdef87e098c7c4cba5216dc66212a1fa",
    lang: "ru",
    units: "metric",
  },
});
