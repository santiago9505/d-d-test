import React from 'react';
import * as RJD from '../../lib/main';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import ActionBar from './actions-panel/ActionBar';
import Diagram from './diagram-panel/Diagram';
import PropsEditor from './props-panel/PropsEditor';
import NodesPanel from './nodes-panel/NodesPanel';
import Preview from './preview-panel/Preview';
import Storage from './storage';
import { loadData } from './data/data-import';

import '../style/test.scss';

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

class App extends React.Component {
    constructor(props) {
        super(props);

        let models = loadData();

        this.state = {
            qadata: {},
            savedModels: models,
            model: models[0],
            selectedNode: null
        }

    }

    closePanel(selector) {
        document.querySelectorAll(selector)
            .forEach((elem) => elem.classList.toggle('closed'));
    }

    onModelCreated() {
        const diagramModel = new RJD.DiagramModel();

        Storage.saveToStorage(diagramModel);

        this.setState({
            model: diagramModel,
            selectedNode: null,
            savedModels: Storage.getAllFromStorage(),
            selectedId: diagramModel.id
        });
    }

    onSelectionChanged(selectedId) {
        const model = Storage.getFromStorage(selectedId);
        this.setState({
            model: model,
            selectedId: selectedId,
            selectedNode: null
        });
    }

    onSelectedNodeChanged(selectedNode) {
        this.setState({selectedNode});
    }

    onRemoveModel(id) {
        Storage.removeItem(id);

        let models = Storage.getAllFromStorage();

        // needed when nothing in storage
        if (models.length === 0) {
            models.push(new RJD.DiagramModel())
        }

        this.setState({
            savedModels: models,
            model: models[0],
            selectedNode: null
        });
    }

    onUpdateModel(model, node) {
        // pass a copy of selected node
        const clone = node? copy(node) : null;

        this.setState({
            model: model,
            selectedNode: clone
        }, () => Storage.saveToStorage(model));
    }

    onQAModelChange(model) {
        this.setState({ qadata: model});
    }

    render() {
        return (
            <div id='grid'>
                
                <div className="panel middle start scroll">
                    <NodesPanel />
                </div>

                <div className="content middle center">
                     <div className="diagram-panel">
                         <Diagram
                             selectedNode={this.state.selectedNode}
                             model={this.state.model}
                             updateModel={this.onUpdateModel.bind(this)}/>
                     </div>
                </div>

            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(App);