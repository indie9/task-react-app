import React from "react";

import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const Event = () =>{

    const { id }= useParams();

    return (
        <form className="board__form">
            <h2 className="board__title">{id ? 'Редактирование события' : 'Добавление события' }</h2>
            <fieldset className="board__field board__field--theme">
              <label for="theme" className="board__label board__label--theme">Тема:</label>
              <textarea
                type="text"
                className="board__input board__input--theme"
                name="theme"
                required
              ></textarea>
            </fieldset>
            <fieldset className="board__field board__field--comment">
              <label for="comment" className="board__label board__label--comment">Комментарий:</label>
              <textarea
                type="text"
                className="board__input board__input--comment"
                name="comment"
                required
              ></textarea>
            </fieldset>
            <fieldset className="board__field board__field--date">
              <label for="date" className="board__label board__label--date">Дата:</label>
              <input
                type="datetime-local"
                className="board__input board__input--date"
                name="date"
              />
            </fieldset>
            <div className="btns">
              <button type="submit" className="btn-submit">{id ? 'Сохранить' : 'Добавить' }</button>
              <button type="reset" className="btn-reset">Очистить</button>
            </div>
          </form>
    )};

export default Event;
