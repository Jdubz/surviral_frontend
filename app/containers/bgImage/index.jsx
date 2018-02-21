import {
  React,
  observer
} from 'globalImports';
import images from 'assets/images';
import { locationStore } from 'stores';

@observer
class BGImage extends React.Component {
  render() {
    return (
      <div className={'bgImage-container'}>
        <img src={images[locationStore.location.image]} />
      </div>
    )
  }
}

export default BGImage;
