import React, { useState, useEffect } from 'react';
import Sorting from '../sorting/sorting';
import { AppRoute } from '../../const';
import { useLocation } from 'react-router-dom';
import { tasks, users } from '../../store';
import Task from '../task/task';
import { observer } from 'mobx-react-lite';
import Pagination from '../pagination/pagination';

const TaskBoard = observer( () => {
  const taskList = tasks.filtredData;
  const location = useLocation();
  //получаем всех пользователей
  const userList = users.allUsers //{"6273dca5d09b551dca87629c": 'Алексей Кутилов', "6273dcb7d09b551dca87629d": 'A', "6273dcd2d09b551dca87629e": 'Артем Сорокин', "6273dce7d09b551dca87629f": 'Николай Рубцов',};
  console.log(users.usersList)
  /*if (!userList.length){
    useEffect(() => {
      users.allUsersFetch().then(() => setUserList(users.allUsers))
    })
  }*/

  return (
  <>
    {location.pathname === AppRoute.MAIN && <Sorting />}

    <div className="task_list">
      {taskList[0] ? taskList.map(event => <Task event={event} userList={userList} key={event.id} />) : <p style={{height: "25px"}}>"Нет совпадений"</p>}
    </div>


    <Pagination item={tasks} />
  </>
  )
});

export default TaskBoard;
