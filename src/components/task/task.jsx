import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "moment/locale/ru";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { AppRoute } from "../../const";
import { tasks } from "../../store";
import { observer } from "mobx-react-lite";

const Task = observer( ({event,userList}) => {
  //разворачиваем данные задачи из пропсов
  const {id,title,assignedId,type,status,rank} = event;

  //скрыть показать дропдаун
  const [visableID, setVisableID] = useState()
  const setVis = () => {
    setVisableID(!visableID);
  }

  const location =  useLocation()

  const changeStatus = (evt) => {
    tasks.changeStatus(id,evt.target.value);
    setVisableID(false);
  }
  const deleteTask =  () =>{
    tasks.deleteTask(id);
    setVisableID(false);
  }
  //скрываем дродаун если регистрируем клик вне области
  useEffect(() => {
    const onClick = e => {
      const dropBTN = document.getElementById(id);
      const dropContent = document.getElementById(`drop${id}`);
      if (!dropBTN.contains(e.target) && !dropContent.contains(e.target) ){
        setVisableID(false);
      }
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  });

  return (
    <article className="task" key={id}>

      <div className="task_inner">

          <div className="task_inner-item task_type">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5C0 2.23858 2.23858 0 5 0H19C21.7614 0 24 2.23858 24 5V19C24 21.7614 21.7614 24 19 24H5C2.23858 24 0 21.7614 0 19V5Z" fill={`${type !== "bug" ? "#00D1FF" : "#EB4F4F"}`}/>
                <circle cx="12" cy="12" r="6" fill="white"/>
              </svg>
          </div>

          <div className="task_inner-item task_name">
             <Link to={`/task/${id}`} >
              {title}
             </Link>
          </div>

          {location.pathname === AppRoute.MAIN &&
            <div  className="task_inner-item task_autor">
            {userList[assignedId] ? userList[assignedId] : "Свободно"}
          </div>
          }
          <div className="task_inner-item task_status" >
            <div className={`task_status-btn status-${status}`}>{status}</div>
          </div>

          <div className={`task_inner-item task_priority priority-${rank}`}>{rank}</div>

          {location.pathname === AppRoute.MAIN &&
          <div className="task_btn">
              <div className="dropdown" id={`drop${id}`}>
                  <p className={`dropdown-btn ${visableID === true && "dropdown-active"}`} onClick = {setVis} >
                      <span> &#9776;</span>
                  </p>
                  <div className={`dropdown-content ${visableID === true && "visable"}`} id = {id} >

                    <Link
                      to={`/form/${id}`}
                      type="text"
                      className="dropdown-content-item"
                      >
                        Редактировать
                    </Link>


                    <button
                      className="dropdown-content-item"
                      onClick={deleteTask}
                      style={{color : "#FF6161"}}
                      >
                        Удалить
                    </button>

                    {(status === "opened") &&
                        <button
                        className="dropdown-content-item"
                        onClick={changeStatus}
                        value={"inProgress"}
                        >
                          Взять в работу
                        </button>
                    }
                    {(status === "inProgress" || status === "testing" || status === "complete") &&
                        <button
                        className="dropdown-content-item"
                        onClick={changeStatus}
                        value={"opened"}
                        >
                          Переоткрыть
                        </button>
                    }
                    {(status === "inProgress") &&
                        <button
                        className="dropdown-content-item"
                        onClick={changeStatus}
                        value={"testing"}
                        >
                          На тестирование
                      </button>
                    }
                    {(status === "inProgress" || status === "testing") &&
                        <button
                        className="dropdown-content-item"
                        onClick={changeStatus}
                        value={"complete"}
                        >
                          Готово
                      </button>
                    }




                  </div>
              </div>
          </div>
          }
      </div>

    </article>


  );
});

export default Task;
