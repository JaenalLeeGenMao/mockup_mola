import React, { Component } from 'react'
import s from './Header.css'
import { compose } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

class MobileHeader extends Component {
  state = {
    currentPath: '/',
  }

  componentDidMount() {
    let currentLocation = '/'
    if (typeof window !== 'undefined') {
      currentLocation = window.location.pathname
    }

    this.setState({
      currentPath: currentLocation,
    })
  }

  render() {
    const { title, handleGoBack } = this.props
    return (
      <div className={s.ui_mobile_nav__wrapper}>
        <div className={s.ui_mobile_nav__header}>
          <span className={s.ui_mobile_nav_arrow_prev} />
          <b className={s.ui_mobile_nav__title} onClick={() => handleGoBack()}>
            {title ? title : 'Accounts'}
          </b>
        </div>
      </div>
    )
  }
}

export default compose(withStyles(s))(MobileHeader)
