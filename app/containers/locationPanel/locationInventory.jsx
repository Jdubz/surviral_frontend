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
    return (
      <div className="locationInventory-container">
        <Paper className="locationInventory-paper">
          {Object.values(locationStore.inventoryItems).map(item => {
            return (
              <Typography
                key={item.name}
              >{item.name}</Typography>
            );
          })}
        </Paper>
      </div>
    );
  }
}

export default LocationInventory;
