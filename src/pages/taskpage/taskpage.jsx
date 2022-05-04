import React from 'react';
import Header from '../../components/header/header';
import Event from '../../components/event/event';
import { AppRoute } from '../../const.js';
import Title from '../../components/title/title';
import Task from '../../components/task/task';
import { tasks } from '../../store';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const TaskPage = () => {

  const {id} = useParams();
  const event = tasks.data.filter(item => item._id == id)[0];
  
  return (
    <>
      <Header />
      <section className="main__wrapper">
        <Title />
        <section className="board">
          <section className="taskPage">
            <div className="taskPage-data">
                <p className='taskPage-title'>Исполнитель</p>
                <p>{event.autor}</p>
                <p className='taskPage-title'>Автор задачи</p>
                <p>{event.autor}</p>
                <p className='taskPage-title'>Тип запроса</p>
                <p>{event.type}</p>
                <p className='taskPage-title'>Приоритет</p>
                <p>{event.priority}</p>
                <p className='taskPage-title'>Дата начала</p>
                <p>{event.date}</p>
                <p className='taskPage-title'>Дата изменения</p>
                <p>{event.date}</p>
                <p className='taskPage-title'>Затрачено времени</p>
                <p>{event._id}</p>
            </div>
            <div className="taskPage-info">
                <p className='taskPage-title'>Автор задачи</p>
                <p>{event.text}</p>
            </div>
            <div className="taskPage-comments">
                <p className='taskPage-title'>Коментарий</p>
                <textarea className='taskPage-textArea' />
                <button className='btn success'> Добавить комментарий</button>

                <p className='taskPage-title'>{event.autor} {event.date}</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </section>
        </section>
      </section>
    </>

  )
}

export default TaskPage;
