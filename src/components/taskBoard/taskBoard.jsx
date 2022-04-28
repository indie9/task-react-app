import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Card from '../card/card';
import LoadMore from '../load-more/load-more';
import Sorting from '../sorting/sorting';
import { AppRoute } from '../../const';
import { useLocation } from 'react-router-dom';
import ClearArchive from '../cleararchive/clearArchive';
import { events } from '../../mocks';
import Task from '../task/task';

const TaskBoard = () => {

  return (
  <section className="task_board">
    <Sorting />
    <div className="task_list">
      <Task event={events[0]}/>
      <Task event={events[1]}/>
    </div>

  </section>
  )
}

export default TaskBoard;
