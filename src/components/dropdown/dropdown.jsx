import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { tasks } from "../../store";
import { users } from "../../store";
import { typeEn } from "../../const";
import { dropContent } from "../../const";

const Dropdown = ({type,values,searchForm,setSearchForm}) => {

  //колличество выбраных пунктов
  const [count,setCount] = useState(0);

  //скрываем/показываем чекбокс
  const showCheckboxes = () => {
  let checkbox = document.getElementById(`checkboxes${type}`);
  let multisel = document.getElementById(`multiselect-${type}`);
    if (checkbox.style.display == "none"){
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

  

  return (
      <div className="multiselect" id={`multiselect-${type}`}>
        <div className="multiselect-selectBox" onClick={showCheckboxes}>
          <select>
            <option>{count === 0 ? `${typeEn[type]}`: `${count} выбрано`}</option>
          </select>
          <div className="multiselect-overSelect"></div>
        </div>
        <div id={`checkboxes${type}`} className="checkboxes" style={{display: "none"}}>
            {type === "assignedUsers"
            ?
            Object.entries(values).map((item) => (
              <div className="checkbox">
                <input
                  className="custom-checkbox"
                  type="checkbox"
                  id={item[0]}
                  name={type}
                  value={item[0]}
                  onChange={preFilter}
                  />
                  
                <label for={item[0]}>
                  {item[1]}
                </label>
              </div>
            ))
            :
            values.map((item) => (
              <div className="checkbox">
                <input
                className="custom-checkbox"
                type="checkbox"
                id={item}
                name={type}
                value={item}
                onChange={preFilter}
                />
                
                <label for={item}>
                  {dropContent[item]}
                </label>
              </div>
            ))
            }
        </div>
      </div>
  );
};

export default Dropdown;
