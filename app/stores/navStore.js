import {
  observable,
  action,
  mobx,
} from 'globalImports';

class MobxNav {
  // initial route
  @observable page = 'home';

  @action changePage = (newPage) => {
    this.page = newPage;
  }

}

let navStore = new MobxNav();

module.exports = navStore;
