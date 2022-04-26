import React from 'react';
import Card from '../card/card';
import LoadMore from '../load-more/load-more';
import Sorting from '../sorting/sorting';
import { AppRoute } from '../../const';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useLocation } from 'react-router-dom';
import ClearArchive from '../cleararchive/clearArchive';
import moment from 'moment';

const Board = ({events}) => {

  const location = useLocation();

  const [step, setStep] = React.useState(5);
  const [sortEvents, setSortEvents] = React.useState(events);
  const handleLoadMore = () => {
      events.length >= step ? setStep(step +2) : setStep(events.length);
  }

  const sorting = (evt) => {
    switch (evt.target.value){
      case 'default':   
        setSortEvents(events);
        break;
    
      case 'new':  
        setSortEvents(events.sort((a,b) => Date.parse(b.date) - Date.parse(a.date)))
        break;
      case 'old':  
        setSortEvents(events.sort((a,b) => Date.parse(a.date) - Date.parse(b.date)))
        break;
      
    }
  }

  return (
  <section className="board">
    {location.pathname !== AppRoute.ARCHIVE && 
        <div className="board__filter-list">
            <span className="board__filter--title">Сортировка:</span>
            <input
              type="radio"
              id="board__filter-default"
              className="board__filter visually-hidden"
              name="board-filter"
              onChange={sorting}
              value={"default"}
            />
            <label for="board__filter-default" className="board__filter-label">По умолчанию</label>
            <input
              type="radio"
              id="board__filter-new"
              className="board__filter visually-hidden"
              name="board-filter"
              onChange={sorting}
              value={"new"}
            />
            <label for="board__filter-new" className="board__filter-label">Сначала новые</label>
            <input
              type="radio"
              id="board__filter-old"
              className="board__filter visually-hidden"
              name="board-filter"
              onChange={sorting}
              value={"old"}
            />
            <label for="board__filter-old" className="board__filter-label">Сначала старые</label>
        </div>
      }
    <div className="board__events">
      {sortEvents.slice(0,step).map(event => <Card event={event} key={event._id} />)}
      <button className="load-more" type="button" onClick={handleLoadMore}>Загрузить еще</button>
      {location.pathname === AppRoute.ARCHIVE && <ClearArchive />}
    </div>

  </section>
  )
}

export default Board;
