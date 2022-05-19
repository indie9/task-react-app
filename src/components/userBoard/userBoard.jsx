import React from 'react';
import { users } from '../../store';
import { observer } from 'mobx-react-lite';
import Pagination from '../pagination/pagination';
import { Link } from 'react-router-dom';

const UserBoard = observer(() => {

  const usersList = users.data;
  if ( !usersList[0]){users.fetch().then(() => console.log(users.usersList))}
  return (
   <>
    <div className="task_list">
        {usersList.length ?  usersList.map(item => <div className="userItem" key={item.id}><Link to={`/profile/${item.id}`}>{item.username}</Link></div>) : "no users"}

    </div>
    <Pagination item={users} />
    </>
  )
});

export default UserBoard;
