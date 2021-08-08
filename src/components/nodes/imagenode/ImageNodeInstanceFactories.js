import * as RJD from '../../../../lib/main';
import { ImageNodeModel } from './ImageNodeModel';

export class ImageNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('ImageNodeModel');
  }

  getInstance() {
    return new ImageNodeModel();
  }
}
