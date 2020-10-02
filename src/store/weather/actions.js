import { axiosWeatherCurrent } from "../../api/weatherApi";
import {
  FETCH_WEATHER_ERROR,
  FETCH_WEATHER_START,
  FETCH_WEATHER_SUCCESS,
  ADD_TRAKKED_CITY_NAME,
  FETCH_TRACKED_CITIES,
} from "./actionTypes";

const fetchWeatherStart = () => {
  return {
    type: FETCH_WEATHER_START,
  };
};

const fetchWeatherSucces = (data) => {
  return {
    type: FETCH_WEATHER_SUCCESS,
    payload: data,
  };
};

const fetchWeatherError = (error) => {
  return {
    type: FETCH_WEATHER_ERROR,
    payload: error,
  };
};

const addCityToTracking = (cityName) => {
  return {
    type: ADD_TRAKKED_CITY_NAME,
    payload: cityName,
  };
};

const fetchTrackedCities = (dataArray) => {
  return {
    type: FETCH_TRACKED_CITIES,
    payload: dataArray,
  };
};
// поиск города по названию
export const fetchWeather = (term) => async (dispatch) => {
  dispatch(fetchWeatherStart());

  try {
    const current = await axiosWeatherCurrent.get(`weather?q=${term}`);

    const { lat, lon } = current.data.coord;

    const daily = await axiosWeatherCurrent.get(
      `onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly`
    );

    const data = { daily: daily.data.daily, current: current.data };
    dispatch(fetchWeatherSucces(data));
  } catch (e) {
    dispatch(fetchWeatherError(e.message));
  }
};
// добавляем город к отслеживаемым
export const addCity = (city) => (dispatch, getState) => {
  const cities = getState().weather.trackedCities;

  if (cities.includes(city)) {
    return;
  } else {
    dispatch(addCityToTracking([...cities, city]));
  }
};
// Получаем все города из отслеживаемых
export const fetchWeathersMyCities = () => async (dispatch, getState) => {
  dispatch(fetchWeatherStart());
  const myCities = getState().weather.trackedCities;
  try {
    const dataArr = await Promise.all(
      myCities.map(async (city) => {
        const current = await axiosWeatherCurrent.get(`weather?q=${city}`);

        const { lat, lon } = current.data.coord;

        const daily = await axiosWeatherCurrent.get(
          `onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly`
        );

        const data = { daily: daily.data.daily, current: current.data };

        return data;
      })
    );

    dispatch(fetchTrackedCities(dataArr));
  } catch (e) {
    dispatch(fetchWeatherError(e.message));
  }
};
