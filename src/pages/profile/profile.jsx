import React from 'react';
import Header from '../../components/header/header';
import { useState } from 'react';
import Event from '../../components/event/event';
import { AppRoute } from '../../const.js';
import Title from '../../components/title/title';
import Task from '../../components/task/task';
import { tasks } from '../../store';
import { useParams } from 'react-router-dom';
import Bio from '../../components/bio/bio';
import { users } from '../../store';

const Profile = () => {
  const { id }= useParams();

  if (users.currentUserData.id !== id){
    console.log( users.currentUserData)
    users.takeProfile(id)
  }
  const [form, setForm] = React.useState(
  {
    ...users.currentUserData,
    "password": localStorage.getItem('userPass')
  })

  const handleFieldChange = (evt) => {
    const { name, value } = evt.target;
    setForm({ ...form, [name]: value})
  }

  const cancelModal = () => {
    const modal = document.getElementsByClassName("edit_profile_modal")[0];
    modal.classList.add("hidden");
  }

  const profileEdit = (evt) => {
    evt.preventDefault();
    console.log(form);
    users.editUser(form)
  }
  return (
    <>
      <Header />
      <section className="main__wrapper">
        <Title mode={'Profile'} />
        <div className="board">
          <Bio  />
        </div>
        <div className='edit_profile_modal hidden' >
          <div className='modal_board' onSubmit={profileEdit}>
              <div className="modal_board-title"> Редактирование пользователя</div>
              <form  className='modal_board-form' id='modal_form'>
                <label for="username" className='taskPage-title'>Имя пользователя</label>
                    <input
                      type="text"
                      className="board__input board__input--theme"
                      name="username"
                      value={form.username}
                      onChange={handleFieldChange}
                      required
                    />
                <label for="photoUrl" className='taskPage-title'>URL фотографии</label>
                    <input
                      type="text"
                      className="board__input board__input--theme"
                      name="photoUrl"
                      value={form.photoUrl}
                      onChange={handleFieldChange}
                      required
                    />
                <label for="about" className='taskPage-title'>О себе</label>
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
}

export default Profile;
