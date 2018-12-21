/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import { Stage, Layer, Rect, Text, Group, Line, Image } from 'react-konva';
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

class App extends Component {
  constructor(props) {
    super(props);
    const k8slogo = new window.Image();
    k8slogo.src = K8sLogo;
    k8slogo.onload = () => {
      this.setState({ k8slogo });
    };
    this.state = { mapLayout: null };
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
                  <Group key={`pod-${m.name}_${m.layout.x}_${m.layout.y}`}>
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
        <div className="NodeDetails">
          <h1>Node details here</h1>
        </div>
      </div>
    );
  }
}

export default App;
