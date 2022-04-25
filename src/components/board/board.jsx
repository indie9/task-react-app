import React from 'react';
import Card from '../card/card';
import LoadMore from '../load-more/load-more';
import Sorting from '../sorting/sorting';
import { AppRoute } from '../../const';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useLocation } from 'react-router-dom';
import ClearArchive from '../cleararchive/clearArchive';
const Board = ({events}) => {

  const location = useLocation();
 
  
  return (
  <section className="board">
    {location.pathname !== AppRoute.ARCHIVE && <Sorting />}
    <div className="board__events">
      {events.map(event => <Card {...event} key={event._id} />)}
      <LoadMore />
      {location.pathname === AppRoute.ARCHIVE && <ClearArchive />}
    </div>

  </section>
  )
}

export default Board;
