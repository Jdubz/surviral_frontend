import {
  observable,
  action,
} from 'globalImports';

class TimeStore {
  @observable masterTime = 0;
  @observable day = 0;
  @observable hour = 0;

  @action passTime(inc) {
    this.masterTime += inc;
    this.day = Math.floor(this.masterTime / 24);
    this.hour = this.masterTime % 24;
  }
}

export default TimeStore;