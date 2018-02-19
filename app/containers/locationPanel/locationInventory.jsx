import {
  React,
  observer,
} from 'globalImports';

import arrowUp from 'assets/images/arrow_up.svg';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { locationStore, playerStore } from 'stores';

class ItemCard extends React.Component {
  render() {
    const {  id, name, quantity } = this.props.item;
    return (
      <div className={'itemCard-container'}>
        <Button
          className={'itemCard-btn'}
          variant="flat"
          onClick={() => {
            playerStore.addToInventory(locationStore.takeFromInventory(id, 1));
          }}
        >
          <div className={'itemCard-innerBtn'}>
            <p>{`${quantity} : ${name}`}</p>
            <img src={arrowUp} />
          </div>
        </Button>
      </div>
    );
  }
}

@observer
class LocationInventory extends React.Component {
  render() {
    const { inventoryItems } = locationStore;
    return (
      <div className="locationInventory-container">
        <Paper className="locationInventory-paper">
          <Typography>Location Inventory</Typography>
          {Object.values(inventoryItems).map(item => {
            return (<ItemCard key={item.id} item={item} />);
          })}
        </Paper>
      </div>
    );
  }
}

export default LocationInventory;
