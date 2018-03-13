import { Item } from 'models';
import { itemStore } from 'stores';
import {
  observable,
  action,
  computed,
  toJS,
} from 'globalImports';

const roll = (check) => {
  return (Math.ceil(Math.random() * 100)) < check;
};
const qty = (amount) => {
  return Math.ceil(Math.random() * amount);
};

class Location {
  @observable inventory = new Map();
  @observable searchesLeft = 100;

  constructor(location) {
    this.id = location.id;
    this.name = location.name;
    this.description = location.description;
    this.itemChance = location.itemChance;
    this.image = location.image;
    this.blocked = location.event_requirements || false;
    this.searchesLeft = location.searches;
  }

  @action addToInventory = (item) => {
    if (this.inventory.has(item.id)) {
      this.inventory.get(item.id).modStack(item.quantity);
    } else {
      this.inventory.set(item.id, item);
    }
  }
  @action takeFromInventory = (itemId, qty) => {
    const takenItems = this.inventory.get(itemId).split(qty);
    if (this.inventory.get(itemId).quantity <= 0) {
      this.inventory.delete(itemId);
    }
    return takenItems;
  }
  @action deleteFromInventory = (itemId, qty) => {
    const qtyLeft = this.inventory.get(itemId).modStack(qty);
    if (qtyLeft <= 0) {
      this.inventory.delete(itemId);
    }
    return qtyLeft;
  }

  @action search = () => {
    Object.values(this.itemChance).forEach(item => {
      if (roll(item.chance)) {
        const newItem = new Item(itemStore.getItem(item.id), qty(item.amount));
        this.addToInventory(newItem);
      }
    });
  }

  @computed get inventoryItems() {
    return toJS(this.inventory);
  }
}

export default Location;
