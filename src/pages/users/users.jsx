import React from 'react';
import Header from '../../components/header/header';

import TaskBoard from '../../components/taskBoard/taskBoard';
import Title from '../../components/title/title';
import { AppRoute } from '../../const.js';
import { tasks } from '../../store';
import { observer } from 'mobx-react-lite';
import UserBoard from '../../components/userBoard/userBoard';

const Users = observer(() => {



  return (
    <>
      <Header />
      <section className="main__wrapper">

        <Title />
        <section className="board">
          <UserBoard />
        </section>
      </section>
    </>

  )
});

export default Users;
