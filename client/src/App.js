/* eslint-disable no-restricted-globals */
import React, { Component, Fragment } from 'react';
import { Stage, Layer, Rect, Text, Group, Line, Image } from 'react-konva';
import uuid from 'uuid/v4';
import dateformat from 'dateformat';
import './App.css';
import K8sLogo from './k8slogo.png';

console.log('K8sLogo', K8sLogo);

const COLOR_SERVICE_UP = '#90C97D';
const COLOR_SERVICE_DOWN = '#C98B7D';
const COLOR_SERVICE_UNKNOWN = '#B8B8B8';
const COLOR_DEVICE = '#BDC6DB';
const COLOR_FIREBASE = '#BDD8DB';
const COLOR_PUBSUB = '#CFBDDB';

const getFill = state => {
  switch (state) {
    case 'up':
      return COLOR_SERVICE_UP;
    case 'down':
      return COLOR_SERVICE_DOWN;
    case 'unknown':
      return COLOR_SERVICE_UNKNOWN;
    default:
      return COLOR_SERVICE_UNKNOWN;
  }
};

const Emoji = props => (
  <span
    className="emoji"
    role="img"
    aria-label={props.label ? props.label : ''}
    aria-hidden={props.label ? 'false' : 'true'}
  >
    {props.symbol}
  </span>
);

