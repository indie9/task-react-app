import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.js';

const Main = () => {
  return (
    <>
      <div className="notfound">
      <p>УПС....  Ничего не найдено!</p>

      <Link to="/" className="notFoundButton">ДОМОЙ</Link>
      </div>
    </>

  )
}

export default Main;
