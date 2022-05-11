import React, { useEffect,useState } from "react";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import moment from "moment";
import { tasks, users } from '../../store';
import { AppRoute } from "../../const"
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Dropdown from "../dropdown/dropdown";

const Event = observer( () =>{

      const { id } = useParams();

      const [userList,setUserList] = useState({});

      useEffect(() => {
        users.allUsersFetch().then(() => setUserList(users.allUsers))
      })


      const [form, setForm] = React.useState(
        id
        ?
        {...tasks.currentTask}
        :
        {
          assignedId: "",
          dateOfCreation: new Date(),
          dateOfUpdate: new Date(),
          description: "",
          rank: "",
          status: "opened",
          timeInMinutes: 0,
          title: "",
          type: "",
          userId: users.profileData.id
      }
      )
      if (!form.id && id){
        tasks.getTask(id).then(() => setForm({...tasks.currentTask}) )
      }

      const handleFieldChange = (evt) => {
        const { name, value } = evt.target;
        setForm({ ...form, [name]: value})
      }

      const handleToEdit = (evt) => {
        console.log("edit");
        evt.preventDefault();
        tasks.addTask(form)
        .then(() => window.location.href = '/')
      }
      const addEvent = (evt) => {
        console.log("add");
        evt.preventDefault();
        tasks.addTask(form)
        .then(() => window.location.href = '/')
      }


    return (
        <form className="board__form" onSubmit={id ? handleToEdit : addEvent } id="taskFormID">

            <div className="board__form-data">

                  <label for="user" className='taskPage-title'>Исполнитель</label>

                  <select name="assignedId" onChange={handleFieldChange}>
                    <option disabled selected>Исполнитель</option>
                    {Object.keys(userList).map(item => <option selected={item === form.assignedId} value={item}> {userList[item]}  </option>)}
                  </select>

                  <label for="type" className='taskPage-title'>Тип</label>

                  <select name="type" onChange={handleFieldChange}>
                    <option disabled selected>Тип</option>
                    <option selected={form.type == "task"} value={"task"} > Задача</option>
                    <option selected={form.type == "bug"} value={"bug"} > Ошибка</option>
                  </select>


                  <label for="rank" className='taskPage-title'>Приоритет</label>

                  <select name="rank" onChange={handleFieldChange}>
                    <option disabled selected>Приоритет</option>
                    <option selected={form.rank == "low"} value={"low"}> Низкий</option>
                    <option selected={form.rank == "medium"} value={"medium"}> Средний</option>
                    <option selected={form.rank == "high "} value={"high"}> Высокий</option>

                  </select>


            </div>
            <div className="board__form-info">
                  <label for="title" className='taskPage-title'>Название</label>
                  <input
                    type="text"
                    className="board__input board__input--theme"
                    name="title"
                    onChange={handleFieldChange}
                    value={form.title}
                    required
                  />
                  <label for="description" className='taskPage-title'>Задача</label>
                  <textarea
                    type="text"
                    className="board__input board__input--theme"
                    name="description"
                    onChange={handleFieldChange}
                    value={form.description}
                    required
                  > </textarea>

            </div>
            <div className="board__form-comments"></div>



          </form>
    )});

export default Event;
