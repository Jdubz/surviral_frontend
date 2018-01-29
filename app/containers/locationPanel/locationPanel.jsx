import {
  React,
  observer,
} from 'globalImports';

import { locationStore } from '../../stores';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

@observer
class LocationPanel extends React.Component {
  render() {
    const { name } = locationStore.location;
    return (
      <div className="locationPanel-container">
        <Paper className="locationPanel-paper">
          <Typography>{name}</Typography>
        </Paper>
      </div>
    )
  }
}

export default LocationPanel;
