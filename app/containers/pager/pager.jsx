import {
  React,
  observer,
} from 'globalImports';

import HomePage from '../homepage/homepage';
import DeathNotice from '../deathNotice/deathNotice';
import { navStore } from '../../stores';

@observer
class Pager extends React.Component {
  render() {
    return (
      <div className="pager-container">
        { navStore.page === 'home' ? (<HomePage />) : null }
        { navStore.page === 'dead' ? (<DeathNotice />) : null }
      </div>
    )
  }
}

export default Pager;
