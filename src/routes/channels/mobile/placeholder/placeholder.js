import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './placeholder.css'

const Placeholder = () => {
  return (
    <div className={styles.placeholder__container}>
      <div className={styles.placeholder__detail}>
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
      </div>
    </div>
  )
}

export default withStyles(styles)(Placeholder)
