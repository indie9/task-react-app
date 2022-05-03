import { computed, makeAutoObservable, onBecomeObserved } from "mobx";
import { getEvents, addEvent, editEvent, deleteEvent, getOneEvent, deleteArchive } from "../api";
import moment from "moment";
import { eventsMock } from "../mocks";


class TasksStore {
  data = [...eventsMock];
  preFiltredData = {type:[],autor:[],status:[],priority:[]};
  filtredData = [...eventsMock];
  constructor () {
    makeAutoObservable(this)
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

export const tasks = new TasksStore( );
