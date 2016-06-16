import React from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';

import Button from './Button';
import Checkbox from './Checkbox';
import TextField from './TextField';

export default class App extends React.Component {
  static propTypes = {
    id: React.PropTypes.string,
    text: React.PropTypes.string,
    done: React.PropTypes.bool,
    editing: React.PropTypes.bool,
    onDoneToggle: React.PropTypes.func,
    onEdit: React.PropTypes.func,
    onSave: React.PropTypes.func,
    onCancel: React.PropTypes.func,
    onDestroy: React.PropTypes.func
  };

  static defaultProps = {
    onDoneToggle: e => e,
    onEdit: e => e,
    onSave: e => e,
    onCancel: e => e,
    onDestroy: e => e
  };

  constructor(props) {
    super(props);
    this.state = {
      editText: props.text
    };
  }

  handleDoneEditing() {
    const {editText} = this.state;
    const {id, text} = this.props;
    if (editText && editText !== text) {
      this.props.onSave(id, editText);
    } else {
      this.setState({editText: text });
      this.props.onCancel(id);
    }
  }

  render() {
    const {editText} = this.state;
    const {id, text, done, editing} = this.props;
    return (
      <div
        title="Double click to edit"
        className={classnames('todo-item', {done, editing})}
      >
        <div
          className="content"
          onDoubleClick={() => {
            this.props.onEdit(id);
          }}
        >
          <Checkbox
            className="checkbox"
            onSelect={() => {
              this.props.onDoneToggle(id, !done);
            }}
            isSelected={done}
          />
          <TextField
            ref={(el) => (
              (el !== null && editing && findDOMNode(el).focus())
            )}
            className="editor"
            value={editText}
            onChange={(e) => {
              this.setState({editText: e.target.value });
            }}
            onSubmit={this.handleDoneEditing.bind(this)}
            onBlur={this.handleDoneEditing.bind(this)}
          />
          <div className="text" >{text}</div>
        </div>
        <Button
          className="delete"
          title="Delete"
          onClick={() => {
            this.props.onDestroy(id);
          }}
        >
          X
        </Button>
      </div>
    );
  }
}