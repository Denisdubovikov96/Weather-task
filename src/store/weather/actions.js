import { axiosWeather } from "../../api/weatherApi";
import {
  FETCH_WEATHER_ERROR,
  FETCH_WEATHER_START,
  FETCH_WEATHER_SUCCESS,
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
// const fetchWeatherByLocationSucces = (data) => {
//   return {
//     type: FETCH_WEATHER_BY_LOCATION_SUCCESS,
//     payload: data,
//   };
// };
const fetchWeatherError = (error) => {
  return {
    type: FETCH_WEATHER_ERROR,
    payload: error,
  };
};

export const fetchWeather = (term) => async (dispatch) => {
  dispatch(fetchWeatherStart());

  try {
    const response = await axiosWeather.get(`weather?q=${term}`);
    dispatch(fetchWeatherSucces(response.data));
  } catch (e) {
    dispatch(fetchWeatherError(e.message));
  }
};

// export const fetchWeatherByLocation = () => async (dispatch) => {
//   dispatch(fetchWeatherStart());

//   try {
//     navigator.geolocation.getCurrentPosition(async ({ coords }) => {
//       const { latitude: lat, longitude: lon } = coords;
//       console.log(lat, lon);
//       const responce = await axiosWeatherCurrent.get(
//         `onecall?lat=${+lat.toFixed(2)}&lon=${+lon.toFixed(2)}`
//       );
//       dispatch(fetchWeatherByLocationSucces(responce.data));
//     });
//   } catch (e) {
//     dispatch(fetchWeatherError(e.message));
//   }
// };
