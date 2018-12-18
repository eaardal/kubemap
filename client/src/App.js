/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import { Stage, Layer, Rect, Text, Group, Line } from 'react-konva';
import './App.css';

const getFill = state => {
  switch (state) {
    case 'up':
      return '#90C97D';
    case 'down':
      return '#C98B7D';
    case 'unknown':
      return '#c0c0c0';
    default:
      return '#c0c0c0';
  }
};

class App extends Component {
  constructor(props) {
    super(props);
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
                  <Group key={m.name}>
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
                      fontSize={12}
                      fontFamily="Calibri"
                      offsetY={-10}
                      offsetX={-10}
                    />
                    <Text
                      x={m.layout.x}
                      y={m.layout.y}
                      text={`${m.app}`}
                      fontSize={16}
                      fontFamily="Calibri"
                      offsetY={-40}
                      offsetX={-10}
                    />
                  </Group>
                ))}
            {this.state.mapLayout &&
              this.state.mapLayout
                .filter(m => m.layout.kind === 'device')
                .map(m => (
                  <Group key={m.name}>
                    <Rect
                      name={m.name}
                      x={m.layout.x}
                      y={m.layout.y}
                      width={m.layout.width}
                      height={m.layout.height}
                      fill={'#909AD4'}
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
                  <Group key={m.name}>
                    <Rect
                      name={m.name}
                      x={m.layout.x}
                      y={m.layout.y}
                      width={m.layout.width}
                      height={m.layout.height}
                      fill={'#90C3D4'}
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
                  <Group key={m.name}>
                    <Rect
                      name={m.name}
                      x={m.layout.x}
                      y={m.layout.y}
                      width={m.layout.width}
                      height={m.layout.height}
                      fill={'#C390D4'}
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
                  <Group key={m.name}>
                    <Line
                      points={[
                        m.layout.startX,
                        m.layout.startY,
                        m.layout.endX,
                        m.layout.endY,
                      ]}
                      stroke="#C4C4C4"
                      strokeWidth={2}
                    />
                  </Group>
                ))}
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default App;
