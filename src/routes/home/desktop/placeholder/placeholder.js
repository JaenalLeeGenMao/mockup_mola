import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './placeholder.css'

const Placeholder = () => {
  return (
    <div className={styles.placeholder__container}>
      <div className={styles.placeholder__side_menu}>
        <div className={styles.placeholder__long_dot} />
        <div className={styles.placeholder__dot} />
        <div className={styles.placeholder__dot} />
        <div className={styles.placeholder__dot} />
      </div>
      <div className={styles.placeholder__detail}>
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
      </div>
      <div className={styles.placeholder__footer}>
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__footer_arrow}>
          <div className={styles.placeholder__line} />
          <div className={styles.placeholder__line} />
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(Placeholder)
