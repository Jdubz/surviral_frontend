import {
    React,
    observer
} from 'globalImports';


import ReactDOM from 'react-dom';
import MapLocation from '../mapLocation/mapLocation';
import {
  locationStore,
  playerStore,
} from '../../stores';
import drawBezierCurveThrough from '../../utils/drawBezierCurveThrough';
import findParentWithClass from '../../utils/findParentWithClass';
import distanceBetweenTwoPoints from '../../utils/distanceBetweenTwoPoints';
import angleBetweenTwoPoints from '../../utils/angleBetweenTwoPoints';

const types = {
  House: {
    width: 200,
    height: 200,
  },
  Forest: {
    width: 200,
    height: 300,
  },
};

const locations = [
  {
    id: 12345,
    name: 'A dwelling',
    type: 'House',
    mapX: 200,
    mapY: 200
  },
  {
    id: 1233,
    name: 'A forest',
    type: 'Forest',
    mapX: 400,
    mapY: 600
  }
];

const displaySpeedReduction = 0.008;

@observer
class ExplorePage extends React.Component {
  constructor(props) {
    super(props);

    const activeLocation = locations.find((location) => location.id === locationStore.id);
    const { x, y } = this.getLocationCenter(activeLocation);

    this.state = {
      scrollX: 0,
      scrollY: 0,
      mapWidth: 2000,
      mapHeight: 2000,
      playerX: x,
      playerY: y,
      playerIsMoving: false,
      playerIsAtLocation: true,
      playerFacingAngle: 0,
      playerDimension: 80,
      playerAnimationTimer: null,
      playerAnimationDuration: 1,
    };
  }
  componentDidMount() {
    this.drawMapBackground();
  }
  componentWillUnMount() {
    if (this.state.playerAnimationTimer) {
      clearTimeout(this.state.playerAnimationTimer);
    }
  }
  render() {
    return (
      <div className="explorepage-container">
        {this.renderFeet()}
        {locations.map((location, index) => {
          return (
            <div
              key={index}
              className="explorepage-map-svg-container explorepage-map-location"
              onClick={(e) => this.handleMovePlayerToLocation(e, location)}
            >
              <MapLocation
                key={index}
                location={location}
                width={types[location.type].width}
                height={types[location.type].height} />
            </div>
          );
        })}
        <canvas
          className="explorepage-map"
          width={this.state.mapWidth}
          height={this.state.mapHeight}
          onClick={(e) => this.handleMovePlayerToClick(e)}
        />
      </div>
    );
  }
  getLocationCenter(location) {
    const locationWidth = types[location.type].width;
    const locationHeight = types[location.type].height;

    return {
      x: location.mapX + (locationWidth / 2),
      y: location.mapY + (locationHeight / 2),
    }
  }
  handleMovePlayerToLocation(event, location) {
    if (!event || this.state.playerIsMoving) {
      return;
    }

    event.preventDefault();

    const { clientX, clientY, target } = event;
    const container = findParentWithClass(target, 'explorepage-container');

    if (container === null) {
      return;
    }

    const { top, left } = container.getBoundingClientRect();

    const { x, y } = this.getLocationCenter(location);
    const { playerX, playerY } = this.state;

    this.animatePlayerMove(playerX, playerY, x, y, true);
  }
  handleMovePlayerToClick(event) {
    if (!event || this.state.playerIsMoving) {
      return;
    }

    event.preventDefault();

    const { clientX, clientY, target } = event;
    const container = findParentWithClass(target, 'explorepage-container');

    if (container === null) {
      return;
    }

    const { top, left } = container.getBoundingClientRect();

    const desiredX = clientX - left;
    const desiredY = clientY - top;
    const { playerX, playerY } = this.state;

    this.animatePlayerMove(playerX, playerY, desiredX, desiredY, false);
  }
  animatePlayerMove(startX, startY, endX, endY, isToLocation) {
    const distance = distanceBetweenTwoPoints(endX, endY, startX, startY);
    const duration = (distance / playerStore.moveSpeed) * displaySpeedReduction;

    const timer = setTimeout(() => {
      // TODO: handle cancelling by closing this timer
      if (isToLocation) {
        this.setState({
          playerIsAtLocation: isToLocation
        })
      }
    }, duration * 1000);
    this.setState({
      playerIsAtLocation: false,
      playerAnimationTimer: timer,
      playerAnimationDuration: duration,
      playerFacingAngle: angleBetweenTwoPoints(startX, startY, endX, endY),
      playerX: endX,
      playerY: endY,
    });
  }
  drawMapBackground() {
    const canvas = ReactDOM.findDOMNode(this).querySelector('.explorepage-map');
    const context = canvas.getContext('2d');

    this.drawRivers(context);
    this.drawRoads(context);
  }
  drawRoads(context) {
    drawBezierCurveThrough(context, [
      // TODO: make road generation not hard-coded
      [0,0],
      [400,400],
      [500,600]
    ], 1, 8, "#606EBD");
  }
  drawRivers(context) {
    drawBezierCurveThrough(context, [
      // TODO: make river generation not hard-coded
      [200,0],
      [500,400],
      [300,600]
    ], 1, 3, "#609EBD");
  }
  renderFeet() {
    const {
      playerX,
      playerY,
      playerFacingAngle,
      playerDimension,
      playerAnimationDuration,
      playerIsAtLocation,
    } = this.state;

    const playerOffset = playerDimension / 2;

    const divStyle = {
      transform: `translate(${playerX - playerOffset}px, ${playerY - playerOffset}px)`,
      transition: `transform ${playerAnimationDuration}s ease-out`,
      willChange: 'transform',
      height: playerDimension,
      width: playerDimension,
      opacity: playerIsAtLocation ? 0 : 1,
    };
    const svgStyle = {
      transform: `rotate(${playerFacingAngle}deg)`
    };

    return (
      <div style={divStyle} className="explorepage-map-svg-container">
        <svg className="explorepage-map-feet" style={svgStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.65 16.21">
          <g id="_8kN6hb.tif" data-name="8kN6hb.tif"><path d="M15.41,7.32a10,10,0,0,1-3-.24.48.48,0,0,1-.38-.35c-.27-.86-.54-1.72-.81-2.58a.23.23,0,0,1,0-.18,2.66,2.66,0,0,1,1-.68,12.45,12.45,0,0,1,3.87-1.15,11.09,11.09,0,0,1,1.67,0,4.21,4.21,0,0,1,1.39.28,1.91,1.91,0,0,1,1.29,2A2.17,2.17,0,0,1,19.55,6a6.17,6.17,0,0,1-2.19,1A8.21,8.21,0,0,1,15.41,7.32Z"/><path d="M13.33,14.5a8.71,8.71,0,0,1-2.47-.15,11.41,11.41,0,0,1-2.08-.51,2.9,2.9,0,0,1-1.07-.58.24.24,0,0,1-.07-.19c.17-.9.35-1.81.52-2.71a.38.38,0,0,1,.26-.3,9.71,9.71,0,0,1,4.45-.57,6.76,6.76,0,0,1,2.56.7,2.37,2.37,0,0,1,1.23,1.23,1.91,1.91,0,0,1-.92,2.47,4.82,4.82,0,0,1-1.52.48Z"/><path d="M5.07,9.36a4.46,4.46,0,0,1,2.13.52l0,0c.33.18.33.17.24.52q-.31,1.21-.6,2.43c0,.11-.07.15-.2.15a6.26,6.26,0,0,1-1.9-.34,2.71,2.71,0,0,1-1.19-.79,1.43,1.43,0,0,1,.65-2.31,6.76,6.76,0,0,1,.84-.23Z"/><path d="M9.18,8.13a2.25,2.25,0,0,1-1.52-.38,1.37,1.37,0,0,1-.37-1.86,2.84,2.84,0,0,1,1.37-1.1,6.75,6.75,0,0,1,1.69-.45c.1,0,.11,0,.13.11l.61,1.65c.12.32.25.64.37,1a.14.14,0,0,1,0,.13A5,5,0,0,1,9.7,8C9.5,8.08,9.3,8.11,9.18,8.13Z"/></g>
        </svg>
      </div>
    );
  }
}

export default ExplorePage;
