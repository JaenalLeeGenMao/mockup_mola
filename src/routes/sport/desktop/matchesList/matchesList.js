import React, { Component, Fragment } from 'react'

import MatchCard from '@components/MatchCard'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import LazyLoad from '@components/common/Lazyload'
import styles from './matchesList.css'

class MatchesList extends Component {
  render() {
    const validateMatch = this.props.matchesList
    let matchFeatured = [];
    const matchSortedDate = validateMatch.sort((a, b) => a.startTime - b.startTime)
    const matchFiltered = matchSortedDate.filter(match => {
      return match.endTime * 1000 >= Date.now()
    })
    matchFeatured = matchFiltered.slice(0, 4)
    const matchPlaylistId = this.props.playlistId
    return (
      <Fragment>
        <LazyLoad containerClassName={styles.matchesList_schedule_wrapper}>
          <div className={styles.matchesList_grid_label}>
            <span className={styles.matchesList_label}>Live Now and Upcoming</span>
            <span className={styles.matchesList_viewall}>
              <a href={`/matches${matchPlaylistId ? '/' + matchPlaylistId : ''}`}>View All</a>
            </span>
          </div>
          <div className={styles.matchesList_grid}>
            {matchFeatured.length > 0 ? (
              matchFeatured.map(liveSoc => {
                return (
                  <MatchCard key={liveSoc.id} matchData={liveSoc} />
                )
              })
            ) : (
                <div className={styles.defaultNoLive}>Tidak Ada Live Saat Ini</div>
              )}
          </div>
        </LazyLoad>
      </Fragment>
    )
  }
}
export default withStyles(styles)(MatchesList)

