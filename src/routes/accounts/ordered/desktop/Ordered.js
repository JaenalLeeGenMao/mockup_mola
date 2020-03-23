/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { compose } from 'redux'
import { connect } from 'react-redux'
import _isUndefined from 'lodash/isUndefined'

import history from '@source/history'

import s from './Ordered.css'

import LazyLoad from '@components/common/Lazyload'
import Header from '@components/Header'

import { iconMolaFailed, crossImage, hourglassImage } from '@global/imageUrl'
// import crossImage from '../../../../global/assets-global/images/big_cross.png'

const statusText = {
  success: 'success',
  failed: 'failed',
  waiting: 'waiting',
}

const code = {
  waiting: '201',
  success: '200',
}

class Ordered extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      success: false,
      status: statusText.failed,
    }
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  }
  // status_code
  componentDidMount() {
    const statusCode = this.readQueryParams('status_code')

    if (statusCode == code.success) {
      this.setState({ status: statusText.success, loading: false })
      this.toRedirect = setTimeout(() => {
        this.goToHome()
      }, 10000)
    } else if (statusCode == code.waiting) {
      this.setState({ status: statusText.waiting, loading: false })
    } else {
      this.setState({ status: statusText.failed, loading: false })
    }
  }

  componentWillUnmount() {
    if (this.toRedirect) {
      clearTimeout(this.toRedirect)
    }
  }

  readQueryParams = query => {
    const uriSearch = location.search
    if (!_isUndefined(uriSearch) && uriSearch !== '') {
      const urlParams = new URLSearchParams(uriSearch)
      return urlParams.get(query)
    }
    return
  }

  goToHome = () => {
    // for testing on react native
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('close')
    } else {
      window.postMessage('close', '*')
    }

    setTimeout(() => {
      history.push('/')
    }, 1500)
  }

  renderWaiting = () => {
    return (
      <LazyLoad>
        <div className={s.flip}>
          <div className={s.container__logo_failed}>
            <img src={hourglassImage} />
          </div>
          <h1>Menunggu Untuk Pembayaran </h1>
          <div className={s.description}>
            <p>Mohon memeriksa Email anda untuk melihat perincian pembayaran</p>
          </div>
          <div>
            <button type="submit" className={s.close_button} onClick={this.goToHome}>
              Tutup
            </button>
          </div>
        </div>
      </LazyLoad>
    )
  }

  renderSuccess = () => {
    return (
      <LazyLoad>
        <div className={s.flip}>
          {/* <div className={s.circle}>
        <img className={s.logoBlue} />
      </div> */}
          <div className={s.container__logo}>
            <img src={iconMolaFailed} />
          </div>
          <h1>Paket Berlangganan anda telah diaktifkan!</h1>

          <div className={s.description}>
            <p>
              {' '}
              <a onClick={() => this.goToHome()}>klik di sini</a> jika anda tidak diarahkan otomatis ke beranda dalam 10 detik.
            </p>
          </div>
        </div>
      </LazyLoad>
    )
  }

  renderFailed = () => {
    return (
      <LazyLoad>
        <div className={s.flip}>
          {/* <div className={s.circle}>
        <img className={s.logoBlue} />
      </div> */}
          <div className={s.container__logo_failed}>
            <img src={crossImage} />
          </div>
          <h1>Gagal Mengaktifkan Langganan </h1>
          <div className={s.description}>
            <p> Terjadi masalah saat mengaktifkan paket berlangganan anda, Silakan coba lagi nanti.</p>
          </div>
          <div>
            <button type="submit" className={s.close_button} onClick={this.goToHome}>
              Tutup
            </button>
          </div>
        </div>
      </LazyLoad>
    )
  }

  render() {
    const { loading, status } = this.state
    const { isMobile } = this.props
    return (
      <Fragment>
        {!isMobile && <Header libraryOff leftMenuOff rightMenuOff isDark={0} {...this.props} />}
        <div className={s.wrapper}>
          <div className={s.root}>
            {!loading && status == statusText.success && this.renderSuccess()}
            {!loading && status == statusText.failed && this.renderFailed()}
            {!loading && status == statusText.waiting && this.renderWaiting()}
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

export default compose(withStyles(s), connect(mapStateToProps, null))(Ordered)
