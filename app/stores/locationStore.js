import {
  observable,
  action,
  toJS,
  computed,
} from 'globalImports';
import { Location } from '../models';
import locations from 'assets/json/locations';

class LocationStore {
  @observable knownLocations = new Map();
  @observable currentLocation = new Location(locations[0]);

  @action searchLocation = () => {
    this.currentLocation.search();
  };
  @action addToInventory = (item) => {
    this.currentLocation.addToInventory(item);
  };
  @action deleteFromInventory = (itemId, qty) => {
    return this.currentLocation.deleteFromInventory(itemId, qty);
  };
  @action takeFromInventory = (itemId, qty) => {
    return this.currentLocation.takeFromInventory(itemId, qty);
  };

  @action setCurrentLocation = (location) => {
    this.currentLocation = location;
  };
  @action explore = (search) => {
    const roll = Math.random() * 100;
    if (search > roll) {
      const newLocId = Math.ceil(Math.random() * (locations.length - 1));
      const newLoc = new Location(locations[newLocId]);
      this.knownLocations.set(newLocId, newLoc);
      this.currentLocation = newLoc;
      return newLoc.name;
    } else {
      this.currentLocation = new Location(locations[0]);
      return 'nothing';
    }
  };

  @computed get location() {
    return toJS(this.currentLocation);
  }
  @computed get inventoryItems() {
    return toJS(this.currentLocation.inventory);
  }
}

export default LocationStore;
