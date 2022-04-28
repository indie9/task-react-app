import React from "react";
import { observer } from "mobx-react-lite";
import { events } from "../../store/index";
import { action } from "mobx"


const Title = observer( () =>{

  const sorting = action((evt) => {
    events.filtredData = events[evt.target.value];

  });

    return(
        <div className="taskBoard_title">
            <span className="taskBoard_title-name">Задача</span>
            <div className="taskBoard_title-buttons">
                <button className="btn primary">Добавить задачу</button>
            </div>
        </div>
    )});

export default Title;
