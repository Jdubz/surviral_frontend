import {
  observable,
  action,
} from 'globalImports';

class Store {
  @observable masterTime = 0;
  @observable day = 0;
  @observable hour = 0;

  @action passTime(inc) {
    this.masterTime += inc;
    this.day = Math.floor(this.masterTime / 24);
    this.hour = this.masterTime % 24;
    return this.day;
  }
}

let timeStore = new Store();

export default timeStore;