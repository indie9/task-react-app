import { computed, makeAutoObservable, onBecomeObserved } from "mobx";
import { getEvents, addEvent, editEvent, deleteEvent, getOneEvent, deleteArchive } from "../api";


class EventStore {
  _id;
  theme = "";
  comment = "";
  date = new Date();
  archive = false;
  favorite = false;

  constructor({_id ,theme, comment, date, archive, favorite}){
    makeAutoObservable(this,{},{
      autoBind: true,
    });
    this._id = _id;
    this.theme = theme;
    this.comment = comment;
    this.date = date;
    this.archive = archive;
    this.favorite = favorite;
  }
}

class EventsStore {
  data = [ ];
  constructor () {
    makeAutoObservable(this,{},{
      autoBind: true,
      archiveData: computed,
      notArchiveDate: computed,
    })
    onBecomeObserved(this, 'data', this.fetch);
  }

  get archiveData() {
    return this.data.map(event => new EventStore(event)).filter(item => item.archive)
  }
  get notArchiveDate() {
    return this.data.map(event => new EventStore(event)).filter(item => !item.archive)
  }

  *fetch() {
    const response = yield getEvents();
    this.data = response.map(event => new EventStore(event));
  }

  *getOneEvent(_id){
    yield getOneEvent(_id);
    yield this.data.filter(event => event.id == _id);
  }
  *addEvent(data){
    yield addEvent(data);
    yield this.fetch();
  }
  *editEvent(data){
    yield editEvent(data);
    yield this.fetch();
  }
  *deleteEvent(id) {
    yield deleteEvent(id);
    yield this.fetch();
  }
  *deleteArchive() {
    yield deleteArchive();
    yield this.fetch();
  }


}

export const events = new EventsStore( );

