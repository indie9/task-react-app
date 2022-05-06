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

const UserBoard = observer(() => {
  const usersList = [...users.data]
  console.log(usersList)
  const [page,setPage] = useState(0);
  const startPage = () => {
    setPage(0)
  }
  const prevPage = () => {
    setPage(page - 1)
  }
  const nextPage = () => {

    setPage(page + 1)
  }
  const endPage = () => {
    setPage(usersList.length%8 == 0 ?  Math.floor(usersList.length/8) - 1 :  Math.floor(usersList.length/8) )
  }
  return (
   <>
    <div className="task_list">
        { usersList.map(item => <div className="userItem">{item.username}</div>) }
        
    </div>
    <Pagination startPage={startPage} prevPage={prevPage} nextPage={nextPage }endPage={endPage} page={page} pages={users} />
    </>
  )
});

export default UserBoard;
