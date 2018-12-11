import React from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Link from '@components/Link'
import Layout from '@components/Molalayout'
import LazyLoad from '@components/common/Lazyload'

import molaLogo from '@global/style/icons/error/mola-text.png'

import notFound from '@global/style/icons/error/night-mode-404.png'
import internalServerError from '@global/style/icons/error/internal-server-error-502.png'
import commonError from '@global/style/icons/error/common-error.png'

import styles from './error.css'

const Error = ({ className = '', title = '', message = '', isDark = 0 /** isDark is color of the text */, status = 1 /** none, 400, 502 */ }) => {
  let imageUri
  switch (status) {
    case 400:
      title = 'Page not found'
      imageUri = notFound
      break
    case 502:
      title = 'Bad gateway'
      imageUri = internalServerError
      break
    default:
      title = 'Oops, sorry :('
      imageUri = commonError
      break
  }
  return (
    <Layout>
      <LazyLoad>
        <div className={`${styles.error_container} ${className}`}>
          <Link to="/" className={styles.error__wrapper}>
            <img alt="mola" className={styles.error__mola_title} src={molaLogo} />
            <div style={{ color: isDark ? 'black' : 'white' }}>
              <img alt="mola error background" className={styles.error__mola_background} src={imageUri} />
              <h2 className={styles.error__title}>{title}</h2>
              <p className={styles.error__description}>{message}</p>
            </div>
          </Link>
        </div>
      </LazyLoad>
    </Layout>
  )
}

export default withStyles(styles)(Error)
