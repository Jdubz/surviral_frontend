import {
  React,
  observer,
} from 'globalImports';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { locationStore } from '../../stores';

@observer
class LocationInventory extends React.Component {
  render() {
    const { inventoryItems } = locationStore;
    console.log(inventoryItems);
    return (
      <div className="locationInventory-container">
        <Paper className="locationInventory-paper">
          <Typography>Location Inventory</Typography>
          {Object.values(inventoryItems).map(item => {
            return (
              <Typography
                key={item.name}
              >{`${item.quantity} : ${item.name}`}</Typography>
            );
          })}
        </Paper>
      </div>
    );
  }
}

export default LocationInventory;
