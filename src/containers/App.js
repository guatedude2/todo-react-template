import React from 'react';

export default class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.any
  };

  render() {
    return (
      <main className="app">
        {this.props.children}
      </main>
    );
  }
}