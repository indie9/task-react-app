import React from 'react';
import { useState } from 'react';
import Sorting from '../sorting/sorting';
import { AppRoute } from '../../const';
import { useLocation } from 'react-router-dom';
import { tasks } from '../../store';
import { users } from '../../store';
import Task from '../task/task';
import { observer } from 'mobx-react-lite';
import Pagination from '../pagination/pagination';
import { Link } from 'react-router-dom';

const UserBoard = observer(() => {
  const usersList = [...users.data]

  
  return (
   <>
    <div className="task_list">
        { usersList.map(item => <div className="userItem"><Link to={`/profile/${item.id}`}>{item.username}</Link></div>) }

    </div>
    <Pagination item={users} />
    </>
  )
});

export default UserBoard;
