import React from 'react';
import Header from '../../components/header/header';
import Filter from '../../components/filter/filter';
import Board from '../../components/board/board';
import TaskBoard from '../../components/taskBoard/taskBoard';
import Title from '../../components/title/title';
import { AppRoute } from '../../const.js';
import { events } from '../../store';
import { observer } from 'mobx-react-lite';

const Main = observer(() => {

  const { filtredData } = events;


  return (
    <>
      <Header />
      <section className="main__wrapper">
        <Title />
        <TaskBoard />

      </section>
    </>

  )
});

export default Main;
