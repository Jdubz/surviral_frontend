import {
  observable,
  action,
  mobx,
  toJS,
  computed,
} from 'globalImports';

import locations from 'assets/json/locations.json';
const _home_location = locations.filter((location) => { return location.id === "house"; })[0];
let knownLocationId = 0;

class Store {
  @observable id = 12345;
  //@observable food = 0;
  //@observable medicine = 0;
  @observable inventory = new Map();
    @observable currentLocation = null;
  @observable knownLocations = new Map();

  //@action modFood = (newFood) => {
  //  this.food = newFood;
  //};
  //@action modMeds = (newMeds) => {
  //  this.medicine = newMeds;
  //};

  @action addKnownLocation = (location) => {
      const _location = Object.assign({}, location);
      _location.inventory = new Map();
      _location.knownLocationId = knownLocationId;
    this.knownLocations.set(knownLocationId, _location);
    knownLocationId++;
  };
  @action addToInventory = (knownLocationId, item) => {
    const _location = this.knownLocations.get(locationId);
    if (_location === undefined || _location === null) {
        return null;
    }
    if (_location.inventory.has(item.name)) {
      const addItem = _location.inventory.get(item.name);
      addItem.quantity++;
    } else {
      item.quantity = 1;
      _location.inventory.set(item.name, item);
    }
  };
  @action removeFromInventory = (knownLocationId, item) => {
    const _location = this.knownLocations.get(locationId);
    if (_location === undefined || _location === null) {
        return null;
    }
    if (this.inventory.has(item.name)) {
      const delItem = this.inventory.get(item.name);
      delItem.quantity--;
    } else {
      this.inventory.delete(item.name);
    }
  };
  @action changeLocation = (newLoc) => {
    this.currentLocation = newLoc;
  };

  @computed get inventoryItems() {
    return toJS(this.currentLocation.inventory);
  };
  @computed get location() {
    return toJS(this.currentLocation);
  }
  @computed get visibleLocations() {
    return toJS(this.knownLocations);
  }
}

let locationStore = new Store();

module.exports = locationStore;
