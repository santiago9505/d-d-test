import _ from 'lodash';
import * as RJD from '../../../../lib/main';

export class TextNodeModel extends RJD.NodeModel {
  constructor (name = 'Untitled', color = 'rgb(255, 255, 255)', content) {
    super('textnode');
    this.addPort(new RJD.DefaultPortModel(false, 'output', 'Out'));
    this.addPort(new RJD.DefaultPortModel(true, 'input', 'In'));
    this.name = name;
    this.color = color;
    this.content = content;
  }
}
