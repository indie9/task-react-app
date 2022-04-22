import React from 'react';
import Header from '../../components/header/header';
import Filter from '../../components/filter/filter';
import Event from '../../components/event/event';
import { AppRoute } from '../../const.js';

const Form = ({events}) => {

  return (
    <>
      <Header />
      <section className="main__wrapper">
        <Filter />
        <Event events={events} />
      </section>
    </>

  )
}

export default Form;
