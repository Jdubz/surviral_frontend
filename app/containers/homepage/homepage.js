import {
    React,
    observer
} from 'globalImports';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import PLayerInfo from '../playerInfo/playerInfo';
import Log from '../log/log';
import { locationStore} from '../../stores';
import ActionPanel from '../actionPanel/actionPanel';

@observer
class HomePage extends React.Component {
  render() {
    return (<div className="homepage-container">
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className="homepage-paper">
            <Typography>{locationStore.description}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className="homepage-paper">
            <Typography type="headline" component="h3">Log</Typography>
            <Log />
          </Paper>
        </Grid>
        <ActionPanel />
        <PLayerInfo />
      </Grid>
    </div>);
  }
}

export default HomePage;
