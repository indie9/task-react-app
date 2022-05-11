import React from "react";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import { tasks } from '../../store';
import { users } from "../../store";

import { observer } from "mobx-react-lite";

import TaskBoard from "../taskBoard/taskBoard";


const Bio = observer( () =>{

      const profile = {...users.currentUserData};
      
      if (!(JSON.stringify(tasks.preFiltredData) === JSON.stringify({"assignedUsers":[ profile.id] }))){
        tasks.filterOn({"assignedUsers":[ profile.id] });
      }
    
    return (
        <section className="board__profile" >
            <article className="board__profile-bio" >
                <img className={`avatar`} src={`${profile.photoUrl ? profile.photoUrl : 'https://cdn-icons-png.flaticon.com/512/18/18601.png' }`} alt="avatar" width={186} height={186} />

                <p className="title">О себе</p>

                <p className="profile-info">
                    {profile.about}
                </p>

            </article>
            <article className="board__profile-tasks" >
                <p className="title"> Задачи </p>
                <TaskBoard taskList={tasks.filtredData} />
            </article>
        </section>
    )});

export default Bio;
