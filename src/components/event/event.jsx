import React, { useEffect,useState } from "react";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { tasks, users } from '../../store';
import { observer } from "mobx-react-lite";


const Event = observer( () =>{
      //ид задачи
      const { id } = useParams();
      //список всех пользователей
      const [userList,setUserList] = useState({});

      //если список пустой - заполняем
      useEffect(() => {
        if ( !userList[0]){
          users.allUsersFetch().then(() => setUserList(users.allUsers))
        }
      })

      //форма редактирования
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
      })

      //в случае если форма редактируется заполняем поля формы значениями текущей задачи
      if (!form.id && id){
        tasks.getTask(id).then(() => setForm({...tasks.currentTask}) )
      }
      //заполняем форму
      const handleFieldChange = (evt) => {
        const { name, value } = evt.target;
        setForm({ ...form, [name]: value})
      }

      //отправляем запрос на изменение задачи и переходим на главную
      const handleToEdit = (evt) => {
        evt.preventDefault();
        tasks.addTask(form)
        .then(() => window.location.href = '/')
      }

      //отправляем запрос на добавление задачи и переходим на главную
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
                    {Object.keys(userList).map(item => <option selected={item === form.assignedId} value={item} key={item} > {userList[item]}  </option>)}
                  </select>

                  <label htmlFor="type" className='taskPage-title'>Тип</label>

                  <select name="type" onChange={handleFieldChange}>
                    <option disabled selected>Тип</option>
                    <option selected={form.type == "task"} value={"task"} > Задача</option>
                    <option selected={form.type == "bug"} value={"bug"} > Ошибка</option>
                  </select>


                  <label htmlFor="rank" className='taskPage-title'>Приоритет</label>

                  <select name="rank" onChange={handleFieldChange}>
                    <option disabled selected>Приоритет</option>
                    <option selected={form.rank == "low"} value={"low"}> Низкий</option>
                    <option selected={form.rank == "medium"} value={"medium"}> Средний</option>
                    <option selected={form.rank == "high "} value={"high"}> Высокий</option>

                  </select>


            </div>
            <div className="board__form-info">
                  <label htmlFor="title" className='taskPage-title'>Название</label>
                  <input
                    type="text"
                    className="board__input board__input--theme"
                    name="title"
                    onChange={handleFieldChange}
                    value={form.title}
                    required
                  />
                  <label htmlFor="description" className='taskPage-title'>Задача</label>
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
