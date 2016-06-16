import React from 'react';

export default class Button extends React.Component {
  static propTypes = {
    children: React.PropTypes.any
  };

  render() {
    return (
      <button {...this.props} />
    );
  }
}