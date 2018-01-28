import {
    React,
    observer
} from 'globalImports';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import PLayerInfo from '../playerInfo/playerInfo';

@observer
class HomePage extends React.Component {
  render() {
    return (<div className="homepage-container">
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <Paper className="homepage-paper">
            <Typography type="headline" component="h3">Log</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className="homepage-paper">
            <Typography type="headline" component="h3">Actions</Typography>
          </Paper>
        </Grid>
        <PLayerInfo />
      </Grid>
    </div>);
  }
}

export default HomePage;
