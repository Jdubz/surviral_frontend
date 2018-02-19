import {
  React,
  observer,
} from 'globalImports';

import { locationStore } from '../../stores';
import Paper from 'material-ui/Paper';

@observer
class LocationPanel extends React.Component {
  render() {
    const { name, description } = locationStore.location;
    return (
      <div className="locationPanel-container">
        <Paper className={'locationPanel-paper'}>
          <h1>{name}</h1>
          <p>{description}</p>
        </Paper>
      </div>
    )
  }
}

export default LocationPanel;
