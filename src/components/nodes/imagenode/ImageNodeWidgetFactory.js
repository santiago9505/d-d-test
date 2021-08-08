import * as RJD from '../../../../lib/main';
import { ImageNodeWidgetFactory } from './ImageNodeWidget';

export class ImageNodeNodeWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('imagenode');
  }

  generateReactWidget(diagramEngine, node) {
    return ImageNodeWidgetFactory({ node });
  }
}
