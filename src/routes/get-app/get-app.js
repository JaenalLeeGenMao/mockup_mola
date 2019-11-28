import React, { Component } from 'react'
import { connect } from 'react-redux'
import { globalTracker } from '@source/lib/globalTracker'

class GetApp extends Component {
  async componentDidMount() {
    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isAndroid = /Android/.test(navigator.userAgent)
    const payload = {
      window,
      user: this.props.user,
      event: 'event_pages',
    }
    if (isApple) {
      payload.linkRedirectUrl = 'get-app/appstore'
      await globalTracker(payload)
      document.location = 'https://apps.apple.com/us/app/mola-tv/id1473256917?ls=1'
    } else if (isAndroid) {
      payload.linkRedirectUrl = 'get-app/playstore'
      await globalTracker(payload)
      document.location = 'https://play.google.com/store/apps/details?id=tv.mola.app'
    } else {
      payload.linkRedirectUrl = 'get-app/web-desktop'
      await globalTracker(payload)
      document.location = 'https://mola.tv'
    }
  }

  render() {
    return <div />
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

export default connect(mapStateToProps, null)(GetApp)
