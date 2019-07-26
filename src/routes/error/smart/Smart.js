/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './Smart.css'
import Link from '@components/Link'
import Layout from '@components/Molalayout'
import LazyLoad from '@components/common/Lazyload'
import qr from '../assets/qr-code-app.png'

import { logoMolaBig as logo } from '@global/imageUrl'

class Smart extends Component {
  render() {
    return (
      <Layout>
        <LazyLoad>
          <div className={`${styles.error_container}`}>
            <div className={styles.error__wrapper}>
              <img alt="mola" className={styles.error__mola_image} src={logo} />
              <div>
                <img alt="mola error background" className={styles.error__mola_background} />
                <p className={styles.error__description}>Mola TV tidak dapat di akses di browser ini, anda bisa mengunduh Mola TV mobile app di </p>
              </div>
              <div className={styles.error__mola_icon}>
                <img alt="mola" className={styles.error__mola_icon_gplay} src={qr} />
              </div>
            </div>
          </div>
        </LazyLoad>
      </Layout>
    )
  }
}

export default withStyles(styles)(Smart)
