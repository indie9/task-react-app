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
    const form = document.getElementById("formID");
    form.requestSubmit();
  };
  const removeTask = () => {
    tasks.removeTask(id);
  }

    return(
        <div className="title">
            <span className="name">Задача</span>

            {path === AppRoute.MAIN &&
              <div className="buttons">
                <Link
                  to={`/form/`}
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
                  <Link
                    to={`/form/${id}`}
                    type="button"
                    className="btn primary"
                  >
                    Сохранить
                  </Link>
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
