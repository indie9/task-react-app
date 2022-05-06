import { computed, makeAutoObservable, onBecomeObserved } from "mobx";
import {  getTasks, getUsers, userLogin, getUser, addTask } from "../api";
import moment from "moment";
import { eventsMock } from "../mocks";


class TasksStore {
  data = [];
  preFiltredData = {type:[],autor:[],status:[],priority:[]};
  filtredData = [];


  constructor () {
    makeAutoObservable(this,{},{
      autoBind: true,

    })
    onBecomeObserved(this, 'filtredData', this.tasksFetch);
  }

  *tasksFetch() {
    const response = yield getTasks();
    this.filtredData = response.data;
    this.data = response.data;
  }

  *addTaskk(data){
    console.log(data)
    yield addTask(data);
    yield this.tasksFetch();
  }



  removePreFilter(){
    this.preFiltredData = {type:[],autor:[],status:[],priority:[]};
  }
  addTask (task){
    this.data.push(task);
  }
  removeTask (_id){
    this.data = this.data.filter(item => item._id !== _id);
  }

  filterOn (searchform) {

    this.filtredData = this.data.filter(item => (
      (searchform.type.length > 0 ? searchform.type.includes(item.type) : true) &&
      (searchform.autor.length > 0 ? searchform.autor.includes(item.autor) : true)&&
      (searchform.status.length > 0 ? searchform.status.includes(item.status) : true)&&
      (searchform.priority.length > 0 ? searchform.priority.includes(item.priority) : true)
      ));

  }
}

class UsersStore {
  data = [];
  usersList = {};
  profileData = {};

  constructor () {
    makeAutoObservable(this,{},{
      autoBind: true,
    })
    onBecomeObserved(this, 'data', this.usersFetch);
  }

  *usersFetch() {
    const response = yield getUsers();
    this.data  = response;
    this.data.map(item => {this.usersList[item.id] = item.username});

  }
  *getLogin(form) {
    console.log(form);
    const response = yield userLogin(form);
    this.profileData  = response;
    console.log(this.profileData);
    if (this.profileData.id) {
      localStorage.setItem('userId', this.profileData.id);
      
    }
  }
  *takeUser(id) {
    const response = yield getUser(id);
    this.profileData  = response;
  }
}


export const tasks = new TasksStore( );
export const users = new UsersStore( );

