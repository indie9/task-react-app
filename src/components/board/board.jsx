import React from 'react';
import Card from '../card/card';
import LoadMore from '../load-more/load-more';
import Sorting from '../sorting/sorting';
import { AppRoute } from '../../const';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useLocation } from 'react-router-dom';


const Board = () => {

  const location = useLocation();

  return (
  <section className="board">
    {location.pathname === AppRoute.ARCHIVE ? <></> : <Sorting />}
    <div className="board__events">
      <Card />
      <LoadMore />

    </div>

  </section>
  )
}

export default Board;
