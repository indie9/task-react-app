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
            
            <div class="sorting_item sort-type">
              <span className="sorting_item-name">Тип</span>
              <div class="sorting_item-checkbox">

                <div><input type="checkbox" /> Задача</div>
                <div><input type="checkbox" /> Ошибка</div>
              </div>
            </div>
         
            <input
              type="text"
              placeholder="Задача"
              className="sorting_item sort-name"
            />
            
            <div class="sorting_item sort-autor">
              <span className="sorting_item-name">Автор</span>
              <div class="sorting_item-checkbox">
                <div><input type="checkbox" /> Онегеин</div>
                <div><input type="checkbox" /> Пушкин</div>
                <div><input type="checkbox" /> Онегеин</div>
                <div><input type="checkbox" /> Пушкин</div>
              </div>
            </div>
      
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
