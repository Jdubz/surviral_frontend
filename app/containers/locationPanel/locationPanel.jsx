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
    if (locationStore.location === null) { return null; }
    const { name } = locationStore.location;
    return (
      <div className="locationPanel-container">
        <Typography>{name}</Typography>
      </div>
    )
  }
}

export default LocationPanel;
