import { computed, makeAutoObservable, onBecomeObserved } from "mobx";
import {  getTasks, getUsers, getAllUsers, userLogin, getUser, addTask,getTask, editUser, getComments,addComment, removeComment, addTime,changeStatus, deleteTask } from "../api";


class TasksStore {
  data = [];
  preFiltredData = {};
  filtredData = [];
  currentTask = {};
  currentComments = [];
  pagination = {limit:8, page:0, total:0};
  testTasks = [];
  constructor () {
    makeAutoObservable(this,{},{
      autoBind: true,
    })
    onBecomeObserved(this, 'filtredData', this.fetch);
  }

  async fetch(){
    const response = await getTasks(this.preFiltredData,this.pagination.page);
    this.filtredData = response.data;
    this.pagination.total = response.total;
    this.currentTask = {};

  }


  async addTask(data){
    await addTask(data);
    await this.fetch();
  }

  async getTask(id){
    const response = await getTask(id);
    this.currentTask = response;
    const res  = await getComments(this.currentTask.id)
    this.currentComments = res;
  }


  async deleteTask(id){
    await deleteTask(id);
    await this.fetch();
  }

  filterOn(form){
    this.preFiltredData = form;
    this.pagination.page = 0;
    //this.fetch();
  }


  removeTask (_id){
    this.data = this.data.filter(item => item._id !== _id);
  }
  async addComment(commentData){
    await addComment(commentData);
  }
  async removeComment(id){
    await removeComment(id);
    const res  = await getComments(this.currentTask.id);
    this.currentComments = res;
  }
  async addTime(id,timeData){
    await addTime(id,timeData);
  }
  async changeStatus(id,status){
    await changeStatus(id,status);
    await this.fetch();
    await this.getTask(id);
  }

}

class UsersStore {
  data = [];
  allUsers = [];
  usersList = {};
  profileData = {};
  currentUserData = {};
  pagination = {limit:8, page:0, total:0};
  constructor () {
    makeAutoObservable(this,{},{
      autoBind: true,
    })
    onBecomeObserved(this, 'usersList', this.fetch);
    //onBecomeObserved(this, 'allUsers', this.allUsersFetch);
  }

  async fetch(){
    const response = await getUsers(this.pagination.page);
    this.data  = response.data;
    this.data.map(item => {this.usersList[item.id] = item.username});
    this.pagination.total = response.total;

  }


  async allUsersFetch() {
    const response = await getAllUsers();
    response.map((item) => {this.allUsers[item.id] = item.username});
  }
  async getLogin(form) {
    const response = await userLogin(form);
    this.profileData  = response;
    if (this.profileData.id) {
      localStorage.setItem('userId', this.profileData.id);
      localStorage.setItem('userPass', form.password);
    }
  }
  async takeUser(id) {
    const response = await getUser(id);
    this.profileData  = response;
  }
  async takeProfile(id){
    const response = await getUser(id);
    this.currentUserData  = response;
  }
  async editUser(form) {
    const response = await editUser(form);
    this.profileData  = response.data;
    console.log(response)
    //await this.takeUser(this.profileData.id);
  }
}


export const tasks = new TasksStore( );
export const users = new UsersStore( );

