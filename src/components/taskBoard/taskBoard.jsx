import React, { useState } from 'react';
import Sorting from '../sorting/sorting';
import { AppRoute } from '../../const';
import { useLocation } from 'react-router-dom';
import { tasks } from '../../store';
import Task from '../task/task';
import { observer } from 'mobx-react-lite';
import Pagination from '../pagination/pagination';
const TaskBoard = ({tasks}) => {
  const location = useLocation();
 
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
    setPage(tasks.length%8 == 0?  Math.floor(tasks.length/8) - 1 :  Math.floor(tasks.length/8) )
  }

  return (
  <>
    {location.pathname==AppRoute.MAIN && <Sorting setPage={setPage}/>}

    <div className="task_list">
      {tasks.slice(page*8,page*8+8).length  ? tasks.slice(page*8,page*8+8).map(event => <Task event={event}/>) : <p style={{height: "25px"}}>"Нет совпадений"</p>}
    </div>


    <Pagination startPage={startPage} prevPage={prevPage} nextPage={nextPage }endPage={endPage} page={page} pages={tasks} />
  </>
  )
};

export default TaskBoard;