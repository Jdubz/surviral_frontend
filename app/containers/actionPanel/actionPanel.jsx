import {
  React,
  observer
} from 'globalImports';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { actionStore } from '../../stores';
import { executeAction } from '../../services/actionManager';

@observer
class ActionPanel extends React.Component{
  render() {
    return (
      <div className="actionPanel-container">
        <Paper className="actionPanel-paper">
          <Typography>Actions</Typography>
          {Object.keys(actionStore.currentActions).map((actionId) => {
            return (
              <Button
                variant="raised"
                color="primary"
                key={actionId}
                onClick={() => {
                  executeAction(actionStore.currentActions[actionId]);
                }}>
                {actionStore.currentActions[actionId].name}
              </Button>);
          })}
        </Paper>
      </div>
    );
  }
}

export default ActionPanel;
