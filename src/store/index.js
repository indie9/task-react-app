import { computed, makeAutoObservable, onBecomeObserved } from "mobx";
import {  getTasks, getUsers, getAllUsers, userLogin, getUser, addTask,getTask, editUser, getComments,addComment, removeComment, addTime,changeStatus, deleteTask } from "../api";
import moment from "moment";
import { eventsMock } from "../mocks";


class TasksStore {
  data = [];
  preFiltredData = {};
  filtredData = [];
  currentTask ={};
  currentComments = [];
  pagination = {limit:8, page:0, total:0};
  constructor () {
    makeAutoObservable(this,{},{
      autoBind: true,
      getTask: computed,
      currentTask: computed,
      preFiltredData: computed,
      //currentComments: computed
    })
    onBecomeObserved(this, 'filtredData', this.fetch);
  }

  *fetch() {
    const response = yield getTasks(this.preFiltredData,this.pagination.page);
    this.filtredData = response.data;
    this.pagination.total = response.total;
    this.data = response.data;
    this.currentTask = {};
  }

  *addTask(data){
    yield addTask(data);
    yield this.fetch();
  }

  *getTask(id){
    const response = yield getTask(id);
    this.currentTask = response;
    const res  = yield getComments(this.currentTask.id)
    this.currentComments = res;
  }

  *deleteTask(id){
    yield deleteTask(id);
    yield this.fetch();
  }

  filterOn(form){
    console.log("form",form);
    this.preFiltredData = form;
    this.pagination.page = 0;
    this.fetch();
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
    yield this.fetch();
    yield this.getTask(id);
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
      currentUserData: computed,
    })

    onBecomeObserved(this, 'data', this.fetch);

  }

  *fetch() {
    const response = yield getUsers(this.pagination.page);
    console.log('hitr',response)
    this.data  = response.data;
    this.data.map(item => {this.usersList[item.id] = item.username});
    this.pagination.total = response.total;

  }
  *allUsersFetch() {
    const response = yield getAllUsers();
    response.map(item => {this.allUsers[item.id] = item.username});
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
    const response = yield getUser(id);
    this.currentUserData  = response;
  }
  *editUser(form) {
    const response = yield editUser(form);
    this.profileData  = response;
    yield this.takeUser(this.profileData.id);
  }
}


export const tasks = new TasksStore( );
export const users = new UsersStore( );

