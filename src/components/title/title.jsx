import React from "react";
import { observer } from "mobx-react-lite";
import { tasks } from "../../store/index";
import { action } from "mobx"
import { Link,useRouteMatch } from "react-router-dom";
import { AppRoute } from "../../const";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { users } from "../../store/index";
const Title = observer( ({mode}) =>{
  const { path } = useRouteMatch();
  const { id } = useParams();
  const submit = () => {
    const form = document.getElementById("taskFormID");
    form.requestSubmit();
  };

  const removeTask = () => {
    tasks.removeTask(id);
  }

  const changeStatus =action((evt) => {
    tasks.changeStatus(id,evt.target.value)
  })
  const deleteTask =  () =>{
    tasks.deleteTask(id);
    window.location.href = '/';

  }
  const status = tasks.currentTask.status;
  const title = tasks.currentTask.title
  const editProfile = () => {
    const modal = document.getElementsByClassName("edit_profile_modal")[0];
    modal.classList.remove("hidden");
  }
  const profile = {...users.currentUserData};
    return(
        <div className="title">
          <div className="sub-title">
            {path === AppRoute.MAIN && "Задача" }
            {path === AppRoute.TASK && <span className="name"> {title} </span>}
            {path === AppRoute.TASK && <div className={`btn status-${status}`}>{status}</div>}
            {mode === "Profile" && <span className="name"> {profile.username} </span> }
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
                 {(status === "opened") &&
                        <button
                        className="btn default"
                        onClick={changeStatus}
                        value={"inProgress"}
                        >
                          Взять в работу
                        </button>
                    }
                    {(status === "inProgress" || status === "testing" || status === "complete") &&
                        <button
                        className=""
                        onClick={changeStatus}
                        value={"opened"}
                        >
                          Переоткрыть
                        </button>
                    }
                    {(status === "inProgress") &&
                        <button
                        className=""
                        onClick={changeStatus}
                        value={"testing"}
                        >
                          На тестирование
                      </button>
                    }
                    {(status === "inProgress" || status === "testing") &&
                        <button
                        className=""
                        onClick={changeStatus}
                        value={"complete"}
                        >
                          Готово
                      </button>
                    }

                <Link
                  to={`/form/${id}`}
                  type="button"
                  className="btn primary"
                >
                  Редактировать
                </Link>
                <button
                  className="btn default"
                  onClick={deleteTask}
                >
                  Удалить
                </button>
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

            {mode === "Profile" &&
              <div className="buttons">


                <Link
                to={`/form`}
                type="button"
                className="btn default"
                >
                  Добавить задачу
                </Link>
                {users.profileData.id === id &&
                  <button
                  className="btn primary"
                  onClick={editProfile}
                  >
                  Редактировать
                  </button>
                }


            </div>
            }
            </div>

    )});

export default Title;
