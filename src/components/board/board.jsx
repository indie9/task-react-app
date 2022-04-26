import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Card from '../card/card';
import LoadMore from '../load-more/load-more';
import Sorting from '../sorting/sorting';
import { AppRoute } from '../../const';

import { useLocation } from 'react-router-dom';
import ClearArchive from '../cleararchive/clearArchive';


const Board = ({events}) => {

  const location = useLocation();
  const [step, setStep] = useState(5);
  const handleLoadMore = () => {
      events.length >= step ? setStep(step +2) : setStep(events.length);
  }


  return (
  <section className="board">
    {location.pathname !== AppRoute.ARCHIVE && <Sorting /> }
    <div className="board__events">
      {events.slice(0,step).map(event => <Card event={event} key={event._id} />)}
      <LoadMore handleLoadMore={handleLoadMore} />
      {location.pathname === AppRoute.ARCHIVE && <ClearArchive />}
    </div>

  </section>
  )
}

export default Board;
