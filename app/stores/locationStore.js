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
      const newLocId = Math.ceil(Math.random() * this.locations.length);
      const newLoc = new Location(locations[newLocId]);
      this.knownLocations.set(newLocId, newLoc);
      this.currentLocation = newLoc;
      return newLoc.name;
    }
    return 'nothing';
  };
  @action setLocation = () => {
    this.setCurrentLocation(this.allLocations.get(newLocId));
  };

  @computed get location() {
    return toJS(this.currentLocation);
  }
  @computed get inventoryItems() {
    return toJS(this.currentLocation.inventory);
  }
}

export default LocationStore;
