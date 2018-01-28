import {
    React,
    observer
} from 'globalImports';


import ReactDOM from 'react-dom';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Log from '../log/log';
import { locationStore } from '../../stores';

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
    mapY: 250
  }
];

// from: https://github.com/dobarkod/canvas-bezier-multiple
function bezierCurveThrough(ctx, points, tension) {
    // Default tension of one-quarter gives nice results
    tension = tension || 0.25;

    var l = points.length;

    // If we're given less than two points, there's nothing we can do
    if (l < 2) return;

    ctx.beginPath();

    // If we only have two points, we can only draw a straight line
    if (l == 2) {
        ctx.moveTo(points[0][0], points[0][1]);
        ctx.lineTo(points[1][0], points[1][1]);
        ctx.stroke();
        return;
    }

    // Helper function to calculate the hypotenuse
    function h(x, y) {
        return Math.sqrt(x * x + y * y);
    }

    /* For each interior point, we need to calculate the tangent and pick
     * two points on it that'll serve as control points for curves to and
     * from the point. */
    var cpoints = [];
    points.forEach(function() {
        cpoints.push({});
    });

    for (var i = 1; i < l - 1; i++) {
        var pi = points[i],     // current point
            pp = points[i - 1], // previous point
            pn = points[i + 1]; // next point;

        /* First, we calculate the normalized tangent slope vector (dx,dy).
         * We intentionally don't work with the derivative so we don't have
         * to handle the vertical line edge cases separately. */

        var rdx = pn[0] - pp[0],  // actual delta-x between previous and next points
            rdy = pn[1] - pp[1],  // actual delta-y between previous and next points
            rd = h(rdx, rdy),     // actual distance between previous and next points
            dx = rdx / rd,        // normalized delta-x (so the total distance is 1)
            dy = rdy / rd;        // normalized delta-y (so the total distance is 1)

        /* Next we calculate distances to previous and next points, so we
         * know how far out to put the control points on the tangents (tension).
         */

        var dp = h(pi[0] - pp[0], pi[1] - pp[1]), // distance to previous point
            dn = h(pi[0] - pn[0], pi[1] - pn[1]); // distance to next point

        /* Now we can calculate control points. Previous control point is
         * located on the tangent of the curve, with the distance between it
         * and the current point being a fraction of the distance between the
         * current point and the previous point. Analogous to next point. */

        var cpx = pi[0] - dx * dp * tension,
            cpy = pi[1] - dy * dp * tension,
            cnx = pi[0] + dx * dn * tension,
            cny = pi[1] + dy * dn * tension;

        cpoints[i] = {
            cp: [cpx, cpy], // previous control point
            cn: [cnx, cny], // next control point
       };
    }

    /* For the end points, we only need to calculate one control point.
     * Picking a point in the middle between the endpoint and the other's
     * control point seems to work well. */

    cpoints[0] = {
        cn: [ (points[0][0] + cpoints[1].cp[0]) / 2, (points[0][1] + cpoints[1].cp[1]) / 2 ],
    };
    cpoints[l - 1] = {
        cp: [ (points[l - 1][0] + cpoints[l - 2].cn[0]) / 2, (points[l - 1][1] + cpoints[l - 2].cn[1]) / 2 ],
    };

    /* Now we can draw! */

    ctx.moveTo(points[0][0], points[0][1]);

    for (i = 1; i < l; i++) {
        var p = points[i],
            cp = cpoints[i],
            cpp = cpoints[i - 1];

        /* Each bezier curve uses the "next control point" of first point
         * point, and "previous control point" of second point. */
        ctx.bezierCurveTo(cpp.cn[0], cpp.cn[1], cp.cp[0], cp.cp[1], p[0], p[1]);
    }

    // Overriding stroke produced
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.strokeStyle = "#ccc";
    ctx.stroke();
};

