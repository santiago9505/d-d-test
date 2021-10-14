import * as RJD from '../../../../lib/main';
import { TextNodeModel } from './TextNodeModel';

export class TextNodeFactory extends RJD.AbstractInstanceFactory {
  constructor () {
    super('TextNodeModel');
  }

  getInstance () {
    return new TextNodeModel();
  }
}
