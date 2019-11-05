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

import history from '@source/history'

import s from './Ordered.css'

import LazyLoad from '@components/common/Lazyload'
import Header from '@components/Header'

import { logoBlue, logoMobile } from '@global/imageUrl'

class Ordered extends React.Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  componentDidMount() {
    //page only accesible from register page
    let isAccesible = false

    if (history.location.state && history.location.state.isAccesible) {
      isAccesible = true
    }
    if (!isAccesible) {
      history.push('not-found')
    }
    this.toRedirect = setTimeout(() => {
      window.location.href = 'accounts/profile?tab=subscription'
    }, 15000)
    // console.log('naonaonao', this.toLogin)
  }

  componentWillUnmount() {
    if (this.toRedirect) {
      clearTimeout(this.toRedirect)
    }
  }

  handleOrder = () => {
    history.push('/accounts/profile')
  }

  render() {
    return (
      <Fragment>
        <Header libraryOff leftMenuOff rightMenuOff isDark={0} {...this.props} />
        <div className={s.wrapper}>
          <div className={s.root}>
            <LazyLoad>
              <div className={s.flip}>
                <div className={s.circle}>
                  <img className={s.logoBlue} />
                </div>
                <h1>Aktifasi Paket Berhasil</h1>
                <div className={s.description}>
                  <p>Jika anda tidak diarahkan kehalaman utama dalam 10 detik...</p>
                </div>
                <div className={s.ordered_button_wrapper}>
                  <button className={s.ordered_button_active} onClick={() => this.handleOrder()}>
                    Klik disini
                  </button>
                </div>
              </div>
            </LazyLoad>
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
