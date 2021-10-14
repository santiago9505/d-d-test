import React from 'react';
import _ from 'lodash';

export class NodeWidget extends React.Component {
  shouldComponentUpdate () {
    return this.props.diagramEngine.canEntityRepaint(this.props.node);
  }

  /**
   * Get the position aligned to the grid
   * @param {Number} value - Number to align
   * @returns aligned value
   */
  getGridPosition (value) {
    const distanceToAxis = value % 25;
    const prevAxis = parseInt(value / 25) * 25 + 3;
    if (distanceToAxis < 13) return prevAxis;
    else return prevAxis + 25;
  }

  render () {
    const { node, children, diagramEngine } = this.props;
    const props = {
      'data-nodeid': node.id,
      className: `node${(this.props.node.isSelected() ? ' selected' : '')}`,
      style: {
        top: this.getGridPosition(this.props.node.y),
        left: this.getGridPosition(this.props.node.x)
      }
    };

    // Pass the diagramEngine to the node
    const items = _.isArray(children)
      ? children.map(child => (React.cloneElement(child, { diagramEngine })))
      : React.cloneElement(children, { diagramEngine });

    return (
      <div {...props}>
        {items}
      </div>
    );
  }
}
