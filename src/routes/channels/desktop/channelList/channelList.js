import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from './channelList.css'

class ChannelList extends Component {
  render() {
    const { channelsPlaylist, handleSelectChannel, channelCategory } = this.props
    return (
      <>
        <div className={styles.epg__logo__container}>
          {channelsPlaylist.meta.status === 'success' && (
            <>
              {channelsPlaylist.data.map(item => (
                <div
                  key={item.id}
                  className={styles.epg__logo__wrapper}
                  onClick={() => {
                    handleSelectChannel(channelCategory, item.id)
                  }}
                >
                  <img alt="" className={styles.epg__logo__img} src={item.thumbnailImg} />
                </div>
              ))}
            </>
          )}
        </div>
        <div className={styles.see__detail__epg}>
          <div className={styles.see__detail__text}> Scroll to see program guide </div>
          <div className={styles.see__detail__arrow} />
        </div>
      </>
    )
  }
}

export default withStyles(styles)(ChannelList)
