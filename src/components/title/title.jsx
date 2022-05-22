import React from "react";
import { observer } from "mobx-react-lite";
import { tasks } from "../../store/index";
import { action } from "mobx"
import { Link,useRouteMatch } from "react-router-dom";
import { AppRoute } from "../../const";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { users } from "../../store/index";
import { useState,useEffect } from "react";

const Title = observer( ({mode}) =>{
  const { path } = useRouteMatch();
  const { id } = useParams();
  const { userId } = useParams();
  //сабмити форму вне элемента
  const submit = () => {
    const form = document.getElementById("taskFormID");
    form.requestSubmit();
  };


  const changeStatus = action((evt) => {
    tasks.changeStatus(id,evt.target.value)
  })
  const deleteTask =  () =>{
    tasks.deleteTask(id);
    window.location.href = '/';

  }
  let status
  let title
  if ( !userId ){
    status = tasks.currentTask.status;
    title = tasks.currentTask.title
  }
  //открываем модалку вне элемента
  const editProfile = () => {
    const modal = document.getElementsByClassName("edit_profile_modal")[0];
    modal.classList.remove("hidden");
  }
  const profile = users.currentUserData;



    return(
        <div className="title">
          <div className="sub-title">
            {/*много условного рендеринга*/}
            {path === AppRoute.MAIN && <span className="name"> Задачи </span> }
            {path === AppRoute.TASK && <span className="name"> {title} </span>}
            {path === AppRoute.TASK && <div className={`btn status-${status}`}>{status}</div>}
            {path === AppRoute.PROFILE && <span className="name"> {profile.username ? profile.username : "Loading" } </span> }
            {path === AppRoute.EDIT_TASK && (id ? <span className="name"> Редактирование </span> : <span className="name"> Создание  </span>) }
            {path === AppRoute.USERS && <span className="name"> Пользователи </span>}
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
                        className="btn default"
                        onClick={changeStatus}
                        value={"opened"}
                        >
                          Переоткрыть
                        </button>
                    }
                    {(status === "inProgress") &&
                        <button
                        className="btn primary"
                        onClick={changeStatus}
                        value={"testing"}
                        >
                          На тестирование
                      </button>
                    }
                    {(status === "inProgress" || status === "testing") &&
                        <button
                        className="btn success"
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
                  className="btn error"
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

            {path === AppRoute.PROFILE &&
              <div className="buttons">


                <Link
                to={`/form/special/${id}`}
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
