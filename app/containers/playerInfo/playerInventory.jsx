import {
  React,
  observer,
} from 'globalImports';

import arrowDown from 'assets/images/arrow_down.svg';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { playerStore, locationStore } from '../../stores';

class ItemCard extends React.Component {
  render() {
    const {  id, name, quantity } = this.props.item;
    return (
      <div className={'itemCard-container'}>
        <Button
          className={'itemCard-btn'}
          variant="flat"
          onClick={() => {
            locationStore.addToInventory(playerStore.takeFromInventory(id, 1));
          }}
        >
          <div className={'itemCard-innerBtn'}>
            <p>{`${quantity} : ${name}`}</p>
            <img src={arrowDown} />
          </div>
        </Button>
      </div>
    );
  }
}

@observer
class PlayerInventory extends React.Component {
  render() {
    return (
      <div className="playerInventory-container">
        <Paper className="playerInventory-paper">
          <Typography>Player Inventory</Typography>
          {Object.values(playerStore.inventoryItems).map(item => {
            return <ItemCard key={item.name} item={item} />;
          })}
        </Paper>
      </div>
    );
  }
}

export default PlayerInventory;
