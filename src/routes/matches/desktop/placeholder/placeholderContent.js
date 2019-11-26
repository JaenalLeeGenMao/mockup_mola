import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './placeholder.css'

const Placeholder = () => {
  return (
    <>
      <div className={styles.placeholder__top__blank} />
      <div className={styles.placeholder__container}>
        <div className={styles.placeholder__filter}>
          <div className={`${styles.placeholder__header} ${styles.placeholder__line}`} />
          <div className={styles.placeholder__line} />
          <div className={styles.placeholder__line} />
          <div className={styles.placeholder__line} />
        </div>
        <div className={styles.placeholder__content}>
          <div className={styles.placeholder__box} />
          <div className={styles.placeholder__box} />
          <div className={styles.placeholder__box} />
          <div className={styles.placeholder__box} />
        </div>
        <div className={styles.placeholder__filter}>
          <div className={`${styles.placeholder__header} ${styles.placeholder__line_right}`} />
          <div className={`${styles.placeholder__line_right}`} />
          <div className={`${styles.placeholder__line_right}`} />
          <div className={`${styles.placeholder__line_right}`} />
          <div className={`${styles.placeholder__line_right}`} />
          <div className={`${styles.placeholder__line_right}`} />
          <div className={`${styles.placeholder__line_right}`} />
        </div>
      </div>
    </>
  )
}

export default withStyles(styles)(Placeholder)
