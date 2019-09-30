import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './placeholder.css'

class Placeholder extends Component {
  render() {
    return (
      <div className={styles.placeholder__container}>
        <div className={styles.placeholder__watch_box} />
        <div className={styles.placeholder__watch_detail}>
          <div style={{ padding: '0px 2rem 1.34rem' }}>
            <div className={styles.placeholder__long} />
            <div className={styles.placeholder__medium} />
            <br />
            <div className={styles.placeholder__quarter_long} />
            <br />
            <div className={styles.placeholder__long} />
            <div className={styles.placeholder__quarter_long} />
            <div className={styles.placeholder__medium} />
            <div className={styles.placeholder__quarter_long} />
            <div className={styles.placeholder__long} />
            <div className={styles.placeholder__short} />
          </div>
          <div style={{ padding: '0px 2rem 1.34rem' }}>
            <div className={styles.placeholder__short} />
            <div style={{ display: 'flex' }}>
              <div className={styles.placeholder__cast} />
              <div className={styles.placeholder__cast_121} />
              <div className={styles.placeholder__cast_74} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Placeholder)
