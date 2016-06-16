import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

import pluralize from '../utils/pluralize';

export default class TodoFooter extends React.Component {
  static propTypes = {
    filter: React.PropTypes.string,
    totalCount: React.PropTypes.number,
    activeCount: React.PropTypes.number,
    onClearAllClick: React.PropTypes.func
  };

  static defaultProps = {
    onAdd: e => e,
    onToggleAll: e => e
  };

  static filterOptions = [
    { name: 'All' },
    { name: 'Active', value: 'active' },
    { name: 'Completed', value: 'completed' }
  ];

  render() {
    const {activeCount, totalCount, filter} = this.props;;
    return (
      <footer className="todo-footer">
        <div>{activeCount} {pluralize('item', activeCount)} left</div>
        <ul className="filters">
          {TodoFooter.filterOptions.map((option) => (
            <li key={option.value} className={classnames({active: option.value === filter })}>
              <Link to={`/${option.value || ''}`}>{option.name}</Link>
            </li>
          ))}
        </ul>
        <div>
          {totalCount !== activeCount ?
            <a href="#" onClick={(e) => {
                e.preventDefault();
                this.props.onClearAllClick();
              }}
            >
              Clear completed
            </a> : null
          }
        </div>
      </footer>
    );
  }
}