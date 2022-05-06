import React from 'react';
import Main from '../../pages/main/main';
import Profile from '../../pages/profile/profile';
import Unfoud from '../../pages/unfound/unfoud';
import Login from '../../pages/login/login';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import { observer } from 'mobx-react-lite';
import Header from '../header/header';
import { tasks } from '../../store';
import Form from '../../pages/form/form';
import TaskPage from '../../pages/taskpage/taskpage';
import '../../scss/root.scss'
import Users from '../../pages/users/users';
import { users } from '../../store';

const App = observer(() => {
  //localStorage.clear();
  const loginFlag = localStorage.getItem('userId');
  if (loginFlag){
    users.takeUser(loginFlag)
  }
  return (
    <BrowserRouter>
      {loginFlag ? 
      <Switch>
        
        <Route path={AppRoute.MAIN} exact>
          <Main />
        </Route>

        <Route path={AppRoute.TASK} exact  >
          <TaskPage />
        </Route>

        <Route path={AppRoute.EDIT_TASK} exact  >
          <Form  />
        </Route>

        <Route path={AppRoute.USERS} exact>
          <Users />
        </Route>

        <Route path={AppRoute.PROFILE} exact>
          <Profile />
        </Route>

        <Route>
          <Unfoud />
        </Route>
      </Switch >
      :
      <Route>
          <Login />
      </Route>
      }
    </BrowserRouter>
  )
});

export default App;
