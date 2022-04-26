import React from "react";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import moment from "moment";
import "moment/locale/ru";
import { events } from "../../store";
import { AppRoute } from "../../const"
import { useHistory } from "react-router-dom";

const Event = () =>{

      const { id }= useParams();

      const cardData = ( id ? events.data.filter(item => item._id === id)[0] : {theme:'',comment:'',date: new Date()});

      const formateDate = moment(cardData.date).format("YYYY-MM-DDTkk:mm");

      const [form, setForm] = React.useState({
        theme: `${cardData.theme}`,
        comment: `${cardData.comment}`,
        date: `${formateDate}`,
        favorite: cardData.favorite,
        archive: cardData.archive,
      })
      console.log(form);
      const handleFieldChange = (evt) => {
        const { name, value } = evt.target;
        setForm({ ...form, [name]: value})
      }
      const handleClear = () => {
        setForm( {theme:'',comment:'',date: formateDate})
      }


      const handleToEdit = (evt) => {
        console.log("edit");

        evt.preventDefault();
        events.editEvent({
          id: cardData._id,
          theme: form.theme,
          comment: form.comment,
          date: form.date,
          favorite: form.favorite,
          archive: form.archive,
        }).then(() => document.location.href = AppRoute.MAIN);
      }
      const addEvent = (evt) => {
        console.log("add");
        evt.preventDefault();
        events.addEvent({
          id: cardData._id,
          theme: form.theme,
          comment: form.comment,
          date: form.date,
        }).then(() => document.location.href = AppRoute.MAIN);
      }

    return (
        <form className="board__form" onSubmit={id ? handleToEdit : addEvent }>
            <h2 className="board__title">{id ? 'Редактирование события' : 'Добавление события' }</h2>
            <fieldset className="board__field board__field--theme">
              <label for="theme" className="board__label board__label--theme">Тема:</label>
              <textarea
                type="text"
                className="board__input board__input--theme"
                name="theme"
                onChange={handleFieldChange}
                value={form.theme}
                required
              > </textarea>
            </fieldset>
            <fieldset className="board__field board__field--comment">
              <label for="comment" className="board__label board__label--comment">Комментарий:</label>
              <textarea
                type="text"
                className="board__input board__input--comment"
                name="comment"
                onChange={handleFieldChange}
                value={form.comment}
                required
              ></textarea>
            </fieldset>
            <fieldset className="board__field board__field--date">
              <label for="date" className="board__label board__label--date">Дата:</label>
              <input
                type="datetime-local"
                className="board__input board__input--date"
                name="date"
                value={form.date}
                onChange={handleFieldChange}
              />
            </fieldset>
            <div className="btns">
              <button
              type="submit"
              className="btn-submit"
              >{id ? 'Сохранить' : 'Добавить' }</button>
              <button
              type="reset"
              className="btn-reset"
              onClick={handleClear}
              >Очистить</button>
            </div>
          </form>
    )};

export default Event;
