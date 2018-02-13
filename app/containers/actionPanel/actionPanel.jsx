import {
  React,
  observer
} from 'globalImports';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { navStore, logStore, actionStore } from '../../stores';
import eventLoop from '../../services/eventLoop';

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
                variant="raised"
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
      </div>
    );
  }
}

export default ActionPanel;
