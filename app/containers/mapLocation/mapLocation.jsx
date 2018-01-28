import {
    React,
    observer
} from 'globalImports';

import { locationStore } from '../../stores';

@observer
class MapLocation extends React.Component {
  render() {
    const {
      location,
      width,
      height,
    } = this.props;

    return this.renderType(location, width, height);
  }
  renderType(location, width, height) {
    const style = {
      transform: `translate(${location.mapX}px, ${location.mapY}px)`,
      height: height,
      width: width,
    };

    const isActive = location.id === locationStore.id;
    const className = "map-location" + (isActive ? ' is-active' : '');

    return this[`render${location.type}`](location, width, height, className, style);
  }
  renderHouse(location, width, height, className, style) {
    return (
      <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.14 57.74">
        <path d="M45.32,42.54,40.1,43.88V32.36l-6.69,2.69V45.23l-17.27,4V28.58s15-17.48,15.27-17.78c6,5.71,13.94,14.56,13.94,15C45.4,29,45.32,42.54,45.32,42.54ZM22.83,39.23l5.73-1.35V31l-5.73,1.35Z"/>
        <path d="M30.2,10.15,15.07,26.61s-7.51-3.52-7.51-3.66,5.22-5.55,7.63-8.29c.25-.29.42-9.66.45-10.07h3.49v6.69l2.74-2.1Z"/>
        <polygon points="13.27 49.27 5.76 40.24 5.76 24.43 13.27 28.13 13.27 49.27"/>
      </svg>
    );
  }
  renderForest(location, width, height, className, style) {
    return (
      <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 131.32 77.86">
        <polygon points="60.36 18.18 47.17 56.16 73.55 56.16 60.36 18.18"/>
        <polygon points="47.17 28.67 38.94 52.38 55.4 52.38 47.17 28.67"/>
        <polygon points="30.71 32.45 22.48 56.16 38.94 56.16 30.71 32.45"/>
        <polygon points="19.4 30.13 14.52 44.21 24.29 44.21 19.4 30.13"/>
        <polygon points="10.38 37.17 5.5 51.24 15.27 51.24 10.38 37.17"/>
        <polygon points="116.06 33.94 111.17 48.01 120.94 48.01 116.06 33.94"/>
        <polygon points="81.78 21.55 73.55 45.26 90.01 45.26 81.78 21.55"/>
        <polygon points="101.04 14.47 90.9 53.4 111.17 53.4 101.04 14.47"/>
      </svg>
    );
  }
}

export default MapLocation;
