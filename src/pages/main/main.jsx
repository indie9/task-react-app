import React from 'react';
import Header from '../../components/header/header';
import Filter from '../../components/filter/filter';
import Board from '../../components/board/board';
import { AppRoute } from '../../const.js';

const Main = ({events}) => {
  return (
    <>
      <Header mode={AppRoute.MAIN}/>
      <section className="main__wrapper">
        <Filter />
        <Board events={events}/>

      </section>
    </>

  )
}

export default Main;
