import React from 'react';
import Header from '../../components/header/header';
import { useState } from 'react';
import Title from '../../components/title/title';
import { tasks } from '../../store';
import { useParams } from 'react-router-dom';
import Bio from '../../components/bio/bio';
import { users } from '../../store';
import { useEffect } from 'react';
import { action } from "mobx";
import * as _ from 'lodash';
import { observer } from 'mobx-react-lite';

const Profile =observer( () => {

  const { id }= useParams();
  //форма редактирования профиля
  const [form, setForm] = React.useState({...users.currentUserData});

  //список задач текущего пользователя
  const [currentTaskList,setCurrentTaskList] = useState([...tasks.filtredData]);
  //обновляем список задач
  useEffect(() => {


    //проверяем тот ли фильтр применен
    if ((JSON.stringify(tasks.preFiltredData) !== JSON.stringify({"assignedUsers": [id] }))){
      tasks.filterOn({"assignedUsers": [id]});
      tasks.fetch().then(() => setCurrentTaskList(tasks.filtredData))
    }

    if (!_.isEqual(tasks.filtredData,currentTaskList)){
      setCurrentTaskList(tasks.filtredData);
    }

  })

  //получаем профиль юзуеря соответсвующего ид
  if (users.currentUserData.id !== id){
    users.takeProfile(id)
    .then(() => setForm({...users.currentUserData}));
  }

  const handleFieldChange = (evt) => {
    const { name, value } = evt.target;
    setForm({ ...form, [name]: value})
  }
  //прячем модалку
  const cancelModal = () => {
    const modal = document.getElementsByClassName("edit_profile_modal")[0];
    modal.classList.add("hidden");
  }
  //редактируем профиль
  const profileEdit = action((evt) => {
    evt.preventDefault();
    users.editUser({...form,"password": localStorage.getItem('userPass')})
    .then(() => {
      users.takeProfile(id)
      .then(() => {
        setForm({...users.currentUserData})
        tasks.filterOn({"assignedUsers": [id]});
        tasks.fetch().then(() => setCurrentTaskList(tasks.filtredData))
      })
    })
    cancelModal();
  });


  return (
    <>
      <Header />
      <section className="main__wrapper">
        <Title />
        <div className="board">
          <Bio currentTaskList={currentTaskList}/>
        </div>
        <div className='edit_profile_modal hidden' >
          <div className='modal_board' onSubmit={profileEdit}>
              <div className="modal_board-title"> Редактирование пользователя</div>
              <form  className='modal_board-form' id='modal_form'>
                <label htmlFor="username" className='taskPage-title'>Имя пользователя</label>
                    <input
                      type="text"
                      className="board__input board__input--theme"
                      name="username"
                      value={form.username}
                      onChange={handleFieldChange}
                      required
                    />
                <label htmlFor="photoUrl" className='taskPage-title'>URL фотографии</label>
                    <input
                      type="text"
                      className="board__input board__input--theme"
                      name="photoUrl"
                      value={form.photoUrl}
                      onChange={handleFieldChange}
                      required
                    />
                <label htmlFor="about" className='taskPage-title'>О себе</label>
                    <textarea
                      type="text"
                      className="board__input board__input--theme"
                      name="about"
                      value={form.about}
                      onChange={handleFieldChange}
                      required
                    > </textarea>
              </form>
              <div className="modal_board-buttons">
                <button className='btn primary' form={'modal_form'} type="submit" > Сохранить </button>
                <button className='btn default' onClick={cancelModal}> Отмена </button>
              </div>

          </div>
        </div>
      </section>
    </>

  )
});

export default Profile;
