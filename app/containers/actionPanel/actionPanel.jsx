import {
  React,
  observer
} from 'globalImports';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { navStore, logStore, actionStore } from '../../stores';
import actionManager from '../../services/actionManager';


@observer
class ActionPanel extends React.Component{
  render() {
    return (
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
    )
  }
}

export default ActionPanel;
