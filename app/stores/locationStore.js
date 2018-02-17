import {
  observable,
  action,
  toJS,
  computed,
} from 'globalImports';
import { Location } from '../models';

class Store {
  @observable currentLocation = null;

  @action takeItem = (itemId) => {

  };
  @action setCurrentLocation = (location) => {
    this.currentLocation = new Location(location);
  };

  @computed get inventoryItems() {
    return toJS(this.currentLocation.inventory);
  };
  @computed get location() {
    return toJS(this.currentLocation);
  }
}

let locationStore = new Store();

export default locationStore;
