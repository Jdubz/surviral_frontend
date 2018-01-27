import {
  observable,
  action,
  mobx,
} from 'globalImports';

import config from 'config'

class MobxNav {

  // initial route
  @observable testString = 'true';

  @action modifyTestString = (newVal) => {
    this.testString = newVal
  }

}

let testStore = new MobxNav();

module.exports = {
  testStore
};
