import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { tasks } from "../../store/index";
import { action } from "mobx"
import Dropdown from "../dropdown/dropdown";
import { users } from "../../store/index"

const Sorting = observer( ({setPage}) =>{
  //const userList = users.usersList;
  const [form,setForm] = useState({type:[],query: "" , assignedUsers:[],status:[],rank:[]});
  const handlChange = (ev) => {
    setForm({...form, query: ev.target.value})}
  const userList = {...users.usersList}
  const subm = action((evt) => {
    evt.preventDefault();
    let mults = document.getElementsByClassName("multiselect");
    let boxes = document.getElementsByClassName("checkboxes");
    for( let i = 0; i < boxes.length; i++){
      boxes[i].style.display = "none";
      mults[i].classList.remove("active-checkbox")
    }
    setPage(0);
    console.log(form);
    tasks.filterOn(form);

  })


    return(
          <form className="sorting_list" onSubmit={subm}>

            <div class="sorting_item sort-type">
               <Dropdown type={"type"} values={["task","bug"]} searchForm={form} setSearchForm={setForm} />
            </div>

            <input
              type = "text"
              placeholder = "Задача"
              className = "sorting_item sort-name"
              onChange = {handlChange}
              value = {form.query}
            />

            <div class="sorting_item sort-autor">
            <Dropdown type={"assignedUsers"} values={userList} searchForm={form} setSearchForm={setForm}/>
            </div>

            <div className="sorting_item sort-status">
            <Dropdown type={"status"} values={[ "opened", "inProgress", "testing", "complete" ]} searchForm={form} setSearchForm={setForm} />
            </div>

            <div className="sorting_item sort-priority">
            <Dropdown type={"rank"} values={[ "low", "medium", "high" ]} searchForm={form} setSearchForm={setForm} />
            </div>

            <button className="btn primary sort-btn"  type="submit"> Применить </button>
          </form>

    )});

export default Sorting;
