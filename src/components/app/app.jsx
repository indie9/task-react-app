import React from 'react';
import Main from '../../pages/main/main';
import Archive from '../../pages/archive/archive';
import Event from '../../pages/form/form';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import Unfoud from '../../pages/unfound/unfoud'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path={AppRoute.ARCHIVE} exact component={Archive} />

        <Route path={AppRoute.EVENT} exact component={Event} />
        <Route>
          <Unfoud />
        </Route>
      </Switch >
    </BrowserRouter>
  )
}

export default App;
