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
      <Header mode={"login"}/>
      <section className="main__wrapper">
        
          <form onSubmit={LoginSend} className="login_window" >
            <p>Авторизация</p>
            <label for="login" className='title'>Логин</label>
            <input type="text" placeholder='Логин' value={form.login} name="login" onChange={handleForm} />
            <label for="password" className='title'>Пароль</label>
            <input type="password" placeholder='Пароль' value={form.password} name="password" onChange={handleForm} />
            <button className='btn success' type='submit'>Вход</button>
          </form>
         
    

      </section>
    </>

  )
});

export default Login;
