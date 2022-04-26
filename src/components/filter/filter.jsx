import React from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const";
import { observer } from "mobx-react-lite";
import { events } from "../../store/index";
import { action } from "mobx"

const Filter = observer (() => {
  const location = useLocation();
  const {
    notArchiveDate,
    pastData,
    todayData,
    futureData,
    favoriteData
  } = events


  const handleFiltred = action ((evt) => {
    events.filtredData = events[evt.target.value];
  });

  return (
    <section className="main__filter filter">
      <input
        type="radio"
        id="filter__all"
        className="filter__input visually-hidden"
        name="filter"
        
        value={"notArchiveDate"}
        disabled = {!notArchiveDate.length}
        onChange={handleFiltred}
        
      />
      <label htmlFor="filter__all" className="filter__label">
        Все <span className="filter__all-count count">{notArchiveDate.length}</span>
      </label>

      <input
        type="radio"
        id="filter__overdue"
        className="filter__input visually-hidden"
        name="filter"
        value={"pastData"}
        onChange={handleFiltred}
        disabled = {!pastData.length}
      />
      <label htmlFor="filter__overdue" className="filter__label">
        Прошедшие <span className="filter__overdue-count count">{pastData.length}</span>
      </label>
      <input
        type="radio"
        id="filter__today"
        className="filter__input visually-hidden"
        name="filter"
        onChange={handleFiltred}
        disabled = {!todayData.length}
        value={"todayData"}
      />
      <label htmlFor="filter__today" className="filter__label">
        Сегодня <span className="filter__today-count count">{todayData.length}</span>
      </label>
      <input
        type="radio"
        id="filter__future"
        className="filter__input visually-hidden"
        name="filter"
        onChange={handleFiltred}
        disabled = {!futureData.length}
        value={"futureData"}
      />
      <label htmlFor="filter__future" className="filter__label">
        Будущие <span className="filter__future-count count">{futureData.length}</span>
      </label>
      <input
        type="radio"
        id="filter__favorite"
        className="filter__input visually-hidden"
        name="filter"
        onChange={handleFiltred}
        disabled = {!favoriteData.length}
        value={"favoriteData"}
      />
      <label htmlFor="filter__favorite" className="filter__label">
        Избранное <span className="filter__favorite-count count">{favoriteData.length}</span>
      </label>

      {
        location.pathname === AppRoute.MAIN
        ?
        <Link to="/event">
          <button name="control" className="btn-add">
            Создать
          </button>
        </Link>
        :
        <></>
      }

    </section>
  );
});

export default Filter;
