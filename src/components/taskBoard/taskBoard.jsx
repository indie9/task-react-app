import React, { useState, useEffect } from 'react';
import Sorting from '../sorting/sorting';
import { AppRoute } from '../../const';
import { useLocation } from 'react-router-dom';
import { tasks, users } from '../../store';
import Task from '../task/task';
import { observer } from 'mobx-react-lite';
import Pagination from '../pagination/pagination';

const TaskBoard = observer( ({taskList}) => {
  const location = useLocation();
  //получаем всех пользователей
  const [userList,setUserList] = useState([...users.allUsers]);
  if (!userList.length){
    useEffect(() => {
      users.allUsersFetch().then(() => setUserList(users.allUsers))
    })
  }

  return (
  <>
    {location.pathname === AppRoute.MAIN && <Sorting />}

    <div className="task_list">
      {taskList  ? taskList.map(event => <Task event={event} userList={userList} key={event.id} />) : <p style={{height: "25px"}}>"Нет совпадений"</p>}
    </div>


    <Pagination item={tasks} />
  </>
  )
});

export default TaskBoard;
