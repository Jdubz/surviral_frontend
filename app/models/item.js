class Item {
  constructor(item, quantity) {
    this.id = item.id;
    this.quantity = quantity;
    this.name = item.name;
    this.description = item.description;
    this.image = item.image;
    this.weight = item.weight;
  }
}

export default Item;