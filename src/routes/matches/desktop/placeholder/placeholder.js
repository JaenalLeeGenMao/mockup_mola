import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './placeholder.css'

const Placeholder = () => {
  return (
    <div className={styles.placeholder__container}>
      <div className={styles.placeholder__box}>
      </div>
      <div className={styles.placeholder__box}>
      </div>
      <div className={styles.placeholder__box}>
      </div>
      <div className={styles.placeholder__box}>
      </div>
      <div className={styles.placeholder__box}>
      </div>
      <div className={styles.placeholder__box}>
      </div>
      <div className={styles.placeholder__box}>
      </div>
      <div className={styles.placeholder__box}>
      </div>
      <div className={styles.placeholder__box}>
      </div>
      <div className={styles.placeholder__box}>
      </div>
      <div className={styles.placeholder__box}>
      </div>
      <div className={styles.placeholder__box}>
      </div>
    </div>
  )
}

export default withStyles(styles)(Placeholder)
