import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get } from 'axios'
import parser from 'ua-parser-js'
import Header from '@components/Header'
import { SystemInfoWrapper, SystemInfoContainer } from './style'

class SystemInfo extends Component {
  state = {
    info: null,
  }
  componentDidMount() {
    get('//ipinfo.io/json').then(({ data }) => {
      this.setState({ info: data })
    })
  }
  render() {
    const { info = null } = this.state,
      parserInfo = parser(navigator.userAgent)
    return (
      <div>
        <Header stickyOff rightMenuOff libraryOff leftMenuOff {...this.props} />

        <div className={SystemInfoWrapper}>
          <div className={SystemInfoContainer}>
            <h1>System Info</h1>
            {info !== null && (
              <>
                <div>
                  BROWSER {parserInfo.browser.name} {parserInfo.browser.version}
                </div>
                <div>
                  OS {parserInfo.os.name} {parserInfo.os.version}
                </div>
                <div>
                  LOCATION {info.city}/{info.country} ({info.loc})
                </div>
                <div>ISP {info.org}</div>
                <div>IP {info.ip}</div>
              </>
            )}
            <div>Version 1.0.21</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

export default connect(mapStateToProps)(SystemInfo)
