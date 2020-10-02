import {
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_ERROR,
  FETCH_WEATHER_START,
  ADD_TRAKKED_CITY_NAME,
  FETCH_TRACKED_CITIES,
} from "./actionTypes";

const initialState = {
  loading: false,
  error: false,
  data: null,
  trackedCities: [],
  dataTrackedCities: [],
};

export const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case FETCH_WEATHER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_TRAKKED_CITY_NAME:
      return {
        ...state,
        trackedCities: action.payload,
      };
    case FETCH_TRACKED_CITIES:
      return {
        ...state,
        loading: false,
        dataTrackedCities: action.payload,
      };
    default:
      return state;
  }
};
