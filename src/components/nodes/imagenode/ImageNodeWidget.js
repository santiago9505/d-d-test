import React from 'react';
import * as RJD from '../../../../lib/main';
import { ImageNodeModel } from './ImageNodeModel';

export class ImageNodeWidget extends React.Component {
  static defaultProps = {
    node: {
      name: '',
      image: {
        src: '',
        alt: ''
      }
    }
  };

  onRemove() {
    const { node, diagramEngine } = this.props;
    node.remove();
    diagramEngine.forceUpdate();
  }

  getInPort() {
    const { node, color, displayOnly } = this.props;
    let inputNode = node;

    if (displayOnly) {
      inputNode = new ImageNodeModel(node.name, color);
    }

    return inputNode.getInPort ? <RJD.DefaultPortLabel model={inputNode.getInPort()} key='in-port' /> : null;
  }

  getOutPort() {
    const { node, color, displayOnly } = this.props;
    let outputNode = node;

    if (displayOnly) {
      outputNode = new ImageNodeModel(node.name, color);
    }

    return outputNode.getOutPort ? <RJD.DefaultPortLabel model={outputNode.getOutPort()} key='out-port' /> : null;
  }

  render() {
    const { node, displayOnly } = this.props;
    const { title, image } = node.content;

    return (
      <div className='image-node'>
        <div className="node-graphic">
          {!displayOnly ? <div className='in'>
              {this.getInPort()}
            </div> : null }
            <div className="node-content">
              <img src={ "assets/" + image.src } alt={ image.alt } /> 
              
            </div>
          {!displayOnly ? <div className='out'>
            {this.getOutPort()}
          </div> : null }
        </div>
        <div className='name'>
          { title }{!displayOnly ? <div className='fa fa-close' onClick={this.onRemove.bind(this)} /> : null}
        </div>
      </div>
    );
  }
}

export const ImageNodeWidgetFactory = React.createFactory(ImageNodeWidget);
