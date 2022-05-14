import React from 'react';
import Header from '../../components/header/header';
import Event from '../../components/event/event';
import Title from '../../components/title/title';

const Form = () => {
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
