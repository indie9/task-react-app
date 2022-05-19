import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { tasks, users } from "../../store/index";
import { action } from "mobx"
import Dropdown from "../dropdown/dropdown";


const Sorting = observer( () =>{
  //форма для отправки на сортировку
  const [form,setForm] = useState({type:[],query: "" , assignedUsers:[],status:[],rank:[]});
  //заполняем форму
  const handlChange = (ev) => {setForm({...form, query: ev.target.value})}
  //список всех пользователей
  const [userList,setUserList] = useState({});
  useEffect(() => {
    if ( !userList[0]){
      users.allUsersFetch().then(() => setUserList(users.allUsers));
    }
  })

  //отправляем форму
  const subm = action((evt) => {
    evt.preventDefault();
    //прячем чекбоксы
    let mults = document.getElementsByClassName("multiselect");
    let boxes = document.getElementsByClassName("checkboxes");
    for( let i = 0; i < boxes.length; i++){
      boxes[i].style.display = "none";
      mults[i].classList.remove("active-checkbox")
    }
    //фильтруем
    tasks.preFiltredData = form;
    tasks.fetch();
  })

  //скидываем форму
  const resetForm = action((evt) => {
    evt.preventDefault();

    let mults = document.getElementsByClassName("multiselect");
    let boxes = document.getElementsByClassName("checkboxes");
    for( let i = 0; i < boxes.length; i++){
      boxes[i].style.display = "none";
      mults[i].classList.remove("active-checkbox")
    }
    //обновляем поля формы
    tasks.filterOn({type:[],query: "" , assignedUsers:[],status:[],rank:[]});
    setForm( {type:[],query: "" , assignedUsers:[],status:[],rank:[]} )

    document.getElementsByClassName('sorting_list')[0].reset();

    //чекбоксы ставим в положение выключено
    const customCheckboxes = document.getElementsByClassName('custom-checkbox');
     for (let i = 0; i < customCheckboxes.length; i ++){
       customCheckboxes[i].checked = false;
     }
  })

    return(
          <form className="sorting_list" onSubmit={subm} onReset={resetForm} >

            <div className="sorting_item sort-type">
               <Dropdown type={"type"} values={["task","bug"]} searchForm={form} setSearchForm={setForm} />
            </div>

            <input
              type = "text"
              placeholder = "Задача"
              className = "sorting_item sort-name"
              onChange = {handlChange}
              value = {form.query}
            />

            <div className="sorting_item sort-autor">
            <Dropdown type={"assignedUsers"} values={userList} searchForm={form} setSearchForm={setForm}/>
            </div>

            <div className="sorting_item sort-status">
            <Dropdown type={"status"} values={[ "opened", "inProgress", "testing", "complete" ]} searchForm={form} setSearchForm={setForm} />
            </div>

            <div className="sorting_item sort-priority">
            <Dropdown type={"rank"} values={[ "low", "medium", "high" ]} searchForm={form} setSearchForm={setForm} />
            </div>

            <button className="btn primary sort-btn"  type="submit"> Применить </button>
            <button className="btn error sort-btn-rest"  type="reset"> &#8635; </button>
          </form>

    )});

export default Sorting;
