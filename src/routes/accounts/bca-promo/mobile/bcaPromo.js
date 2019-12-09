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
import { CopyToClipboard } from 'react-copy-to-clipboard'
// import { iconMolaSuccess, iconMolaFailed } from '@global/imageUrl'
import bcaUrl from '../../../../../src/global/assets-global/images/bca-button.png'
import { logoHorizontal } from '@global/imageUrl'

import Link from '@components/Link'

import Header from '@components/Header'

import s from './bcaPromo.css'

import LazyLoad from '@components/common/Lazyload'
import history from '@source/history'

import { getLocale } from '../locale'
import _isUndefined from 'lodash/isUndefined'

class BcaPromo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      locale: getLocale(),
      voucher_code: 'MOLATV',
      copied: false,
    }
  }

  renderHeader() {
    return (
      <div className={s.mola_logo}>
        <Link to="/">
          <img alt="molatv" src={logoHorizontal} />
        </Link>
      </div>
    )
  }

  render() {
    return (
      <Fragment>
        {this.renderHeader()}
        <div className={s.wrapper}>
          <LazyLoad>
            <div className={s.root}>
              <div className={s.header_text}>Selamat Datang di MOLA TV</div>
              <div className={s.banner}>
                <img src={'https://res-mola01.koicdn.com/image/98b3f8c9-f8c4-4497-8dbc-e557cb83a37d/image.jpeg'} />
              </div>
              <div className={s.paragraph_bold}>
                Ingin bisa bebas streaming seluruh pertandingan Liga Inggris di MOLA TV selama sebulan?
              </div>
              <div className={s.paragraph}>
                <p>
                  {' '}
                  Anda hanya perlu membuka tabungan baru di BCA mobile untuk mengaktifkan paket Premium MOLA TV, dimana
                  Anda bisa menyaksikan 10 Pertandingan Liga Inggris di aplikasi MOLA TV setiap minggunya
                </p>
              </div>

              <div className={s.code}>
                <div style={{ display: 'inline' }}>
                  <div className={s.voucher_code}>{this.state.voucher_code}</div>
                  <CopyToClipboard text={this.state.voucher_code} onCopy={() => alert('Copied the text: MOLATV')}>
                    <div className={s.copy_button}>SALIN</div>
                  </CopyToClipboard>
                </div>
              </div>
              <div className={s.paragraph}>
                <p> Jangan lupa masukkan kode promo saat melakukan pengisian data untuk mengaktifkan penawaran ini</p>
              </div>
              <div className={s.bca_link}>
                <img src={bcaUrl} />
              </div>
            </div>
          </LazyLoad>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return { ...state }
}

export default compose(withStyles(s), connect(mapStateToProps, null))(BcaPromo)
