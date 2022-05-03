import React, { useState } from 'react';
import Sorting from '../sorting/sorting';
import { AppRoute } from '../../const';
import { useLocation } from 'react-router-dom';
import { tasks } from '../../store';
import Task from '../task/task';
import { observer } from 'mobx-react-lite';

const TaskBoard = ({tasks}) => {

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
    <Sorting setPage={setPage}/>

    <div className="task_list">
      {tasks.slice(page*8,page*8+8).length  ? tasks.slice(page*8,page*8+8).map(event => <Task event={event}/>) : <p style={{height: "25px"}}>"Нет совпадений"</p>}
    </div>

    <div className="pag_buttons">

      <button
        className='btn default'
        onClick={startPage}
        disabled={page == 0}
      > {'Начало'} </button>

      <button
        className='btn default'
        onClick={prevPage}
        disabled={page == 0}
      > {'Назад'} </button>

      <button  className=' btn primary' >{page + 1}</button>

      <button
        className='btn default'
        onClick={nextPage}
        disabled={Math.floor(tasks.length / 8) < page+1 || tasks.length-(page+1)*8 == 0}
      > {'Вперед'} </button>

      <button
        className='btn default'
        onClick={endPage}
        disabled={Math.floor(tasks.length / 8) < page+1 || tasks.length-(page+1)*8 == 0}
      > {'Конец'} </button>
    </div>
  </>
  )
};

export default TaskBoard;
