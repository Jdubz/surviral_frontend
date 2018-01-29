import {
  React,
  observer
} from 'globalImports';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { navStore, logStore, actionStore, locationStore } from '../../stores';
import eventLoop from '../../services/eventLoop';
import { searchLocation } from '../../services/locationManager';

@observer
class ActionPanel extends React.Component{
  render() {
    return (
      <div className="actionPanel-container">
        <Paper className="actionPanel-paper">
          <Typography>Actions</Typography>
          {Object.keys(actionStore.currentActions).map((actionName) => {
            return (
              <Button
                raised
                color="primary"
                key={actionName}
                onClick={() => {
                  const action = actionStore.currentActions[actionName];
                  console.log('action onclick', action);

                  logStore.addEntry(action.logs);
                  eventLoop.triggerLoop(action);
                }}>
                {actionName}
              </Button>)
          })}
        </Paper>
      </div>
    );
  }
}

export default ActionPanel;
