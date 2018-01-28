import {
    React,
    observer
} from 'globalImports';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import PLayerInfo from '../playerInfo/playerInfo';
import Log from '../log/log';
import { logStore, locationStore } from '../../stores';
import MapSvg01 from 'assets/images/maps/Map-01.svg';

@observer
class ExplorePage extends React.Component {
  render() {
    return (<div className="explorepage-container">
      <Paper className="explorepage-paper">
        <div className="explorepage-map-container">
          {/* <canvas /> */}
          <img src={MapSvg01} />
        </div>
      </Paper>
    </div>);
  }
}

export default ExplorePage;
