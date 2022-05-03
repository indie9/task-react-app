import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { tasks } from "../../store";

const Dropdown = ({type,values,searchForm,setSearchForm}) => {
  //колличество выбраных пунктов
  const [count,setCount] = useState(0);

  //скрываем/показываем чекбокс
  const showCheckboxes = () => {
  let checkbox = document.getElementById(`checkboxes${type}`);
  let multisel = document.getElementById(`multiselect-${type}`);
    if (checkbox.style.display == "none"){
      multisel.classList.toggle('active-checkbox');
      checkbox.style.display = "block"
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
        <div className="selectBox" onClick={showCheckboxes}>
          <select>
            <option>{count === 0 ? `${type}`: `${count} выбрано`}</option>
          </select>
          <div className="overSelect"></div>
        </div>
        <div id={`checkboxes${type}`} className="checkboxes" style={{display: "none"}}>
            {values.map((item) => (
              <label for={item}>
                <input
                type="checkbox"
                id={item}
                name={type}
                value={item}
                onChange={preFilter}
                />
                {item}
              </label>
            ))}
        </div>
      </div>
  );
};

export default Dropdown;
