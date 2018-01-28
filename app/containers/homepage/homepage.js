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
import { navStore, logStore, locationStore, actionStore } from '../../stores';
import actionManager from '../../services/actionManager';

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
        <Grid item xs={12} sm={6}>
          <Paper className="homepage-paper">
            <Typography type="headline" component="h3">Actions</Typography>
            {actionManager.getValidActions().map((action) => {
              return (
                <Button
                  raised
                  color="primary"
                  key={action.name}
                  onClick={() => {
                    const effect = actionStore.currentActions[action.name].effects;
                    if (effect.indexOf('navigate') === 0) {
                      navStore.changePage(effect.slice(9));
                    } else {
                      logStore.addEntry(actionStore.currentActions[action.name].logs);
                    }
                  }}>
                  {action.name}
                </Button>)
            })}
          </Paper>
        </Grid>
        <PLayerInfo />
      </Grid>
    </div>);
  }
}

export default HomePage;
