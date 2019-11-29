import React, { Component } from 'react'
import { connect } from 'react-redux'
import { globalTracker } from '@source/lib/globalTracker'

class GetApp extends Component {
  state = {
    store_url: '',
    ios_store_url: '',
  }

  async componentDidMount() {
    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isAndroid = /Android/.test(navigator.userAgent)
    await this.getConfig()
    const { store_url, ios_store_url } = this.state

    const payload = {
      window,
      user: this.props.user,
      event: 'event_pages',
    }
    if (isApple) {
      payload.linkRedirectUrl = 'get-app/appstore'
      await globalTracker(payload)
      document.location = ios_store_url
    } else if (isAndroid) {
      payload.linkRedirectUrl = 'get-app/playstore'
      await globalTracker(payload)
      document.location = store_url
    } else {
      payload.linkRedirectUrl = 'get-app/web-desktop'
      await globalTracker(payload)
      document.location = '/'
    }
  }

  getConfig = async () => {
    const { configParams } = this.props
    if (configParams.data) {
      const { store_url, ios_store_url } = configParams.data
      this.setState({
        store_url,
        ios_store_url,
      })
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
