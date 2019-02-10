import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './placeholder.css'

const Placeholder = () => {
  return (
    <div className={styles.placeholder__container}>
      <div className={styles.placeholder__side_menu}>
        <div className={styles.placeholder__dot} />
        <div className={styles.placeholder__dot} />
        <div className={styles.placeholder__dot} />
      </div>
      <div className={styles.placeholder__detail}>
        <div className={styles.placeholder__title} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__line} />
        <div className={styles.placeholder__button} />
      </div>
      {/* <div className={styles.placeholder__figure}>{[...Array(100)].map((x, i) => <div key={i} className={styles.placeholder__figure_line} style={{ width: `${Math.random() * 25}%` }} />)}</div> */}
      <div className={styles.placeholder__arrows}>
        <div className={styles.placeholder__arrow_prev} />
        <div className={styles.placeholder__arrow_next} />
      </div>
    </div>
  )
}

export default withStyles(styles)(Placeholder)
