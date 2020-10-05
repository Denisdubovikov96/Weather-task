import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeather } from "../../store/weather/actions";
import classname from "./Searchpanel.module.scss";
import { Link } from "react-router-dom";

export default function Searchpanel() {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");

  const searchHandler = (e, term) => {
    dispatch(fetchWeather(term));
    setTerm("");
  };
  return (
    <div className={classname.Searchpanel}>
      <input
        type="text"
        value={term}
        placeholder={"Введите название города"}
        onChange={(e) => setTerm(e.target.value)}
      />
      <div>
        <button
          disabled={term.length < 2}
          onClick={(e) => searchHandler(e, term)}
        >
          Поиск
        </button>
        <Link to="/my-locations">Мои Локации</Link>
        <Link to="/">Главная</Link>
      </div>
    </div>
  );
}
