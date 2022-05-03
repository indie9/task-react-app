import React from 'react';
import Header from '../../components/header/header';

import Event from '../../components/event/event';
import { AppRoute } from '../../const.js';
import Title from '../../components/title/title';
import Task from '../../components/task/task';
import { tasks } from '../../store';
import { useParams } from 'react-router-dom';
const Form = () => {
  const { id }= useParams();
  return (
    <>
      <Header />
      <section className="main__wrapper">
        <Title />
        <div className="board">
          <Event />
        </div>
      </section>
    </>

  )
}

export default Form;
