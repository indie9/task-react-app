import { keyboard } from "@testing-library/user-event/dist/keyboard";
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/ru";




const Task = ({event}) => {
  const {_id,name,autor,type,status,priority} = event;

  return (
    <article className="task">

        <div className="task_inner">
            <div className="task_inner-item task_type">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 5C0 2.23858 2.23858 0 5 0H19C21.7614 0 24 2.23858 24 5V19C24 21.7614 21.7614 24 19 24H5C2.23858 24 0 21.7614 0 19V5Z" fill={`${type == "error" ? "#00D1FF" : "#EB4F4F"}`}/>
                    <circle cx="12" cy="12" r="6" fill="white"/>
                </svg>


            </div>
            <div className="task_inner-item task_name"> {name}</div>
            <div className="task_inner-item task_autor">{autor}</div>
            <div className="task_inner-item task_status" >
                <div className={`task_status-btn ${status}`}>{status}</div>
            </div>
            <div className={`task_inner-item task_priority ${priority}`}>{priority}</div>

              <div className="task_btn">
                <div className="dropdown">
                    <button className="btn">
                      <i >xxx</i>
                    </button>
                    <div className="dropdown-content">
                      <a href="#">Ссылка 1</a>
                      <a href="#">Ссылка 2</a>
                      <a href="#">Ссылка 3</a>
                    </div>
                </div>
              </div>

      </div>
    </article>
  );
};

export default Task;