@observer
class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollX: 0,
      scrollY: 0,
      mapWidth: 5000,
      mapHeight: 5000,
    };
  }
  componentDidMount() {
    const canvas = ReactDOM.findDOMNode(this).querySelector('.explorepage-map');
    const context = canvas.getContext('2d');

    bezierCurveThrough(context, [
      [0,0],
      [400,400],
      [500,600]
    ], 1);
  }
  render() {
    return (<div className="explorepage-container">
      <Paper className="explorepage-paper">
        <div className="explorepage-map-container">
          <div className="explorepage-map-inner-container">
            {locations.map((location, index) => {
              return (
                <div
                  key={index}
                  className="explorepage-map-location-container">
                  {this[`render${location.type}`](location)}
                </div>
              );
            })}
            <canvas
              className="explorepage-map"
              width={this.state.mapWidth}
              height={this.state.mapHeight}
            />
          </div>
        </div>
      </Paper>
    </div>);
  }
  renderFeet() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.65 16.21">
        <g id="_8kN6hb.tif" data-name="8kN6hb.tif"><path d="M15.41,7.32a10,10,0,0,1-3-.24.48.48,0,0,1-.38-.35c-.27-.86-.54-1.72-.81-2.58a.23.23,0,0,1,0-.18,2.66,2.66,0,0,1,1-.68,12.45,12.45,0,0,1,3.87-1.15,11.09,11.09,0,0,1,1.67,0,4.21,4.21,0,0,1,1.39.28,1.91,1.91,0,0,1,1.29,2A2.17,2.17,0,0,1,19.55,6a6.17,6.17,0,0,1-2.19,1A8.21,8.21,0,0,1,15.41,7.32Z"/><path d="M13.33,14.5a8.71,8.71,0,0,1-2.47-.15,11.41,11.41,0,0,1-2.08-.51,2.9,2.9,0,0,1-1.07-.58.24.24,0,0,1-.07-.19c.17-.9.35-1.81.52-2.71a.38.38,0,0,1,.26-.3,9.71,9.71,0,0,1,4.45-.57,6.76,6.76,0,0,1,2.56.7,2.37,2.37,0,0,1,1.23,1.23,1.91,1.91,0,0,1-.92,2.47,4.82,4.82,0,0,1-1.52.48Z"/><path d="M5.07,9.36a4.46,4.46,0,0,1,2.13.52l0,0c.33.18.33.17.24.52q-.31,1.21-.6,2.43c0,.11-.07.15-.2.15a6.26,6.26,0,0,1-1.9-.34,2.71,2.71,0,0,1-1.19-.79,1.43,1.43,0,0,1,.65-2.31,6.76,6.76,0,0,1,.84-.23Z"/><path d="M9.18,8.13a2.25,2.25,0,0,1-1.52-.38,1.37,1.37,0,0,1-.37-1.86,2.84,2.84,0,0,1,1.37-1.1,6.75,6.75,0,0,1,1.69-.45c.1,0,.11,0,.13.11l.61,1.65c.12.32.25.64.37,1a.14.14,0,0,1,0,.13A5,5,0,0,1,9.7,8C9.5,8.08,9.3,8.11,9.18,8.13Z"/></g>
      </svg>
    );
  }
  renderHouse(location) {
    const style= {
      transform: `translate(${location.mapX}px, ${location.mapY}px)`,
      height: 200,
      width: 200,
    };

    const isActive = location.id === locationStore.id;

    return (
      <svg className={"explorepage-map-location" + (isActive ? ' is-active' : '')} style={style} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.14 57.74"><path d="M45.32,42.54,40.1,43.88V32.36l-6.69,2.69V45.23l-17.27,4V28.58s15-17.48,15.27-17.78c6,5.71,13.94,14.56,13.94,15C45.4,29,45.32,42.54,45.32,42.54ZM22.83,39.23l5.73-1.35V31l-5.73,1.35Z"/><path d="M30.2,10.15,15.07,26.61s-7.51-3.52-7.51-3.66,5.22-5.55,7.63-8.29c.25-.29.42-9.66.45-10.07h3.49v6.69l2.74-2.1Z"/><polygon points="13.27 49.27 5.76 40.24 5.76 24.43 13.27 28.13 13.27 49.27"/></svg>
    );
  }
  renderForest(location) {
    const style= {
      transform: `translate(${location.mapX}px, ${location.mapY}px)`,
      height: 200,
      width: 300,
    };

    const isActive = location.id === locationStore.id;

    return (
      <svg className={"explorepage-map-location" + (isActive ? ' is-active' : '')} style={style} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 131.32 77.86"><title>Map</title><polygon points="60.36 18.18 47.17 56.16 73.55 56.16 60.36 18.18"/><polygon points="47.17 28.67 38.94 52.38 55.4 52.38 47.17 28.67"/><polygon points="30.71 32.45 22.48 56.16 38.94 56.16 30.71 32.45"/><polygon points="19.4 30.13 14.52 44.21 24.29 44.21 19.4 30.13"/><polygon points="10.38 37.17 5.5 51.24 15.27 51.24 10.38 37.17"/><polygon points="116.06 33.94 111.17 48.01 120.94 48.01 116.06 33.94"/><polygon points="81.78 21.55 73.55 45.26 90.01 45.26 81.78 21.55"/><polygon points="101.04 14.47 90.9 53.4 111.17 53.4 101.04 14.47"/></svg>
    );
  }
}

export default ExplorePage;
