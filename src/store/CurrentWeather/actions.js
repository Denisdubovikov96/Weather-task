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
// получаем текущую локацию и погоду по ней
export const fetchWeatherByLocation = () => async (dispatch) => {
  dispatch(fetchWeatherByLocationStart());

  try {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const { latitude: lat, longitude: lon } = coords;

      const daily = await axiosWeatherCurrent.get(
        `onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly`
      );
      const current = await axiosWeatherCurrent.get(
        `weather?lat=${lat}&lon=${lon}`
      );

      const data = { daily: daily.data.daily, current: current.data };

      dispatch(fetchWeatherByLocationSucces(data));
    });
  } catch (e) {
    dispatch(fetchWeatherByLocationError(e.message));
  }
};
