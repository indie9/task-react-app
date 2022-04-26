import React from "react";
import { observer } from "mobx-react-lite";
import { events } from "../../store/index";
import { action } from "mobx"


const Sorting = observer( () =>{

  const sorting = action((evt) => { events.filtredData = events[evt.target.value]});
    return(
      <div className="board__filter-list">
      <span className="board__filter--title">Сортировка:</span>
      <input
        type="radio"
        id="board__filter-default"
        className="board__filter visually-hidden"
        name="board-filter"
        onChange={sorting}
        value={"notArchiveDate"}
      />
      <label for="board__filter-default" className="board__filter-label">По умолчанию</label>
      <input
        type="radio"
        id="board__filter-new"
        className="board__filter visually-hidden"
        name="board-filter"
        onChange={sorting}
        value={"endSortData"}
      />
      <label for="board__filter-new" className="board__filter-label">Сначала новые</label>
      <input
        type="radio"
        id="board__filter-old"
        className="board__filter visually-hidden"
        name="board-filter"
        onChange={sorting}
        value={"startSortData"}
      />
      <label for="board__filter-old" className="board__filter-label">Сначала старые</label>
  </div>
    )});

export default Sorting;
