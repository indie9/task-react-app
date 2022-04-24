import React from 'react';
import Main from '../../pages/main/main';
import Archive from '../../pages/archive/archive';
import Event from '../../pages/form/form';
import Unfoud from '../../pages/unfound/unfoud';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import { observer } from 'mobx-react-lite';
import { events } from '../../store';

const App = observer(() => {


  const { data } = events;
  console.log(data)
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Main events={data}/>
        </Route>
        <Route path={AppRoute.ARCHIVE} exact  >
          <Archive  />
        </Route>
        <Route path={AppRoute.EVENT} exact  >
          <Event events={data}/>
        </Route>
        <Route>
          <Unfoud />
        </Route>
      </Switch >
    </BrowserRouter>
  )
});

export default App;
