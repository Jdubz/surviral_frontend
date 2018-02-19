import { playerStore, locationStore, logStore, itemStore } from 'stores';
import { eventLoop } from 'services/eventLoop';

const allInventory = () => {
  const totalItems = {};
  Object.values(playerStore.inventoryItems).forEach(item => {
    totalItems[item.id] = item.quantity;
  });
  Object.values(locationStore.inventoryItems).forEach(item => {
    if (totalItems[item.id]) {
      totalItems[item.id] += item.quantity;
    } else {
      totalItems[item.id] = item.quantity;
    }
  });
  return totalItems;
};

const removeFromInventories = (itemId, qty) => {
  if (locationStore.inventoryItems[itemId]) {
    const remaining = locationStore.deleteFromInventory(itemId, qty);
    if (remaining < 0) {
      playerStore.deleteFromInventory(itemId, qty);
    }
  } else {
    playerStore.deleteFromInventory(itemId, qty);
  }
};

const addToInventory = (itemId, qty) => {
  playerStore.addToInventory(itemStore.getItem(itemId).create(qty));
};

const locationMods = {
  new: () => locationStore.newLocation(),
  search: () => locationStore.searchLocation(),
};

const mods = {
  items: (items) => {
    Object.values(items).forEach(item => {
      if (item.quantity < 0) {
        removeFromInventories(item.id, item.quantity);
      } else {
        addToInventory(item.id, item.quantity);
      }
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
        return (items[current.id] && items[current.id] >= current.quantity) && accum;
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