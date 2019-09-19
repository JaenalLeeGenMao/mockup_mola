import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './primaryMenu.css'

class PrimaryMenu extends Component {
  render() {
    const { channelsPlaylist = [], handleSelectChannel, activeChannelId } = this.props
    return (
      <>
        <div className={styles.epg__logo__container}>
          {channelsPlaylist.map(item => (
            <div
              key={item.id}
              className={
                item.id === activeChannelId
                  ? `${styles.epg__logo__wrapper} ${styles.logo__active}`
                  : styles.epg__logo__wrapper
              }
              onClick={() => {
                handleSelectChannel(item.id)
              }}
            >
              <img alt="" className={styles.epg__logo__img} src={item.thumbnailImg} />
            </div>
          ))}
        </div>
        <div className={styles.see__detail__epg}>
          <div className={styles.see__detail__text}> Scroll to see program guide </div>
          <div className={styles.see__detail__arrow} />
        </div>
      </>
    )
  }
}

export default withStyles(styles)(PrimaryMenu)
