import React from 'react';
import { users } from '../../store';
import { observer } from 'mobx-react-lite';
import Pagination from '../pagination/pagination';
import { Link } from 'react-router-dom';

const UserBoard = observer(() => {

  const usersList = [...users.data]

  return (
   <>
    <div className="task_list">
        { usersList.map(item => <div className="userItem" key={item.id}><Link to={`/profile/${item.id}`}>{item.username}</Link></div>) }

    </div>
    <Pagination item={users} />
    </>
  )
});

export default UserBoard;
