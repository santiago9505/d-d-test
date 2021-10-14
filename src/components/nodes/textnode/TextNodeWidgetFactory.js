import * as RJD from '../../../../lib/main';
import { TextNodeWidgetFactory } from './TextNodeWidget';

export class TextNodeNodeWidgetFactory extends RJD.NodeWidgetFactory {
  constructor () {
    super('textnode');
  }

  generateReactWidget (diagramEngine, node) {
    return TextNodeWidgetFactory({ node });
  }
}
