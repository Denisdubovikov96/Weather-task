import { combineReducers } from "redux";
import { weatherReducer } from "./weather/reducer";
import { currentWeatherReducer } from "./CurrentWeather/reducer";

export default combineReducers({
  weather: weatherReducer,
  currentWeather: currentWeatherReducer,
});
