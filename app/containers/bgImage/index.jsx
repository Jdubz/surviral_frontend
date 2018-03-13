import {
  React,
  observer
} from 'globalImports';
import images from 'assets/images';
import { locationStore } from 'stores';
import InventoryPanel from '../inventoryPanel';

@observer
class BGImage extends React.Component {
  render() {
    return (
      <section className={'bgImage-container'}>
        <img src={images[locationStore.location.image]} />
        <InventoryPanel/>
      </section>
    )
  }
}

export default BGImage;
