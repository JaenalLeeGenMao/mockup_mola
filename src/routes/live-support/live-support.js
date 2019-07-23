import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './live-support.css'

export default withStyles(styles)(() => {
  return <div className={styles.help__text}>Klik tombol di bawah untuk bantuan</div>
})
