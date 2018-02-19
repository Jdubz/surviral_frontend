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

class LocationStore {
  @observable allLocations = new Map();
  @observable currentLocation = new Location(emptyLocation);
  @observable inventory = new Map();

  @action populateLocations = () => {
    locations.forEach(loc => {
      this.allLocations.set(loc.id, new Location(loc));
    })
  };
  @action searchLocation = () => {
    this.currentLocation.search();
    this.inventory = this.currentLocation.inventory;
  };
  @action addToInventory = (item) => {
    this.currentLocation.addToInventory(item);
    this.inventory = this.currentLocation.inventory;
  };
  @action deleteFromInventory = (itemId, qty) => {
    const newQty = this.currentLocation.deleteFromInventory(itemId, qty);
    this.inventory = this.currentLocation.inventory;
    return newQty;
  };
  @action takeFromInventory = (itemId, qty) => {
    const item = this.currentLocation.takeFromInventory(itemId, qty);
    this.inventory = this.currentLocation.inventory;
    return item;
  };

  @action setCurrentLocation = (location) => {
    this.currentLocation = location;
    this.inventory = location.inventory;
  };
  @action newLocation = () => {
    const newLocId = Math.ceil(Math.random() * this.allLocations.size);
    this.setCurrentLocation(this.allLocations.get(newLocId));
  };

  @computed get inventoryItems() {
    return toJS(this.inventory);
  };
  @computed get location() {
    return toJS(this.currentLocation);
  }
}

export default LocationStore;
