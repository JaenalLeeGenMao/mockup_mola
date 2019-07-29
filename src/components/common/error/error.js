import React from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Link from '@components/Link'
import Layout from '@components/Molalayout'
import LazyLoad from '@components/common/Lazyload'

import { nightMode404 as notFound, internalServerError, commonError, molaText as molaLogo } from '@global/imageUrl'

import styles from './error.css'

const Error = ({
  className = '',
  title = '',
  message = '',
  isDark = 0 /** isDark is color of the text */,
  status = 1 /** none, 400, 502 */,
}) => {
  let imageUri
  switch (status) {
    case 400:
      title = 'This is not the web page you are looking for'
      imageUri = notFound
      break
    case 403:
      title = 'This page is forbidden'
      imageUri = notFound
    case 404:
      title = 'Are you sure this is the right address?'
      imageUri = notFound
      break
    case 502:
      title = 'Server on Maintenance'
      imageUri = internalServerError
      break
    case 503:
      title = 'Server on Maintenance'
      imageUri = internalServerError
      break
      break
    default:
      title = 'Oops, Sorry :('
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
