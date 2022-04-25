import { observer } from 'mobx-react-lite';
import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Board from '../../components/board/board';
import Header from '../../components/header/header';
import { AppRoute } from '../../const';
import { events } from '../../store';

const Archive = observer(() => {
  const { archiveData } = events;
 
  return (
    <>
      <Header mode={AppRoute.ARCHIVE}/>
      <section className="main__wrapper">
        <Board mode={AppRoute.ARCHIVE} events={archiveData}/>
        
      </section>
    </>
  )
});

export default Archive;
