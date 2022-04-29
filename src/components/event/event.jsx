import React from "react";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import moment from "moment";
import "moment/locale/ru";
import { events } from "../../mocks";
import { AppRoute } from "../../const"
import { useHistory } from "react-router-dom";

const Event = () =>{

      const { id }= useParams();

      const cardData = ( id ? events.filter(item => item._id === id)[0] : {autor:'',type:'',name: '', priority:'',text:''});


      const [form, setForm] = React.useState({
        autor: cardData.autor,
        type: cardData.type,
        name: cardData.name, 
        priority: cardData.priority,
        text: cardData.text
      })
      console.log(form);
      const handleFieldChange = (evt) => {
        const { name, value } = evt.target;
        setForm({ ...form, [name]: value})
      }
      const handleClear = () => {
        setForm( {autor:'',type:'',name: '', priority:'',text:''})
      }

      const handleToEdit = (evt) => {
        console.log("edit");
        evt.preventDefault();
      }
      const addEvent = (evt) => {
        console.log("add");
        evt.preventDefault();

      }

    return (
        <form className="board__form" onSubmit={id ? handleToEdit : addEvent } id="formID">
            <h2 className="board__title">{id ? 'Редактирование события' : 'Добавление события' }</h2>
            <fieldset className="board__field board__field--theme">
              <label for="theme" className="board__label board__label--theme">Тема:</label>
              <textarea
                type="text"
                className="board__input board__input--theme"
                name="autor"
                onChange={handleFieldChange}
                value={form.autor}
                required
              > </textarea>
            </fieldset> 
          </form>
    )};

export default Event;
