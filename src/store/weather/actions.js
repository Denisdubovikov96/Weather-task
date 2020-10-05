import {
  FETCH_WEATHER_ERROR,
  FETCH_WEATHER_START,
  FETCH_WEATHER_SUCCESS,
  ADD_TRAKKED_CITY_NAME,
  FETCH_TRACKED_CITIES,
  FETCH_WEATHER_BY_LOCATION_SUCCESS,
  REMOVE_TRAKKED_CITY_NAME,
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

const removeCityFromTracking = (cityIndex, dataIndex) => {
  return {
    type: REMOVE_TRAKKED_CITY_NAME,
    payload: { cityIndex, dataIndex },
  };
};

const fetchTrackedCities = (dataArray) => {
  return {
    type: FETCH_TRACKED_CITIES,
    payload: dataArray,
  };
};

const fetchWeatherByLocationSucces = (data) => {
  return {
    type: FETCH_WEATHER_BY_LOCATION_SUCCESS,
    payload: data,
  };
};
// ???======================================================
export const fetchWeather = (term) => async (dispatch, _, axiosWeather) => {
  dispatch(fetchWeatherStart());

  try {
    const current = await axiosWeather.get(`weather?q=${term}`);
    const { lat, lon } = current.data.coord;
    const daily = await axiosWeather.get(
      `onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly`
    );
    const data = { daily: daily.data.daily, current: current.data };
    dispatch(fetchWeatherSucces(data));
  } catch (e) {
    dispatch(fetchWeatherError(e.message));
  }
};

export const addCity = (city) => (dispatch, getState) => {
  const cities = getState().weather.trackedCities;
  if (cities.includes(city)) {
    return;
  } else {
    dispatch(addCityToTracking(city));
  }
};

export const removeCity = (city) => (dispatch, getState) => {
  const { trackedCities, dataTrackedCities } = getState().weather;
  const nameIndex = trackedCities.findIndex((item) => item === city);
  const dataIndex = dataTrackedCities.findIndex(
    (item) => item.current.name === city
  );
  dispatch(removeCityFromTracking(nameIndex, dataIndex));
};

export const fetchWeathersMyCities = () => async (
  dispatch,
  getState,
  axiosWeather
) => {
  dispatch(fetchWeatherStart());
  const myCities = getState().weather.trackedCities;
  try {
    const dataArr = await Promise.all(
      myCities.map(async (city) => {
        const current = await axiosWeather.get(`weather?q=${city}`);
        const { lat, lon } = current.data.coord;
        const daily = await axiosWeather.get(
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

export const fetchWeatherByLocation = () => async (
  dispatch,
  _,
  axiosWeather
) => {
  dispatch(fetchWeatherStart());
  try {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const { latitude: lat, longitude: lon } = coords;
      const daily = await axiosWeather.get(
        `onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly`
      );
      const current = await axiosWeather.get(`weather?lat=${lat}&lon=${lon}`);
      const data = { daily: daily.data.daily, current: current.data };
      dispatch(fetchWeatherByLocationSucces(data));
    });
  } catch (e) {
    dispatch(fetchWeatherError(e.message));
  }
};
