class Item {
  constructor(item, quantity) {
    this.id = item.id;
    this.quantity = quantity;
    this.name = item.name;
    this.description = item.description;
    this.image = item.image;
    this.weight = item.weight;
    this.baseItem = item;
  }

  create(qty) {
    return new Item(this.baseItem, qty);
  }
  modStack(qty) {
    this.quantity += qty;
    return this.quantity;
  }
  split(qty) {
    this.quantity -= qty;
    return new Item(this.baseItem, qty);
  }
}

export default Item;