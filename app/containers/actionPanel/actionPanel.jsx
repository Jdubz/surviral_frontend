import {
  React,
  observer
} from 'globalImports';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { navStore, logStore, actionStore } from '../../stores';
import eventLoop from '../../services/eventLoop'

@observer
class ActionPanel extends React.Component{
  render() {
    return (
      <Grid item xs={12} sm={6}>
        <Paper className="homepage-paper">
          <Typography type="headline" component="h3">Actions</Typography>
          {Object.keys(actionStore.currentActions).map((actionName) => {
            return (
              <Button
                raised
                color="primary"
                key={actionName}
                onClick={() => {
                  const action = actionStore.currentActions[actionName];
                  if (action.type === "explore") {
                    navStore.changePage("explore");
                  } else {
                    logStore.addEntry(action.logs);
                    eventLoop.triggerLoop(action);
                  }
                }}>
                {actionName}
              </Button>)
          })}
        </Paper>
      </Grid>
    )
  }
}

export default ActionPanel;
