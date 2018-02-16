import {
  observable,
  action,
  mobx,
  toJS,
  computed,
} from 'globalImports';

let knownLocationId = 0;
const _empty_location = {
  inventory: {},
  name: ""
};

class Store {
  @observable id = 12345;
  //@observable food = 0;
  //@observable medicine = 0;
  @observable inventory = new Map();
  @observable knownLocations = new Map();
  @observable currentLocation = null;

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
    const _location = this.knownLocations.get(knownLocationId);
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
    const _location = this.knownLocations.get(knownLocationId);
    if (_location === undefined || _location === null) {
        return null;
    }
    if (_location.inventory.has(item.name)) {
      const delItem = _location.inventory.get(item.name);
      delItem.quantity--;
    } else {
      _location.inventory.delete(item.name);
    }
  };
  @action changeLocation = (knownLocationId) => {
      this.currentLocation = this.knownLocations.get(knownLocationId);
      console.log('currentLocation', toJS(this.currentLocation));
      return this.currentLocation;
  };

  // TODO: perhaps this doesn't get recomputed when the currentLocation changes?
  @computed get inventoryItems() {
      console.log('inventoryItems', this.currentLocation)
    if (this.currentLocation === null || this.currentLocation === undefined) {
      return {};
    };
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
