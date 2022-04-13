import React from 'react';
import Board from '../../components/board/board';
import Header from '../../components/header/header';
import { AppRoute } from '../../const';

const Archive = () => {
  return (
    <>
      <Header mode={AppRoute.ARCHIVE}/>
      <section class="main__wrapper">
        <Board />
      </section>
    </>
  )
}

export default Archive;
