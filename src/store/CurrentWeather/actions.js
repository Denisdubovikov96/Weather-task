import { axiosWeatherCurrent } from "../../api/weatherApi";
import {
  FETCH_WEATHER_BY_LOCATION_SUCCESS,
  FETCH_WEATHER_BY_LOCATION_START,
  FETCH_WEATHER_BY_LOCATION_ERROR,
} from "./actionTypes";

const fetchWeatherByLocationStart = () => {
  return {
    type: FETCH_WEATHER_BY_LOCATION_START,
  };
};

const fetchWeatherByLocationSucces = (data) => {
  return {
    type: FETCH_WEATHER_BY_LOCATION_SUCCESS,
    payload: data,
  };
};
const fetchWeatherByLocationError = (error) => {
  return {
    type: FETCH_WEATHER_BY_LOCATION_ERROR,
    payload: error,
  };
};

export const fetchWeatherByLocation = () => async (dispatch) => {
  dispatch(fetchWeatherByLocationStart());

  try {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const { latitude: lat, longitude: lon } = coords;
      const responce = await axiosWeatherCurrent.get(
        `onecall?lat=${lat}&lon=${lon}`
      );

      dispatch(fetchWeatherByLocationSucces(responce.data));
    });
  } catch (e) {
    dispatch(fetchWeatherByLocationError(e.message));
  }
};
