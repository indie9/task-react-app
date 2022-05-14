import React from "react";
import { useState, useEffect } from "react";
import { tasks, users } from '../../store';
import { observer } from "mobx-react-lite";
import TaskBoard from "../taskBoard/taskBoard";


const Bio = observer( ({currentTaskList}) =>{
    //данные текущего профиля
    const profile = {...users.currentUserData};

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
                <TaskBoard taskList={currentTaskList} />
            </article>
        </section>
    )});

export default Bio;
