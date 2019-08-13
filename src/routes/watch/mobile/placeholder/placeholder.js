import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './placeholder.css'

class WatchPlaceholder extends Component {
  render() {
    return (
      <>
        <div className={styles.placeholder__watch__box} />
        <div className={styles.placeholder__filter}>
          <div className={`${styles.placeholder__header} ${styles.placeholder__line}`} />
          <div className={styles.placeholder__line} />
          <div className={styles.placeholder__line} />
          <div className={styles.placeholder__line} />
          <div className={styles.placeholder__line} />
          <div className={styles.placeholder__line} />
        </div>
      </>
    )
  }
}

export default withStyles(styles)(WatchPlaceholder)
