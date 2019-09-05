import React, { Component } from 'react'
import PropTypes from 'prop-types'

import OfflineNoticePopupMobile from './mobile'
import OfflineNoticePopupDesktop from './desktop'

class OfflineNoticePopup extends Component {
  static propTypes = {
    handleCloseOfflinePopup: PropTypes.func.isRequired,
  }

  render() {
    const { isMobile = false, handleCloseOfflinePopup } = this.props
    return (
      <>
        {isMobile ? (
          <OfflineNoticePopupMobile handleCloseOfflinePopup={handleCloseOfflinePopup} />
        ) : (
          <OfflineNoticePopupDesktop handleCloseOfflinePopup={handleCloseOfflinePopup} />
        )}
      </>
    )
  }
}

export default OfflineNoticePopup
