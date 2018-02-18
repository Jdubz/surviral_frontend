import {
  React,
  observer
} from 'globalImports';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { actionStore } from '../../stores';

actionStore.populateAvailable();

@observer
class ActionPanel extends React.Component{
  render() {
    return (
      <div className="actionPanel-container">
        <Paper className="actionPanel-paper">
          <Typography>Actions</Typography>
          {Object.values(actionStore.currentActions).map((action) => {
            console.log(action);
            return (
              <Button
                variant="raised"
                color="primary"
                key={action.id}
                onClick={ () => action.execute() }
              >
                {action.name}
              </Button>);
          })}
        </Paper>
      </div>
    );
  }
}

export default ActionPanel;
