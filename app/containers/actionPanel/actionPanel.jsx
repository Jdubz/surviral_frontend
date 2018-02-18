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
            return (
              <div
                className={'actionButton-wrapper'}
                key={action.id}
              >
                <Button
                  variant="raised"
                  color="primary"
                  onClick={ () => action.execute() }
                >
                  {action.name}
                </Button>
              </div>);
          })}
        </Paper>
      </div>
    );
  }
}

export default ActionPanel;
