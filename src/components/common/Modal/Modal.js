/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import s from './Modal.css';

class Modal extends Component {
  state = {
    rootClose: false
  }
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func,
  };

  handleCloseModal = () => {
    this.setState({
      rootClose: true
    }, () => {
      setTimeout(() => this.props.onClose(), 300)
    })
  }

  render() {
    const { rootClose } = this.state;
    const rootCloseClass = rootClose ? 'rootClose' : '';
    return (
      <div className={classNames(s.root, s[rootCloseClass])}>
        {/* <div className={s.background}/> */}
        {this.props.children}
        <a onClick={this.handleCloseModal} className={s.closeModal}>
          <i/>
        </a>
      </div>
    )
  }
}

export default withStyles(s)(Modal);
