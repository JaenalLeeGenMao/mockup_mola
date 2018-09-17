/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, Fragment } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Modal from '@components/common/Modal';
import { connect } from 'react-redux';
import { Portal } from 'react-portal';
import { compose } from 'redux'
import styles from './ModalSearch.css'
import Search from '../Search'

class ModalSearch extends Component {
  state = {
    isOpen: false,
  }

  onCloseModal = () => {
    this.setState({
      isOpen: false
    });
  }

  onClickSearch = () => {
    this.setState({
      isOpen: true
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log("PROPS THIS", this.props)
    if (nextProps !== this.props) {
      console.log("Nextprops", nextProps)
      this.setState({
        isOpen: nextProps.modalProps.open
      })
    }
  }

  render() {
    const { className } = this.props;
    const { isOpen } = this.state;

    return (
      <Fragment>
        {/* <a
          className={className}
          onClick={this.onClickSearch}
        ></a> */}
        { isOpen &&
        <Portal>
          <Modal onClose={this.onCloseModal}>
            <Search isMobile/>
          </Modal>
        </Portal>
        }
      </Fragment>
    )
  }
}


// const mapDispatchToProps = dispatch => ({
//   hideModal: () => dispatch(hideModal()),
//   showModal: (modalProps, modalType) => {
//     dispatch(showModal({ modalProps, modalType }))
//   }
// })
// const mapStateToProps = state => ({
//   ...state.modal
// })

function mapStateToProps(state) {
  console.log('stateeee2', state)
  return {
    ...state.modal
  }
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null
  ),
)(ModalSearch)
