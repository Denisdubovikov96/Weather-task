import {
  FETCH_WEATHER_BY_LOCATION_START,
  FETCH_WEATHER_BY_LOCATION_SUCCESS,
  FETCH_WEATHER_BY_LOCATION_ERROR,
} from "./actionTypes";

const initialState = {
  loading: false,
  error: false,
  dataLocation: null,
};

export const currentWeatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_BY_LOCATION_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_WEATHER_BY_LOCATION_SUCCESS:
      return {
        ...state,
        dataLocation: action.payload,
        loading: false,
      };
    case FETCH_WEATHER_BY_LOCATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
