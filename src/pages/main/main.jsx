import React from 'react';
import Header from '../../components/header/header';

import TaskBoard from '../../components/taskBoard/taskBoard';
import Title from '../../components/title/title';
import { tasks } from '../../store';
import { observer } from 'mobx-react-lite';

const Main = observer(() => {

  return (
    <>
      <Header />
      <section className="main__wrapper">

        <Title />
        <section className='board'>
          <TaskBoard taskList={tasks.filtredData} />
        </section>

      </section>
    </>

  )
});

export default Main;
