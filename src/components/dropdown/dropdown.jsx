import React, { useState,useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { tasks } from "../../store";
import { typeEn } from "../../const";
import { dropContent } from "../../const";
import { users } from '../../store';

const Dropdown = observer( ({type,values,searchForm,setSearchForm}) => {

  //колличество выбраных пунктов
  const [count,setCount] = useState(0);
  if (tasks.preFiltredData.hasOwnProperty(type)){
    if (tasks.preFiltredData[type].length !== count){
      setCount(tasks.preFiltredData[type].length)
    }
  }
  //скрываем/показываем чекбокс
  const showCheckboxes = () => {
  let checkbox = document.getElementById(`checkboxes${type}`);
  let multisel = document.getElementById(`multiselect-${type}`);

  if (checkbox.style.display === "none"){
    multisel.classList.toggle('active-checkbox');
    checkbox.style.display = "flex"
  } else {
    multisel.classList.toggle('active-checkbox');
    checkbox.style.display = "none";
  }
  }

  //заполняем/редактируем форму сортировки
  const preFilter = (evt) => {
    evt.target.checked ? setCount(count + 1) : setCount(count - 1);
    evt.target.checked
    ?
    setSearchForm({...searchForm, [type]: [...searchForm[type],evt.target.value]})
    :
    setSearchForm({...searchForm, [type]: searchForm[type].filter(item => item != evt.target.value) })
  }

  useEffect(() => {
    const onClick = e => {
      const checkbox = document.getElementById(`checkboxes${type}`);
      const multisel = document.getElementById(`multiselect-${type}`);
      if (!checkbox.contains(e.target) && !multisel.contains(e.target) ){
        multisel.classList.remove('active-checkbox');
        checkbox.style.display = "none";
      }
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  });

  return (
      <div className="multiselect" id={`multiselect-${type}`}>
        <div className="multiselect-selectBox" onClick={showCheckboxes}>
          <select>
            <option>{count === 0 ? `${typeEn[type]}`: `${count} выбрано`}</option>
          </select>
          <div className="multiselect-overSelect"></div>
        </div>
        <div id={`checkboxes${type}`} className="checkboxes" style={{display: "none"}}>

            {/* Немного меняем логику для дропдауна с пользователями */}

            {type === "assignedUsers"
            ?
            Object.entries(values).map((item) => (
              <div className="checkbox" key={item[0]}>
                <input
                  className="custom-checkbox"
                  type="checkbox"
                  id={item[0]}
                  name={type}
                  value={item[0]}
                  onChange={preFilter}
                  />

                <label htmlFor={item[0]}>
                  {item[1]}
                </label>
              </div>
            ))
            :
            values.map((item) => (
              <div className="checkbox" key={item}>
                <input
                className="custom-checkbox"
                type="checkbox"
                id={item}
                name={type}
                value={item}
                onChange={preFilter}
                />

                <label htmlFor={item}>
                  {dropContent[item]}
                </label>
              </div>
            ))
            }
        </div>
      </div>
  );
});

export default Dropdown;
