import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Frame.css';

class Frame extends React.Component {
  static propTypes = {
      children: PropTypes.node.isRequired,
  };

  render() {
      return <div className={s.container}>{this.props.children}</div>;
  }
}

export default withStyles(s)(Frame);
