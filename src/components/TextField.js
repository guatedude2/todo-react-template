import React from 'react';
import classnames from 'classnames';

export default class App extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    onSubmit: React.PropTypes.func,
    onKeyPress: React.PropTypes.func
  };

  static defaultProps = {
    onSubmit: e => e,
    onKeyPress: e => e
  };

  render() {
    return (
      <input
        {...this.props}
        className={classnames('text-field', this.props.className)}
        type="text"
        onKeyPress={(e) =>
          (e.charCode === 13 && (this.props.onSubmit(e) || this.props.onKeyPress(e)))
        }
      />
    );
  }
}