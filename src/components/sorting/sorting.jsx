import React from "react";
import { observer } from "mobx-react-lite";
import { events } from "../../store/index";
import { action } from "mobx"


const Sorting = observer( () =>{

  const sorting = action((evt) => {
    events.filtredData = events[evt.target.value];

  });

    return(
          <div className="sorting_list">
            <select className="sorting_item sort-type">
                <option selected disabled>Тип</option>
                <option >Задача</option>
                <option>Ошибка</option>

            </select>
            <input
              type="text"
              placeholder="Задача"
              className="sorting_item sort-name"
            />
            <select className="sorting_item sort-autor">
                 <option>Onegin</option>
                 <option>Pushkin</option>
            </select>
            <select className="sorting_item sort-status">
                 <option>ready</option>
                 <option>open</option>
                 <option>complete</option>
            </select>
            <select className="sorting_item sort-priority">
                 <option>low</option>
                 <option>middle</option>
                 <option>hight</option>
            </select>
            <button className="btn primary sort-btn"> Применить </button>
          </div>
    )});

export default Sorting;
