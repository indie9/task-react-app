import React, { useState,useEffect } from 'react';
import Header from '../../components/header/header';
import { AppRoute } from '../../const.js';
import Title from '../../components/title/title';
import Task from '../../components/task/task';
import { tasks } from '../../store';
import { users } from '../../store';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { observer } from 'mobx-react-lite';
import moment from "moment";
import "moment/locale/ru";
import { dropContent } from '../../const.js';
import { action } from "mobx";

const TaskPage =observer( () => {

  const {id} = useParams();
  //состояния хранят текущую задачу и коменты к ней
  const [userList,setUserList] = useState({});
  const [currentTask,setCurrentTask] = useState({...tasks.currentTask});
  const [comments,setComments] = useState([...tasks.currentComments]);
  //форма с коментом(новым)
  const [comment,setComment] = useState("");

  const taskTime = tasks.currentTask.timeInMinutes;
  //проверяем нужная ли задача отображается
  useEffect(() => {
    if (currentTask.id !== id){
      tasks.getTask(id).then(() => {
        setCurrentTask({...tasks.currentTask})
        setComments([...tasks.currentComments])
      });
    }
  })
  //получем пользователй
  useEffect(() => {
    if ( !userList[0]){
      users.allUsersFetch().then(() => setUserList(users.allUsers))
    }
  })
  //стандартные операции с коментами
  const handleComment = (evt) => {
    setComment(evt.target.value)
  }
  const commentDelete =action( (evt) => {
    tasks.removeComment(evt.target.value).then(() => {
      tasks.getTask(id).then(() => {
        console.log('getttt tasky',tasks.currentComments);
        setComments([...tasks.currentComments])
      });
    })

  })
  const postComment = (evt) => {
    evt.preventDefault();
    tasks.addComment({
      taskId: currentTask.id,
      userId: users.profileData.id,
      text: comment
    })
    evt.target.reset();
    setComment("");
    tasks.getTask(id).then(() => setComments([...tasks.currentComments]))

  }
  //работаем с формой добавления времени
  const [timeForm,setTimeForm] = useState({
    timeInMinutes: 0,
    unit:1,
    comment: "",
    currentUser: users.profileData.id
  });
  const handleTimeChange = (evt) => {
    const {name,value} = evt.target;
    switch ( name) {
      case "time":
        setTimeForm({...timeForm,timeInMinutes: value})
        break;
      case "unit":
        setTimeForm({...timeForm,unit: value})
        break;
      case "comment":
        setTimeForm({...timeForm,comment: value})
        break;
      default:
        break;
    }
  }

  const editTime = (evt) => {
    evt.preventDefault();
    tasks.addTime(id,{
      "timeInMinutes": timeForm.timeInMinutes * timeForm.unit,
      "comment": timeForm.comment,
      "currentUser": users.profileData.id
    }).then(() => {
      tasks.getTask(id).then(() => {

        setComments([...tasks.currentComments])
      });
    })
    setTimeForm({
      timeInMinutes: 0,
      unit: timeForm.unit,
      comment: "",
      currentUser: users.profileData.id
    });
    const modal = document.getElementsByClassName("edit_profile_modal")[0];
    modal.classList.add("hidden");

  }
  //показываем / прячем модалку
  const showTimeForm = () => {
    const modal = document.getElementsByClassName("edit_profile_modal")[0];
    modal.classList.remove("hidden");
  }
  const cancelModal = () => {
    const modal = document.getElementsByClassName("edit_profile_modal")[0];
    modal.classList.add("hidden");
  }
  //отображаем время в нужном склонении
  const getNoun = (number, one, two, five) => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return number + five;
    }
    n %= 10;
    if (n === 1) {
      return number + one;
    }
    if (n >= 2 && n <= 4) {
      return number + two;
    }
    return number + five;
  }

  return (
    <>
      <Header />
      <section className="main__wrapper">
        <Title />
        {currentTask.id
        ?
        <section className="board">
          <section className="taskPage">
            <div className="taskPage-data">

                <p className='taskPage-title'>Исполнитель</p>
                <p>{currentTask ? userList[currentTask.assignedId]: "loading.." }</p>

                <p className='taskPage-title'>Автор задачи</p>
                <p>{currentTask ? userList[currentTask.userId]: "loading.." }</p>

                <p className='taskPage-title'>Тип запроса</p>
                <p>{currentTask ? dropContent[currentTask.type]: "loading.." }</p>

                <p className='taskPage-title'>Приоритет</p>
                <p>{currentTask ? dropContent[currentTask.rank]: "loading.." }</p>

                <p className='taskPage-title'>Дата начала</p>
                <p>{currentTask ? moment(currentTask.dateOfCreation).format('DD.MM.YYYY h:mm') : "loading.." }</p>

                <p className='taskPage-title'>Дата изменения</p>
                <p>{currentTask ? moment(currentTask.dateOfUpdate).format('DD.MM.YYYY h:mm') : "loading.." }</p>

                <p className='taskPage-title'>Затрачено времени</p>

                <p>
                  {!taskTime && "Пока-что нет учтенного времени " }
                  {currentTask ?
                  Math.floor((taskTime/1440))
                   ? getNoun(Math.floor(taskTime/1440)," День "," Дня "," Дней ")
                   : ""
                  :"loading.." }

                  {currentTask ?
                  Math.floor((taskTime%1440)/60)
                   ? getNoun(Math.floor((taskTime%1440)/60)," Час "," Часа "," Часов ")
                    : ""
                  :"loading.." }

                  {currentTask ?
                  Math.floor(taskTime%60)
                   ? getNoun(Math.floor(taskTime%60)," Минута "," Минуты "," Минут ")
                   : ""
                  :"loading.." }

                </p>

                <button className='btn primary' onClick={showTimeForm}>Сделать запись о работе</button>

            </div>

            <div className="taskPage-info">
                <p className='taskPage-title'>Описание</p>
                <p>{currentTask.description}</p>
            </div>

            <form className="taskPage-comments" onSubmit={postComment}>
                <p className='taskPage-title'>Коментарии {'('}{comments.length}{')'} {}</p>
                <textarea
                className='taskPage-textArea'
                value={comment.text}
                onChange={handleComment}
                placeholder={"Текст комментария"}
                required
                />
                <button type="submit" className='btn success'> Добавить комментарий</button>
                {comments[0]
                ?
                <div className="comments-list">
                  {comments.map(item => (
                    <div className="comment-item" key={item.id} >
                      <p className='comment-title'>{userList[item.userId]} {item.userId === users.profileData.id && <button type="button" className='btn error' value={item.id} onClick={commentDelete}>Удалить</button>}</p>
                      <p className='comment-body'>{item.text}</p>
                    </div>
                  ))}

                </div>
                :
                "Нет комментариев"
                }

            </form>
          </section>
         </section>
        :
        "loading"
        }
        {/*****************модалка**********************/}
        <div className='edit_profile_modal hidden' >
          <div className='modal_board' >
              <div className="modal_board-title"> Запись о работе </div>
              <form  className='modal_board-form' id='modal_form' onSubmit={editTime}>

                <label htmlFor="photoUrl" className='taskPage-title'>Затраченое время</label>
                    <input
                      type="number"
                      className="board__input board__input--theme"
                      name="time"
                      onChange={handleTimeChange}
                      value={timeForm.timeInMinutes}
                      required
                    />
                <label htmlFor="username" className='taskPage-title'>Единица измерения</label>
                    <select
                      className="board__input board__input--theme"
                      name="unit"
                      onChange={handleTimeChange}
                      required
                    >
                      <option defaultValue={1}>Минута</option>
                      <option value={60}>Час</option>
                      <option value={1440}>День</option>


                    </select>

                <label htmlFor="about" className='taskPage-title'>Коментарий</label>
                    <textarea
                      type="text"
                      className="board__input board__input--theme"
                      name="comment"
                      onChange={handleTimeChange}
                      value={timeForm.comment}
                      required
                    > </textarea>
              </form>
              <div className="modal_board-buttons">
                <button className='btn primary' form={'modal_form'} type="submit" > Сохранить </button>
                <button className='btn default' type="button" onClick={cancelModal}> Отмена </button>
              </div>

          </div>
        </div>
        {/***************************************/}
      </section>
    </>

  )
})

export default TaskPage;
