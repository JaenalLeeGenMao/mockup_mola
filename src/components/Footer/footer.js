import React from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Link from '@components/Link'
import LazyLoad from '@components/common/Lazyload'

import { getLocale } from './locale'

import styles from './footer.css'

const Footer = () => {
  const locale = getLocale()
  return (
    <LazyLoad containerClassName={styles.footer__container}>
      <Link to="/system-info">{locale['system_info']}</Link>
      <Link to="/terms">{locale['terms']}</Link>
      <Link to="/privacy">{locale['privacy']}</Link>
      <Link to="/condition">{locale['condition']}</Link>
    </LazyLoad>
  )
}

export default withStyles(styles)(Footer)
