import React from "react";
import { observer } from "mobx-react-lite";
import { tasks } from "../../store/index";
import { action } from "mobx"
import { Link,useRouteMatch } from "react-router-dom";
import { AppRoute } from "../../const";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const Title = observer( () =>{
  const { path } = useRouteMatch();
  const { id } = useParams();
  const submit = () => {
    const form = document.getElementById("taskFormID");
    form.requestSubmit();
  };
  
  const removeTask = () => {
    tasks.removeTask(id);
  }
  let status
  let taskName
  if (path === AppRoute.TASK){
    status = tasks.data.filter(item => item._id == id)[0].status
    taskName = tasks.data.filter(item => item._id == id)[0].name
  }
    return(
        <div className="title">
          <div className="sub-title">
            {path === AppRoute.MAIN && "Задача" }

            {path === AppRoute.TASK && <span className="name"> {taskName} </span>}
            {path === AppRoute.TASK && <div className={`btn status-${status}`}>{status}</div>}

          </div>
          {path === AppRoute.MAIN &&
              <div className="buttons">
                <Link
                  to={`/form`}
                  type="button"
                  className="btn primary"
                >
                  Добавить задачу
                </Link>
              </div>
          }
          
          {path === AppRoute.TASK &&
              <div className="buttons">
                <Link
                  to={AppRoute.MAIN}
                  type="button"
                  className="btn default"
                >
                  Взять в работу
                </Link>
                <Link
                  to={`/form/${id}`}
                  type="button"
                  className="btn primary"
                >
                  Редактировать
                </Link>
                <Link
                  to={`/`}
                  onClick={removeTask}
                  className="btn error"
                >
                  Удалить
                </Link>
              </div>
            }
            {path === AppRoute.EDIT_TASK &&
                <div className="buttons">
                  <button
                    className="btn primary"
                    onClick={submit}
                  >
                    
                    Сохранить
                  </button>
                  <Link
                    to={AppRoute.MAIN}
                    type="button"
                    className="btn default"
                  >
                    Отмена
                  </Link>
                </div>
            }
            </div>

    )});

export default Title;
