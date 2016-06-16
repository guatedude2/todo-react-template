import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import pluralize from '../utils/pluralize';

import TodoHeader from '../components/TodoHeader';
import TodoFooter from '../components/TodoFooter';
import TodoItem from '../components/TodoItem';

import * as todoActions from '../actions/todo';

class MainView extends React.Component {

  static propTypes = {
    totalCount: React.PropTypes.number,
    todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    params: React.PropTypes.object,
    filter: React.PropTypes.string,
    activeCount: React.PropTypes.number.isRequired,
    actions: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    props.actions.setFilter(props.params.filter);
  }

  componentWillReceiveProps(props) {
    if (props.filter !== props.params.filter) {
      props.actions.setFilter(props.params.filter);
    }
  }

  render() {
    const {
      todos,
      activeCount,
      filter,
      totalCount
    } = this.props;

    return (
      <article className="todo">
        <div className="resin-logo">
          <h1>TODOs Example</h1>
          <h2>Welcome to your new React app</h2>
        </div>

        <div className="panel">
          <TodoHeader
            allTodosDone={activeCount === 0}
            onAdd={this.props.actions.addTodo}
            onToggleAll={this.props.actions.toggleAll}
          />
          <section className="contents">
            {totalCount === 0 ?
              <div className="empty">
                No more todos, yay!
              </div> : null
            }
            {totalCount > 0 && todos.length === 0 ?
              <div className="empty">
                {totalCount} {pluralize('item', totalCount)} {pluralize('is', totalCount)} hidden by a filter
              </div> : null
            }
            {todos.map((item) => (
              <TodoItem
                key={item.id}
                id={item.id}
                text={item.text}
                done={item.done}
                editing={item.editing}
                onEdit={this.props.actions.editTodo}
                onSave={this.props.actions.saveTodo}
                onCancel={this.props.actions.cancelEditTodo}
                onDoneToggle={this.props.actions.toggleDone}
                onDestroy={this.props.actions.deleteTodo}
              />
            ))}
          </section>
          <TodoFooter
            totalCount={totalCount}
            activeCount={activeCount}
            filter={filter}
            onClearAllClick={this.props.actions.clearAllDone}
          />
        </div>
      </article>
    );
  }
}

const mapStateToProps = (state) => ({
  totalCount: state.todo.todos.length,
  todos: state.todo.todos.filter((item) => (
    state.todo.filter === 'active' && !item.done ||
    state.todo.filter === 'completed' && item.done || !state.todo.filter
  )),
  filter: state.todo.filter,
  activeCount: state.todo.todos.reduce((acum, el) => (
    el.done ? acum : acum + 1
  ), 0)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(todoActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView);
