import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './Layout.css';

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}

export default withStyles(styles)(Layout);
