import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './placeholder.css'

class Placeholder extends Component {
  render() {
    return (
      <>
        <div className={styles.placeholder__watch__box} />
        <div className={styles.placeholder__container__watch}>
          <div className={styles.placeholder__filter__left}>
            <div className={`${styles.placeholder__header} ${styles.placeholder__line__left}`} />
            <div className={styles.placeholder__line__left} />
            <div className={styles.placeholder__line__left} />
            <div className={styles.placeholder__line__left} />
          </div>
          <div className={styles.placeholder__filter__center}>
            <div className={`${styles.placeholder__header} ${styles.placeholder__line__center}`} />
            <div className={styles.placeholder__line__center} />
            <div className={styles.placeholder__line__center} />
            <div className={styles.placeholder__line__center} />
          </div>
          <div className={styles.placeholder__filter__right}>
            <div className={`${styles.placeholder__header} ${styles.placeholder__line__right}`} />
            <div className={styles.placeholder__line__right} />
            <div className={styles.placeholder__line__right} />
            <div className={styles.placeholder__line__right} />
          </div>
        </div>
      </>
    )
  }
}

export default withStyles(styles)(Placeholder)
