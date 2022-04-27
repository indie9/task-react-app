import { computed, makeAutoObservable, onBecomeObserved } from "mobx";
import { getEvents, addEvent, editEvent, deleteEvent, getOneEvent, deleteArchive } from "../api";
import moment from "moment";



class EventsStore {
  data = [];
  filtredData = [];

  constructor () {
    makeAutoObservable(this,{},{
      autoBind: true,
      archiveData: computed,
      notArchiveDate: computed,
    })
    onBecomeObserved(this, 'data', this.fetch);
  }

  get archiveData() {
    return this.data.filter(item => item.archive)
  }
  get notArchiveDate() {
    return this.data.filter(item => !item.archive)
  }
  get pastData() {
    return this.data
    .filter(x => moment(x.date).isBefore(moment(), 'day') && !x.archive);
  }
  get todayData() {
    return this.data
    .filter(x => moment(x.date).isSame(moment(), 'day') && !x.archive);
  }
  get futureData() {
    return this.data
      .filter(x => moment(x.date).isAfter(moment(), 'day') && !x.archive);
  }

  get favoriteData() {
    return this.data
    .filter(x => x.favorite && !x.archive);
  }

  get startSortData() {
    return this.filtredData
      .filter(x => !x.archive)
      .sort((a,b) => Date.parse(b.date) - Date.parse(a.date));
  }
  get endSortData() {
    return this.filtredData
    .filter(x => !x.archive)
    .sort((a,b) => Date.parse(a.date) - Date.parse(b.date));
  }
  get defaultSortedData() {
    return this.data
    .filter(x => !x.archive)
  }
  *fetch() {
    const response = yield getEvents();
    this.data = response;
    this.filtredData = response.filter(x => !x.archive);

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