class App extends Component {
  constructor(props) {
    super(props);
    const k8slogo = new window.Image();
    k8slogo.src = K8sLogo;
    k8slogo.onload = () => {
      this.setState({ k8slogo });
    };
    this.state = {
      mapLayout: null,
      showDetailsOverlay: false,
      detailsObject: null,
    };
  }
  async componentDidMount() {
    try {
      const d = await fetch('http://localhost:3001/foo');
      const a = await d.json();
      this.setState({
        mapLayout: a,
      });
    } catch (error) {
      console.log('error', error);
    }
  }
  render() {
    const height =
      this.state.mapLayout != null
        ? this.state.mapLayout.length * this.state.mapLayout[0].layout.height +
          200
        : innerHeight;

    return (
      <div className="App">
        <Stage width={innerWidth} height={height}>
          <Layer>
            {this.state.mapLayout &&
              this.state.mapLayout
                .filter(m => m.layout.kind === 'pod')
                .map(m => (
                  <Group
                    key={`pod-${m.name}_${m.layout.x}_${m.layout.y}`}
                    onClick={() =>
                      this.setState({
                        showDetailsOverlay: true,
                        detailsObject: m,
                      })
                    }
                  >
                    <Rect
                      name={m.name}
                      x={m.layout.x}
                      y={m.layout.y}
                      width={m.layout.width}
                      height={m.layout.height}
                      fill={getFill(m.state)}
                      stroke="#C4C4C4"
                      strokeWidth={1}
                      shadowColor="#DBDBDB"
                      shadowOffset={{ x: 1, y: 1 }}
                    />
                    <Text
                      x={m.layout.x}
                      y={m.layout.y}
                      text={m.name}
                      fontSize={16}
                      fontFamily="Calibri"
                      offsetY={-10}
                      offsetX={-10}
                    />
                    {m.containerStatuses &&
                      !m.containerStatuses.every(
                        cs => cs.state.state === 'running'
                      ) &&
                      m.containerStatuses.map(cs => (
                        <Text
                          x={m.layout.x}
                          y={m.layout.y}
                          text={`${cs.state.reason}\n${cs.state.message}`}
                          fontSize={14}
                          fontFamily="Calibri"
                          offsetY={-40}
                          offsetX={-10}
                        />
                      ))}
                    <Image
                      x={m.layout.x + m.layout.width}
                      y={m.layout.y}
                      width={25}
                      height={25}
                      image={this.state.k8slogo}
                      offsetY={12}
                      offsetX={12}
                    />
                  </Group>
                ))}
            {this.state.mapLayout &&
              this.state.mapLayout
                .filter(m => m.layout.kind === 'device')
                .map(m => (
                  <Group key={`device-${m.name}_${m.layout.x}_${m.layout.y}`}>
                    <Rect
                      name={m.name}
                      x={m.layout.x}
                      y={m.layout.y}
                      width={m.layout.width}
                      height={m.layout.height}
                      fill={COLOR_DEVICE}
                      stroke="#C4C4C4"
                      strokeWidth={1}
                      shadowColor="#DBDBDB"
                      shadowOffset={{ x: 1, y: 1 }}
                    />
                    <Text
                      x={m.layout.x}
                      y={m.layout.y}
                      text={'device'}
                      fontSize={12}
                      fontFamily="Calibri"
                      offsetY={-10}
                      offsetX={-10}
                    />
                  </Group>
                ))}
            {this.state.mapLayout &&
              this.state.mapLayout
                .filter(m => m.layout.kind === 'db')
                .map(m => (
                  <Group key={`firebase-${m.name}_${m.layout.x}_${m.layout.y}`}>
                    <Rect
                      name={m.name}
                      x={m.layout.x}
                      y={m.layout.y}
                      width={m.layout.width}
                      height={m.layout.height}
                      fill={COLOR_FIREBASE}
                      stroke="#C4C4C4"
                      strokeWidth={1}
                      shadowColor="#DBDBDB"
                      shadowOffset={{ x: 1, y: 1 }}
                    />
                    <Text
                      x={m.layout.x}
                      y={m.layout.y}
                      text={'firebase'}
                      fontSize={12}
                      fontFamily="Calibri"
                      offsetY={-10}
                      offsetX={-10}
                    />
                  </Group>
                ))}
            {this.state.mapLayout &&
              this.state.mapLayout
                .filter(m => m.layout.kind === 'pubsub')
                .map(m => (
                  <Group key={`pubsub-${m.name}_${m.layout.x}_${m.layout.y}`}>
                    <Rect
                      name={m.name}
                      x={m.layout.x}
                      y={m.layout.y}
                      width={m.layout.width}
                      height={m.layout.height}
                      fill={COLOR_PUBSUB}
                      stroke="#C4C4C4"
                      strokeWidth={1}
                      shadowColor="#DBDBDB"
                      shadowOffset={{ x: 1, y: 1 }}
                    />
                    <Text
                      x={m.layout.x}
                      y={m.layout.y}
                      text={'pubsub'}
                      fontSize={12}
                      fontFamily="Calibri"
                      offsetY={-10}
                      offsetX={-10}
                    />
                  </Group>
                ))}
            {this.state.mapLayout &&
              this.state.mapLayout
                .filter(m => m.layout.kind === 'connector')
                .map(m => (
                  <Group
                    key={`connector-${m.layout.startX}_${m.layout.startY}_${
                      m.layout.endX
                    }_${m.layout.endY}`}
                  >
                    <Line
                      points={[
                        m.layout.startX,
                        m.layout.startY,
                        m.layout.endX,
                        m.layout.endY,
                      ]}
                      stroke="#516870"
                      strokeWidth={2}
                    />
                  </Group>
                ))}
          </Layer>
        </Stage>
        {this.state.showDetailsOverlay && (
          <Fragment>
            <div className="NodeDetails__Background" />
            <div className="NodeDetails">
              <button
                className="NodeDetails__CloseButton"
                onClick={() =>
                  this.setState({
                    showDetailsOverlay: false,
                    detailsObject: null,
                  })
                }
              >
                Close
              </button>
              {this.state.detailsObject.pods.map(p => (
                <div className="NodeDetails__Container" key={uuid()}>
                  <h2 className="NodeDetails__Headline">{p.name}</h2>
                  <div className="NodeDetails__Pod">
                    <p>
                      <span className="NodeDetails__Key">Namespace:</span>{' '}
                      {p.namespace}
                    </p>
                    <p>
                      <span className="NodeDetails__Key">Created:</span>{' '}
                      {dateformat(
                        p.createdTimestamp,
                        'dddd, mmmm dS, yyyy, hh:MM:ss'
                      )}
                    </p>
                    <h3 className="NodeDetails__Headline">Conditions</h3>
                    <ul>
                      {p.conditions.map(c => (
                        <li key={`${c.type}_${c.status}`}>
                          {c.type}:{' '}
                          {c.status === 'True' ? (
                            <Emoji label="checkmark" symbol="✅" />
                          ) : (
                            <Emoji label="prohibited" symbol="🚫" />
                          )}
                        </li>
                      ))}
                    </ul>
                    <h3 className="NodeDetails__Headline">
                      Container Statuses
                    </h3>
                    <ul>
                      {p.containerStatuses.map(c => (
                        <div key={uuid()}>
                          <h4>{c.name}</h4>
                          <ul>
                            <li>
                              <span className="NodeDetails__Key">Ready:</span>{' '}
                              {c.ready.toString()}
                            </li>
                            <li>
                              <span className="NodeDetails__Key">State:</span>{' '}
                              {c.state.state}
                            </li>
                            <li>
                              <span className="NodeDetails__Key">
                                Restart count:
                              </span>{' '}
                              {c.restartCount}
                            </li>
                          </ul>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default App;
