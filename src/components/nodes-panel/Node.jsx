import React from 'react';
import DragWrapper from './DragWrapper';
import { ImageNodeWidget } from '../nodes/imagenode/ImageNodeWidget';

class Node extends React.Component {
    renderNode() {
        const { type, color } = this.props;

        if (type === 'imagenode') {
            return <ImageNodeWidget node={{ name: 'Image node' }} color={color} displayOnly/>;
        }
        
        console.warn('Unknown node type');

        return null;
    }

    render() {
        const { type, color } = this.props;

        return (
            <DragWrapper type={type} color={color} style={{ display: 'inline-block' }}>
                {this.renderNode()}
            </DragWrapper>
        );
    }
}

export default Node;