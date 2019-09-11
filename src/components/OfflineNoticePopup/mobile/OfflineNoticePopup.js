import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import s from './OfflineNoticePopup.css'

class OfflineNoticePopup extends Component {
  static propTypes = {
    handleCloseOfflinePopup: PropTypes.func.isRequired,
  }

  handleClose = () => {
    if (this.props.handleCloseOfflinePopup) {
      this.props.handleCloseOfflinePopup()
    }
  }

  render() {
    return (
      <div className={s.wrapper__detect__offline}>
        <div className={s.text__detect__offline}> You are currently offline</div>
        <div className={s.btn__detect__offline} onClick={this.handleClose}>
          {' '}
          OK{' '}
        </div>
      </div>
    )
  }
}

export default withStyles(s)(OfflineNoticePopup)
