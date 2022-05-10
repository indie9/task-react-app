import { computed, makeAutoObservable, onBecomeObserved } from "mobx";
import {  getTasks, getUsers, userLogin, getUser, addTask,getTask, editUser, getComments,addComment, removeComment, addTime,changeStatus } from "../api";
import moment from "moment";
import { eventsMock } from "../mocks";


class TasksStore {
  data = [];
  preFiltredData = {};
  filtredData = [];
  currentTask ={};
  currentComments = [];

  constructor () {
    makeAutoObservable(this,{},{
      autoBind: true,
      getTask: computed,
      currentTask: computed,
      preFiltredData: computed,
      //currentComments: computed
    })
    onBecomeObserved(this, 'filtredData', this.tasksFetch);
  }

  *tasksFetch() {
    const response = yield getTasks(this.preFiltredData);
    this.filtredData = response.data;
    this.data = response.data;
    this.currentTask = {};
  }

  *addTask(data){
    yield addTask(data);
    yield this.tasksFetch();
  }

  *getTask(id){
    const response = yield getTask(id);
    this.currentTask = response;
    const res  = yield getComments(this.currentTask.id)
    this.currentComments = res;
  }

  filterOn(form){
    console.log(form);
    this.preFiltredData  = form;
    this.tasksFetch();
  }
  removePreFilter(){
    this.preFiltredData = {type:[],autor:[],status:[],priority:[]};
  }

  removeTask (_id){
    this.data = this.data.filter(item => item._id !== _id);
  }
  *addComment(commentData){
    yield addComment(commentData);
  }
  *removeComment(id){
    yield removeComment(id);
  }
  *addTime(id,timeData){

    yield addTime(id,timeData);
  }
  *changeStatus(id,status){
    yield changeStatus(id,status);
    yield this.tasksFetch();
  }
}

class UsersStore {
  data = [];
  usersList = {};
  profileData = {};
  currentUserData = {};
  constructor () {
    makeAutoObservable(this,{},{
      autoBind: true,
      profileData: computed,
    })
    onBecomeObserved(this, 'data', this.usersFetch);
  }

  *usersFetch() {
    const response = yield getUsers();
    this.data  = response;
    this.data.map(item => {this.usersList[item.id] = item.username});

  }
  *getLogin(form) {
    const response = yield userLogin(form);
    this.profileData  = response;
    console.log(this.profileData);
    if (this.profileData.id) {
      localStorage.setItem('userId', this.profileData.id);
      localStorage.setItem('userPass', form.password);
    }
  }
  *takeUser(id) {
    const response = yield getUser(id);
    this.profileData  = response;
  }
  *takeProfile(id){
    console.log("takeprof",id)
    const response = yield getUser(id);
    this.currentUserData  = response;
  }
  *editUser(form) {
    const response = yield editUser(form);
    this.profileData  = response;
  }
}


export const tasks = new TasksStore( );
export const users = new UsersStore( );

