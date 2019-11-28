import React, { Component } from 'react'
import { connect } from 'react-redux'
import { globalTracker } from '@source/lib/globalTracker'

class GetApp extends Component {
  componentDidMount() {
    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isAndroid = /Android/.test(navigator.userAgent)
    const payload = {
      window,
      user: this.props.user,
      event: 'event_pages',
    }
    if (isApple) {
      document.location = 'https://apps.apple.com/us/app/mola-tv/id1473256917?ls=1'
      payload.linkRedirectUrl = 'get-app/appstore'
    } else if (isAndroid) {
      document.location = 'https://play.google.com/store/apps/details?id=tv.mola.app'
      payload.linkRedirectUrl = 'get-app/playstore'
    } else {
      document.location = 'https://mola.tv'
      payload.linkRedirectUrl = 'get-app/web-desktop'
    }
    globalTracker(payload)
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
