import {
  observable,
  action,
  toJS,
  computed,
} from 'globalImports';
import { Location } from '../models';
import locations from 'assets/json/locations';

const emptyLocation = {
  id: 0,
  name: 'Nowhere',
  description: 'There\'s nothing here',
  inventory: new Map(),
  itemChance: {},
  image: '',
};

class Store {
  @observable allLocations = new Map();
  @observable currentLocation = new Location(emptyLocation);

  @action populateLocations = () => {
    locations.forEach(loc => {
      this.allLocations.set(loc.id, new Location(loc));
    })
  };

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
