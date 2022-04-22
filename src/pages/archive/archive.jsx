import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Board from '../../components/board/board';
import Header from '../../components/header/header';
import { AppRoute } from '../../const';

const Archive = ({events}) => {
  const archiveEvents = events.filter(event => event.archive);
  return (
    <>
      <Header mode={AppRoute.ARCHIVE}/>
      <section className="main__wrapper">
        <Board mode={AppRoute.ARCHIVE} events={archiveEvents}/>
      </section>
    </>
  )
}

export default Archive;
