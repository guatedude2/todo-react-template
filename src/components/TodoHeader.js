import React from 'react';
import classnames from 'classnames';

import Button from './Button';
import Checkbox from './Checkbox';
import TextField from './TextField';

export default class TodoHeader extends React.Component {
  static propTypes = {
    allTodosDone: React.PropTypes.bool,
    onAdd: React.PropTypes.func,
    onToggleAll: React.PropTypes.func
  };

  static defaultProps = {
    onAdd: e => e,
    onToggleAll: e => e
  };

  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  handleAddClick() {
    const {text} = this.state;
    if (text) {
      this.props.onAdd(text);
      this.setState({ text: '' });
    }
  }

  render() {
    const {text} = this.state;
    const {allTodosDone} = this.props;allTodosDone;
    return (
      <header className="todo-header">
        <Checkbox
          className={classnames('mark-all', {done: allTodosDone})}
          title="Mark All"
          isSelected={allTodosDone}
          onSelect={() => {
            this.props.onToggleAll(!allTodosDone);
          }}
        />
        <TextField
          className="new-todo"
          placeholder='What needs to be done?'
          value={text}
          onChange={(e) => {
            this.setState({ text: e.target.value });
          }}
          onSubmit={this.handleAddClick.bind(this)}
        />
        <Button onClick={this.handleAddClick.bind(this)}>
          +
        </Button>
      </header>
    );
  }
}