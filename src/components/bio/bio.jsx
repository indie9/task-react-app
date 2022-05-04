import React from "react";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import moment from "moment";
import { tasks } from '../../store';
import { AppRoute } from "../../const"
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Dropdown from "../dropdown/dropdown";
import TaskBoard from "../taskBoard/taskBoard";
const Bio = observer( () =>{

      const { id }= useParams();

      const taskData = ( id ? tasks.data.filter(item => item._id === id)[0] : {autor:'',type:'',name: '', priority:'',text:''});


    return (
        <section className="board__profile" >
            <article className="board__profile-bio" >
                <img className={`avatar`} src="https://upload.wikimedia.org/wikipedia/ru/d/d9/Vin_Diesel_as_Groot.jpeg?20210722164205" alt="" width={186} height={186} />
                
                <p className="title">О себе</p>

                <p className="profile-info">
                    Lorem ipsum dolor. 
                    Sit amet consectetur elit.
                    Cumque magni deleniti.   
                </p>

            </article>
            <article className="board__profile-tasks" >
                <p className="title"> Задачи </p>
                <TaskBoard tasks={tasks.data.filter(item => item.autor == "Kolya")} />
            </article>
        </section>
    )});

export default Bio;
