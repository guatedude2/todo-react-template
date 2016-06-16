import React from 'react';

export default class App extends React.Component {
  static propTypes = {
    isSelected: React.PropTypes.bool,
    onSelect: React.PropTypes.func
  };

  static defaultProps = {
    onSelect: e => e
  };

  render() {
    return (
      <input
        {...this.props}
        type="checkbox"
        checked={this.props.isSelected}
        onChange={(e) => (this.props.onSelect(e))}
      />
    );
  }
}