import React, { useState } from 'react';
import Header from '../../components/header/header';

import TaskBoard from '../../components/taskBoard/taskBoard';
import Title from '../../components/title/title';
import { AppRoute } from '../../const.js';
import { tasks } from '../../store';
import { observer } from 'mobx-react-lite';
import { userpofile } from '../../store';
import { users } from '../../store';

const Login = observer(() => {

  const LoginSend = (evt) => {
    evt.preventDefault();
    users.getLogin(form)
    .then(() => document.location.href = AppRoute.MAIN);
  }
  const [form,setForm] = useState({
    "login": "",
    "password":""
  })
  const handleForm = (evt) =>{
    const { name, value } = evt.target;
    setForm({ ...form, [name]: value}) 
  }
  
  return (
    <>
      <Header />
      <section className="main__wrapper">
        <section className='board'>
          <form onSubmit={LoginSend}>
            <input type="text" placeholder='Login' value={form.login} name="login" onChange={handleForm} />
            <input type="password" placeholder='Password' value={form.password} name="password" onChange={handleForm} />
            <button className='btn success' type='submit'>Вход</button>
          </form>
         
        </section>

      </section>
    </>

  )
});

export default Login;
