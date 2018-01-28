import {
  React,
  observer
} from 'globalImports';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

@observer
class MyMenu extends React.Component {
  render() {
    return (<div className="menu-container" >
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
            SurViral
          </Typography>
        </Toolbar>
      </AppBar>
    </div>);
  }
}

export default MyMenu;
