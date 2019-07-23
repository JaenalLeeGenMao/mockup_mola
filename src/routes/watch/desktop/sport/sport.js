import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Synopsis from './synopsis'
import styles from './sport.css'

class SportContent extends Component {
  render() {
    const { dataFetched } = this.props
    return (
      <>
        <div className={styles.detail__left}>
          <div>
            <h1 className={styles.detail__left_title}>{dataFetched.title}</h1>
          </div>
        </div>
        <div className={styles.detail__right}>
          <div>
            <Synopsis content={dataFetched.description} />
          </div>
        </div>
      </>
    )
  }
}

export default withStyles(styles)(SportContent)
