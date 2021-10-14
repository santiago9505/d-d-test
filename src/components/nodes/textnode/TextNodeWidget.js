import React, { useState } from 'react';
import * as RJD from '../../../../lib/main';
import { TextNodeModel } from './TextNodeModel';

/**
 * TextNodeWidgetComponent
 * Component for displaying an editable text node
 */
export class TextNodeWidget extends React.Component {
  static defaultProps = {
    node: null,
    color: 'rgb(255, 255, 255)'
  };

  /**
   * Initialize the component
   * @param {*} props 
   */
  constructor (props) {
    super(props);
    this.state = {text: this.props.node?.name || 'Text'}
    this.handleChangeText = this.handleChangeText.bind(this);
  }

  /**
   * Validates if the keycode of a key is a printable character.
   * @param {Number} keyCode - key code 
   * @returns true if the key is a printable character, or false in any other case
   */
  isAllowedKey(keyCode) {
    return (keyCode <= 90 && keyCode >= 48 || keyCode >= 96 && keyCode <= 105);
  } 


  /**
   * Gets the cursor position in a text field with contenteditable true
   * @param {DOMElement} element - Dom Element with contenteditable = true 
   * @returns the cursor position
   */
  getCursorPosition(element) {
    let cursorPos = 0, range;
    if (window.getSelection) {
      let sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        if (range.commonAncestorContainer.parentNode === element) cursorPos = range.endOffset;
      }
    } else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      if (range.parentElement() === element) {
        const fakeElement = document.createElement("span");
        element.insertBefore(fakeElement, element.firstChild);
        var tempRange = range.duplicate();
        tempRange.moveToElementText(fakeElement);
        tempRange.setEndPoint("EndToEnd", range);
        cursorPos = tempRange.text.length;
      }
    }
    return cursorPos;
  }

  /**
   * Place the cursor at the indicated position
   * @param {DOMElement} element - Dom Element with contenteditable = true 
   * @param {Number} pos - Cursor position 
   */
  setCursor(element, pos) {
    let setpos = document.createRange();
    let set = window.getSelection();
    setpos.setStart(element.childNodes[0], pos);
    setpos.collapse(true);
    set.removeAllRanges();
    set.addRange(setpos);
    element.focus();
  }

  /**
   * Handler fired when node text is changed
   * @param {Evebt} event - keyUp event 
   */
  handleChangeText(event) {
    const cursorPosition = this.getCursorPosition(event.target);
    const target = event.target;
    const { node, diagramEngine } = this.props;
    const keyCode = (event.charCode) ? event.charCode : ((event.keyCode) ? event.keyCode :
				  ((event.which) ? event.which : 0));
    target.innerText = target.innerText.replace(/(\r\n|\n|\r)/gm, "");
    if (this.isAllowedKey(keyCode)) {
      node.changeName(target.innerText);
      diagramEngine.forceUpdate();
      this.setState({text: target.innerText}, () => {
        this.setCursor(target, cursorPosition);
      });
    } else {
      this.setCursor(target, cursorPosition);
    }    
  }

  /**
   * Handler fired when node text is removed
   */
  onRemove() {
    const { node, diagramEngine } = this.props;
    node.remove();
    diagramEngine.forceUpdate();
  }

  /**
   * Get the component for In Port
   * @returns DefaultPortLabel component
   */
  getInPort() {
    const { node, color, displayOnly } = this.props;
    let inputNode = node;

    if (displayOnly) {
      inputNode = new TextNodeModel(node.name, color);
    }
    return inputNode.getInPort ? <RJD.DefaultPortLabel model={inputNode.getInPort()} key='in-port' /> : null;
  }

  /**
   * Get the component for Out Port
   * @returns DefaultPortLabel component
   */
  getOutPort() {
    const { node, color, displayOnly } = this.props;
    let outputNode = node;

    if (displayOnly) {
      outputNode = new TextNodeModel(node.name, color);
    }

    return outputNode.getOutPort ? <RJD.DefaultPortLabel model={outputNode.getOutPort()} key='out-port' /> : null;
  }

  /**
   * Render the component
   * @returns component
   */
  render() {
    const { node, color, displayColor, displayOnly } = this.props;
    const name  = node.name;
    const style = {};
    if (color || displayColor) {
      style.color = color || displayColor;
    }

    return (
      <div className='text-node' style={style}>
        {!displayOnly ? <div className='in'>
            {this.getInPort()}
          </div> : null }
        <div className='title'>
          <div className='name'>
            <p 
              className={!displayOnly ? 'text-editable' : 'text-readonly'} 
              value={this.state.text} 
              onKeyUp={this.handleChangeText} 
              contentEditable={!displayOnly} 
              suppressContentEditableWarning
              spellCheck='false'>
              {this.state.text}</p> {!displayOnly ? <div className='fa fa-close' onClick={this.onRemove.bind(this)} /> : null}
          </div>
        </div>
        {!displayOnly ? <div className='out'>
          {this.getOutPort()}
        </div> : null }
      </div>
    );
  }
}

export const TextNodeWidgetFactory = React.createFactory(TextNodeWidget);
