import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Synopsis from './synopsis'
import styles from './sport.css'

class SportContent extends Component {
  render() {
    const { dataFetched } = this.props
    return (
      <div className={styles.detail__desc}>
        <Synopsis content={dataFetched.description} />
      </div>
    )
  }
}

export default withStyles(styles)(SportContent)
