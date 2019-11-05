/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
// import { iconMolaSuccess, iconMolaFailed } from '@global/imageUrl'
import iconMolaSuccess from '../../../../../src/global/assets-global/images/icon_success.png'
import iconMolaFailed from '../../../../../src/global/assets-global/images/icon_fail.png'

import Header from '@components/Header'

import s from './bcaSubscribe.css'

import LazyLoad from '@components/common/Lazyload'
import history from '@source/history'

import { getLocale } from '../locale'
import _isUndefined from 'lodash/isUndefined'

class BcaSubscribe extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      locale: getLocale(),
      isFinish: false,
      isSuccess: false, //nanti ini ganti berdasarkan meta.status
    }
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.checkRedeemStatus()
  }

  checkRedeemStatus() {
    const uriSearch = location.search
    if (!_isUndefined(uriSearch) && uriSearch !== '') {
      const urlParams = new URLSearchParams(uriSearch)
      const redeemStatus = urlParams.get('redeemstatus')
      if (redeemStatus == 0) {
        this.setState({ isSuccess: false, isFinish: true })
      } else if (redeemStatus == 1) {
        this.setState({ isSuccess: true, isFinish: true })
      }
    } else {
      history.push('/')
    }
  }

  handleStartWatching() {
    history.push('/')
  }

  renderRedeemSuccess() {
    const { locale } = this.state
    return (
      <>
        <div className={s.root}>
          <div className={s.container}>
            {/* <div className={s.circle__fail}>
            <div className={s.checkmark__fail} />
          </div> */}
            <div className={s.container__logo_failed}>
              <img src={iconMolaSuccess} />
            </div>

            <div className={s.container__logo_text}>
              <h1>{locale['your_account_has_been_activated']}</h1>
              <div className={s.description}>
                <p>{locale['activated_description']}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={s.button_description}>
          <button type="submit" className={s.login__content_submit} onClick={this.handleStartWatching}>
            <p>Start Watching</p>
          </button>
        </div>
      </>
    )
  }

  renderRedeemFailed() {
    const { locale } = this.state
    return (
      <>
        <div className={s.root}>
          <div className={s.container}>
            {/* <div className={s.circle__fail}>
            <div className={s.checkmark__fail} />
          </div> */}
            <div className={s.container__logo_failed}>
              <img src={iconMolaFailed} />
            </div>

            <div className={s.container__logo_text}>
              <h1>{locale['your_account_has_been_canceled']}</h1>
              <div className={s.description}>
                <p>{locale['canceled_description']}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={s.button_description}>
          <button type="submit" className={s.login__content_submit} onClick={this.handleStartWatching}>
            <p>Continue to Home</p>
          </button>
        </div>
      </>
    )
  }

  render() {
    const { isSuccess, isFinish } = this.state
    return (
      <Fragment>
        <Header libraryOff leftMenuOff rightMenuOff isDark={0} {...this.props} />
        <div className={s.wrapper}>
          {isFinish && (
            <LazyLoad>
              {isSuccess && this.renderRedeemSuccess()}
              {!isSuccess && this.renderRedeemFailed()}
            </LazyLoad>
          )}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return { ...state }
}

export default compose(withStyles(s), connect(mapStateToProps, null))(BcaSubscribe)
