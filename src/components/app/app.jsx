import React from 'react';
import Main from '../../pages/main/main';
import Archive from '../../pages/archive/archive';
import Event from '../../pages/form/form';
import Unfoud from '../../pages/unfound/unfoud';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import { observer } from 'mobx-react-lite';

import Header from '../header/header';
import { events } from '../../mocks';
import Form from '../../pages/form/form';
import TaskPage from '../../pages/taskpage/taskpage';

const App = observer(() => {
  const { data } = events;
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>

        <Route path={AppRoute.TASK} exact  >
          <TaskPage />
        </Route>

        <Route path={AppRoute.EDIT_TASK} exact  >
          <Form  />
        </Route>

        <Route>
          <Unfoud />
        </Route>
      </Switch >
    </BrowserRouter>
  )
});

export default App;
