import { playerStore, locationStore, logStore } from 'stores';
import { eventLoop } from 'services/eventLoop';

const allInventory = () => {
  const totalItems = Object.assign({}, playerStore.inventoryItems);
  const locationItems = locationStore.inventoryItems;
  Object.values(locationItems).forEach(item => {
    if (totalItems[item.id]) {
      totalItems[item.id].quantity += item.quantity;
    } else {
      totalItems[item.id] = item;
    }
  });
  return totalItems;
};

const inventoryMod = (itemId, qty) => {
  
};

const locationMods = {
  new: () => locationStore.newLocation(),
  search: () => locationStore.searchLocation(),
};

const mods = {
  items: (items) => {
    Object.values(items).forEach(item => {
      inventoryMod(item.id, item.quantity);
    });
  },
  player: (player) => playerStore.modPlayer(player),
  location: (loc) => locationMods[loc](),
};

class Action {
  constructor(action) {
    this.id = action.id;
    this.name = action.name;
    this.logs = action.logs;
    this.prereq = action.prereq;
    this.modifiers = action.modifiers;
    this.time = action.time;
    this.sound_effect = action.sound_effect;
  }

  checkRequirements() {
    const items = allInventory();
    if (this.prereq.items) {
      return Object.values(this.prereq.items).reduce((accum, current) => {
        return (items[current.id] && items[current.id].quantity > current.quantity) && accum;
      }, true);
    }
    return true;
  }

  execute() {
    Object.keys(this.modifiers).forEach(type => {
      mods[type](this.modifiers[type]);
    });
    logStore.addEntry(this.logs);
    eventLoop(this.time);
  }
}

export default Action;