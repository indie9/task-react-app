import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Board from '../../components/board/board';
import Header from '../../components/header/header';
import { AppRoute } from '../../const';

const Archive = (props) => {

  return (
    <>
      <Header mode={AppRoute.ARCHIVE}/>
      <section className="main__wrapper">
       {/* <div> {ren()}</div>*/}
        <Board mode={AppRoute.ARCHIVE}/>
      </section>
    </>
  )
}

export default Archive;
