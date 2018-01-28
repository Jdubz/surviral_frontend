import {
  observable,
  action,
  mobx,
  toJS,
  computed,
} from 'globalImports';

class Store {
  @observable time = 0;

  @action passTime(inc) {
    this.time += inc;
    return this.time;
  }
}

let timeStore = new Store();

module.exports = timeStore;