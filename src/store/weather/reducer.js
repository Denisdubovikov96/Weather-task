// import { FETCH_WEATHER_BY_LOCATION_SUCCESS } from "../CurrentWeather/actionTypes";
import {
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_ERROR,
  FETCH_WEATHER_START,
  ADD_TRAKKED_CITY_NAME,
  FETCH_TRACKED_CITIES,
  FETCH_WEATHER_BY_LOCATION_SUCCESS,
  REMOVE_TRAKKED_CITY_NAME,
} from "./actionTypes";

const initialState = {
  loading: false,
  dataSearch: null,
  dataTrackedCities: [],
  dataLocation: null,
  trackedCities: [],
  error: false,
};

export const weatherReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_WEATHER_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        dataSearch: payload,
        loading: false,
        error: null,
      };
    case FETCH_WEATHER_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ADD_TRAKKED_CITY_NAME:
      return {
        ...state,
        trackedCities: [...state.trackedCities, payload],
      };
    case REMOVE_TRAKKED_CITY_NAME:
      return {
        ...state,
        trackedCities: [
          ...state.trackedCities.slice(0, payload.cityIndex),
          ...state.trackedCities.slice(payload.cityIndex + 1),
        ],
        dataTrackedCities: [
          ...state.dataTrackedCities.slice(0, payload.dataIndex),
          ...state.dataTrackedCities.slice(payload.dataIndex + 1),
        ],
      };
    case FETCH_TRACKED_CITIES:
      return {
        ...state,
        loading: false,
        dataTrackedCities: payload,
        error: null,
      };
    case FETCH_WEATHER_BY_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        dataLocation: payload,
        error: null,
      };

    default:
      return state;
  }
};
