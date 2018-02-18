import {
  React,
  observer,
} from 'globalImports';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { playerStore } from '../../stores';

@observer
class PlayerInventory extends React.Component {
  render() {
    return (
      <div className="playerInventory-container">
        <Paper className="playerInventory-paper">
          <Typography>Player Inventory</Typography>
          {Object.values(playerStore.inventoryItems).map(item => {
            return <Typography key={item.name}>{item.name}</Typography>;
          })}
        </Paper>
      </div>
    );
  }
}

export default PlayerInventory;
