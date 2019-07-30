import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './loaderVideoBox.css'

class LoaderVideoBox extends Component {
  render() {
    return (
      <>
        <div className={styles.placeholder__video__box} />
        <div className={styles.placeholder__container__playlist}>
          <div className={styles.placeholder__primary__playlist} />
          <div className={styles.placeholder__primary__playlist} />
          <div className={styles.placeholder__primary__playlist} />
          <div className={styles.placeholder__primary__playlist} />
          <div className={styles.placeholder__primary__playlist} />
        </div>
      </>
    )
  }
}

export default withStyles(styles)(LoaderVideoBox)
