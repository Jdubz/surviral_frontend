import {
  React,
  observer
} from 'globalImports';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { navStore, playerStore } from '../../stores';

@observer
class MyMenu extends React.Component {
  render() {
    return (<div className="menu-container" >
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
            SurViral
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              navStore.changePage('home');
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              navStore.changePage('explore');
            }}
          >
            Explore
          </Button>
        </Toolbar>

      </AppBar>
    </div>);
  }
}

export default MyMenu;
