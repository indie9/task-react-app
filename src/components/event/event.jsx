import React from "react";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import moment from "moment";
import { tasks } from '../../store';
import { AppRoute } from "../../const"
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Dropdown from "../dropdown/dropdown";

const Event = observer( () =>{

      const { id }= useParams();

      const taskData = ( id ? tasks.data.filter(item => item._id === id)[0] : {autor:'',type:'',name: '', priority:'',text:''});

      const [form, setForm] = React.useState({
        autor: taskData.autor,
        type: taskData.type,
        name: taskData.name,
        priority: taskData.priority,
        text: taskData.text
      })

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

            <div className="data">

                  <label for="autor" className='taskPage-title'>Исполнитель</label>
                  <select name="autor">
                    <option disabled selected>Исполнитель</option>
                    {[...new Set(tasks.data.map(item => item = item["autor"]))].map(item => <option selected={item == form.autor}> {item}</option>)}
                  </select>

                  <label for="type" className='taskPage-title'>Тип</label>
                  <select name="type">
                    <option disabled selected>Тип</option>
                    {[...new Set(tasks.data.map(item => item = item["type"]))].map(item => <option selected={item == form.type}> {item}</option>)}
                  </select>


                  <label for="priority" className='taskPage-title'>Приоритет</label>

                  <select name="priority">
                    <option disabled selected>Приоритет</option>
                    {[...new Set(tasks.data.map(item => item = item["priority"]))].map(item => <option selected={item == form.priority}> {item}</option>)}
                  </select>


            </div>
            <div className="info">
                  <label for="autor" className='taskPage-title'>Название</label>
                  <input
                    type="text"
                    className="board__input board__input--theme"
                    name="autor"
                    onChange={handleFieldChange}
                    value={form.name}
                    required
                  />
                  <label for="autor" className='taskPage-title'>Задача</label>
                  <textarea
                    type="text"
                    className="board__input board__input--theme"
                    name="autor"
                    onChange={handleFieldChange}
                    value={form.text}
                    required
                  > </textarea>

            </div>
            <div className="comments"></div>



          </form>
    )});

export default Event;
