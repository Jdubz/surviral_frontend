import {
  React,
  observer
} from 'globalImports';

import navStore from '../../stores/navStore';

@observer
class MyMenu extends React.Component {
  render() {
    return (<div className="menu-container" >
      <h2>SurViral</h2>
      <button
        onClick={() => {
          navStore.changePage('home');
        }}
      >home</button>
      <button
        onClick={() => {
          navStore.changePage('explore');
        }}
      >explore</button>
    </div>);
  }
}

export default MyMenu;
