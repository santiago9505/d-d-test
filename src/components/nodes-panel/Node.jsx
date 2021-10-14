import React from 'react';
import DragWrapper from './DragWrapper';
import { ImageNodeWidget } from '../nodes/imagenode/ImageNodeWidget';
import { TextNodeWidget } from '../nodes/textnode/TextNodeWidget';
import { ImageNodeModel } from '../nodes/imagenode/ImageNodeModel';
import { TextNodeModel } from '../nodes/textnode/TextNodeModel';

class Node extends React.Component {
  /**
   * Render a node according to its type
   * @returns Node component
   */
  renderNode () {
    const { type, color, name, image } = this.props;
    if (type === 'imagenode') {
      const node = new ImageNodeModel(name, color, {
        title: name || '',
        image: {
          src: image || '',
          alt: name || ''
        }
      });
      return <ImageNodeWidget node={node} color={color} image={image} display={name} displayOnly />;
    } else if (type === 'textnode') {
      const node = new TextNodeModel(name, color);
      return <TextNodeWidget node={node} color={color} displayOnly />;
    }

    console.warn('Unknown node type');

    return null;
  }

  render () {
    const { type, color, name, image } = this.props;

    return (
      <DragWrapper type={type} color={color} image={image} display={name} style={{ display: 'inline-block' }}>
        {this.renderNode()}
      </DragWrapper>
    );
  }
}

export default Node;
