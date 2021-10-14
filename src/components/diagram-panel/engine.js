import React from 'react';
import * as RJD from '../../../lib/main';
import { ImageNodeNodeWidgetFactory } from '../nodes/imagenode/ImageNodeWidgetFactory';
import { ImageNodeFactory } from '../nodes/imagenode/ImageNodeInstanceFactories';
import { TextNodeNodeWidgetFactory } from '../nodes/textnode/TextNodeWidgetFactory';
import { TextNodeFactory } from '../nodes/textnode/TextNodeInstanceFactories';

// Setup the diagram engine
export const engine = new RJD.DiagramEngine();
engine.registerNodeFactory(new RJD.DefaultNodeFactory());
engine.registerLinkFactory(new RJD.DefaultLinkFactory());

engine.registerNodeFactory(new ImageNodeNodeWidgetFactory());
engine.registerNodeFactory(new TextNodeNodeWidgetFactory());

// We need this to help the system know what models to create form the JSON
engine.registerInstanceFactory(new RJD.DefaultNodeInstanceFactory());
engine.registerInstanceFactory(new RJD.DefaultPortInstanceFactory());
engine.registerInstanceFactory(new RJD.LinkInstanceFactory());

engine.registerInstanceFactory(new ImageNodeFactory());
engine.registerInstanceFactory(new TextNodeFactory());
