import {
  observable,
  action,
  toJS,
  computed,
} from 'globalImports';
import { Location } from '../models';
import locations from 'assets/json/locations';
import story from 'assets/json/storyMap';

class LocationStore {
  @observable locationMap = new Map();
  @observable currentLocation = 0;

  @action populateStory = () => {
    story.forEach((loc, i) => {
      this.locationMap.set(i, new Location(locations[loc]));
    });
  };
  @action searchLocation = () => {
    this.locationMap.get(this.currentLocation).search();
  };
  @action addToInventory = (item) => {
    this.locationMap.get(this.currentLocation).addToInventory(item);
  };
  @action deleteFromInventory = (itemId, qty) => {
    return this.locationMap.get(this.currentLocation).deleteFromInventory(itemId, qty);
  };
  @action takeFromInventory = (itemId, qty) => {
    return this.locationMap.get(this.currentLocation).takeFromInventory(itemId, qty);
  };

  @action setCurrentLocation = (location) => {
    this.currentLocation = location;
  };
  @action explore = (search) => {
    const roll = Math.random() * 100;
    if (search > roll) {
      const newLocId = Math.round(Math.random()) + 4;
      console.log(newLocId)
      const newLoc = new Location(locations[newLocId]);
      this.locationMap.set(this.currentLocation, newLoc);
      return newLoc.name;
    }
    return 'nothing';
  };

  @computed get location() {
    return toJS(this.locationMap.get(this.currentLocation));
  }
  @computed get inventoryItems() {
    return toJS(this.locationMap.get(this.currentLocation).inventory);
  }
}

export default LocationStore;
