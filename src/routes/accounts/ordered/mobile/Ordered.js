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

import Header from '@components/Header'

import s from './Ordered.css'

import LazyLoad from '@components/common/Lazyload'
import history from '@source/history'

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
    this.toLogin = setTimeout(() => {
      window.location.href = 'accounts/profile?tab=subscription'
    }, 15000)
  }

  componentWillUnmount() {
    if (this.toLogin) {
      clearTimeout(this.toLogin)
    }
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
                  <div className={s.checkmark} />
                </div>
                <h1>Akftifasi Paket Berhasil</h1>
                <div className={s.description}>
                  <p>
                    Atau klik <a href={'accounts/profile?tab=subscription'}> disini</a> jika tidak diarahkan lebih dari
                    10 detik
                  </p>
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
  return { ...state }
}

export default compose(withStyles(s), connect(mapStateToProps, null))(Ordered)
