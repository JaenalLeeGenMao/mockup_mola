import React, { Component } from 'react'
import { connect } from 'react-redux'
import _get from 'lodash/get'

import LoginBca from './login-bca'
import LoginBcaNew from './login-bca-new'

class ReaderPromo extends Component {
  render() {
    const { configParams } = this.props
    const newDesign = _get(configParams.data, 'bca', 1)

    return (
      <>
        {newDesign == 1 ? <LoginBcaNew isMobile={this.props.isMobile} /> : <LoginBca isMobile={this.props.isMobile} />}
      </>
    )
  }
}

const mapStateToProps = state => {
  return { ...state }
}

export default connect(mapStateToProps)(ReaderPromo)
