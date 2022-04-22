import React from 'react';
import Main from '../../pages/main/main';
import Archive from '../../pages/archive/archive';
import Event from '../../pages/form/form';
import Unfoud from '../../pages/unfound/unfoud';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { AppRoute } from '../../const';


const App = ({events}) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Main events={events}/>
        </Route>
        <Route path={AppRoute.ARCHIVE} exact  >
          <Archive events={events} />
        </Route>
        <Route path={AppRoute.EVENT} exact  >
          <Event events={events}/>
        </Route>
        <Route>
          <Unfoud />
        </Route>
      </Switch >
    </BrowserRouter>
  )
}

export default App;
