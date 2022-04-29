import React from "react";
import { observer } from "mobx-react-lite";
import { events } from "../../store/index";
import { action } from "mobx"
import { Link } from "react-router-dom";


const Title = observer( () =>{
  
  const sorting = () => {
    const form = document.getElementById("formID");
    form.requestSubmit();
  };

    return(
        <div className="taskBoard_title">
            <span className="taskBoard_title-name">Задача</span>
            <div className="taskBoard_title-buttons">
                <button type="submit" onClick={sorting}>создать</button>
                <Link
                  to={`/form/`}
                  type="button"
                  className="btn primary"
                  
                  >
                    Добавить задачу
                </Link>
            </div>
        </div>
    )});

export default Title;
