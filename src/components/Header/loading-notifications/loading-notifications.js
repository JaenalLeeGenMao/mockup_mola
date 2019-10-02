import React from 'react'
import WithStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './loading-notifications.css'

const loader = props => {
  switch (props.type) {
    case 'elipsis':
      return (
        <div className={`${styles.lds_ellipsis} ${props.size === 'small' && styles.small}`}>
          <div />
          <div />
          <div />
          <div />
        </div>
      )
    default:
      return (
        <div className={`${styles.lds_ring} ${props.size === 'small' && styles.small}`}>
          <div />
          <div />
          <div />
          <div />
        </div>
      )
  }
}

export default WithStyles(styles)(loader)
