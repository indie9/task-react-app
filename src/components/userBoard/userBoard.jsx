import React from 'react';
import Sorting from '../sorting/sorting';
import { AppRoute } from '../../const';
import { useLocation } from 'react-router-dom';
import { tasks } from '../../store';
import Task from '../task/task';
import { observer } from 'mobx-react-lite';

const UserBoard = observer(() => {

  return (

    <div className="task_list">
        {
        tasks.data.map(item => item = item["autor"]).map(item => <div className="userItem">{item}</div>)}
    </div>


  )
});

export default UserBoard;
