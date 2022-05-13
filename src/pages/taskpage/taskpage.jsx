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

const TaskPage =observer( () => {

  const {id} = useParams();
  const [usersList,setUsersList] = useState({...users.usersList});
  const [currentTask,setCurrentTask] = useState({...tasks.currentTask});
  const [comment,setComment] = useState("");
  const comments = [...tasks.currentComments];
  const taskTime = tasks.currentTask.timeInMinutes;

  if (!currentTask.id ){
    tasks.getTask(id).then(() => setCurrentTask({...tasks.currentTask}));
  }
  if (!usersList[users.profileData.id] ){
    users.fetch().then(() => setUsersList({...users.usersList}));
  }
  const [userList,setUserList] = useState({});

  useEffect(() => {
    users.allUsersFetch().then(() => setUserList(users.allUsers))
  })


  const handleComment = (evt) => {
    setComment(evt.target.value)
  }
  const commentDelete = (evt) => {
    tasks.removeComment(evt.target.value);
    tasks.getTask(id)
  }
  const postComment = (evt) => {
    evt.preventDefault();
    console.log(comment)
    tasks.addComment({
      taskId: currentTask.id,
      userId: users.profileData.id,
      text: comment
    })
    evt.target.reset();
    setComment("");
    tasks.getTask(id);

  }

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
  const showTimeForm = () => {
    const modal = document.getElementsByClassName("edit_profile_modal")[0];
    modal.classList.remove("hidden");
  }
  const editTime = (evt) => {
    evt.preventDefault();
    tasks.addTime(id,{
      "timeInMinutes": timeForm.timeInMinutes * timeForm.unit,
      "comment": timeForm.comment,
      "currentUser": users.profileData.id
    }).then(() => tasks.getTask(id))
    setTimeForm({
      timeInMinutes: 0,
      unit: timeForm.unit,
      comment: "",
      currentUser: users.profileData.id
    });
    const modal = document.getElementsByClassName("edit_profile_modal")[0];
    modal.classList.add("hidden");

  }
  const cancelModal = () => {
    const modal = document.getElementsByClassName("edit_profile_modal")[0];
    modal.classList.add("hidden");
  }

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
                <p>{currentTask ? currentTask.type: "loading.." }</p>

                <p className='taskPage-title'>Приоритет</p>
                <p>{currentTask ? currentTask.rank: "loading.." }</p>

                <p className='taskPage-title'>Дата начала</p>
                <p>{currentTask ? moment(currentTask.dateOfCreation).format('DD.MM.YYYY h:mm') : "loading.." }</p>

                <p className='taskPage-title'>Дата изменения</p>
                <p>{currentTask ? moment(currentTask.dateOfUpdate).format('DD.MM.YYYY h:mm') : "loading.." }</p>

                <p className='taskPage-title'>Затрачено времени</p>

                <p> 

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
                    <div className="comment-item">
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
        {/***************************************/}
        <div className='edit_profile_modal hidden' >
          <div className='modal_board' >
              <div className="modal_board-title"> Запись о работе </div>
              <form  className='modal_board-form' id='modal_form' onSubmit={editTime}>

                <label for="photoUrl" className='taskPage-title'>Затраченое время</label>
                    <input
                      type="number"
                      className="board__input board__input--theme"
                      name="time"
                      onChange={handleTimeChange}
                      value={timeForm.timeInMinutes}
                      required
                    />
                <label for="username" className='taskPage-title'>Единица измерения</label>
                    <select
                      className="board__input board__input--theme"
                      name="unit"
                      onChange={handleTimeChange}
                      required
                    >
                      <option value={1440}>День</option>
                      <option value={60}>Час</option>
                      <option selected value={1}>Минута</option>
                    </select>

                <label for="about" className='taskPage-title'>Коментарий</label>
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
