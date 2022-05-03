import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { tasks } from "../../store/index";
import { action } from "mobx"
import Dropdown from "../dropdown/dropdown";

const Sorting = observer( ({setPage}) =>{

  const [form,setForm] = useState({type:[],autor:[],status:[],priority:[]});

  const subm = (evt) => {
    evt.preventDefault();
    let mults = document.getElementsByClassName("multiselect");
    let boxes = document.getElementsByClassName("checkboxes");
    for( let i = 0; i < boxes.length; i++){
      boxes[i].style.display = "none";
      mults[i].classList.remove("active-checkbox")
    }
    setPage(0);
    tasks.filterOn(form);
  }


    return(
          <form className="sorting_list" onSubmit={subm}>

            <div class="sorting_item sort-type">
               <Dropdown type={"type"} values={[...new Set(tasks.data.map(item => item = item["type"]))]} searchForm={form} setSearchForm={setForm} />
            </div>

            <input
              type="text"
              placeholder="Задача"
              className="sorting_item sort-name"
            />

            <div class="sorting_item sort-autor">
            <Dropdown type={"autor"} values={[...new Set(tasks.data.map(item => item = item["autor"]))]} searchForm={form} setSearchForm={setForm}/>
            </div>

            <div className="sorting_item sort-status">
            <Dropdown type={"status"} values={[...new Set(tasks.data.map(item => item = item["status"]))]} searchForm={form} setSearchForm={setForm} />
            </div>

            <div className="sorting_item sort-priority">
            <Dropdown type={"priority"} values={[...new Set(tasks.data.map(item => item = item["priority"]))]} searchForm={form} setSearchForm={setForm} />
            </div>

            <button className="btn primary sort-btn"  type="submit"> Применить </button>
          </form>

    )});

export default Sorting;
