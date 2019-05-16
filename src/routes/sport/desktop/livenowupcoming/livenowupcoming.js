import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { swipeGestureListener, getErrorCode } from '@routes/sport/util'
import Link from '@components/Link'

import liveNowUpcomingActions from '@actions/sport'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import LazyLoad from '@components/common/Lazyload'
import styles from './livenowupcoming.css'

import defaultTeamLogo from './../assets/defaultTeamLogo.png'
import { validate } from 'tcomb-validation'

class liveNowUpComing extends Component {
  state = {
    playlists: [],
    videos: [],
    newestMatches: [],
  }

  componentDidMount() {
    const { playlists, videos } = this.props.sport
    this.getShowMatchCards()
    // onHandleMatchDetail()
  }
  getShowMatchCards = () => {
    const validateMatch = this.props.sport.playlists.data[0].playlists
    // console.log('MASUK VALIDASI')
    // console.log('get data', validateMatch.meta.status)
    // console.log('get data', validateMatch)
    if (validateMatch.meta.status == 'success') {
      const matchTeamSortedDate = validateMatch.data.sort((a, b) => a.startTime - b.startTime)
      // console.log('in', matchTeamSortedDate)
      const liveNowMatch = matchTeamSortedDate.filter(match => {
        return match.endTime * 1000 >= Date.now()
      })
      // console.log('in 2', liveNowMatch)
      this.setState({
        newestMatches: liveNowMatch.slice(0, 4),
      })
    }
  }

  render() {
    const { playlists, videos } = this.props.sport
    // console.log('inside', this.state.newestMatches)
    // console.log('test data', this.props.sport)
    // console.log('check data', this.state.newestMatches.length)

    return (
      <Fragment>
        <LazyLoad>
          <div className={styles.sport_schedule_container}>
            <div className={styles.lnupcoming_grid_label}>
              <span className={styles.lnupcoming_label}>Live now and upcoming</span>
              <span className={styles.lnupcoming_viewall}>
                <a href="/matches">View all</a>
              </span>
            </div>
            <div className={styles.sport__livenupcoming_grid}>
              {this.state.newestMatches.length > 0 ? (
                this.state.newestMatches.map(liveSoc => {
                  // console.log('aaaaaa', liveSoc)
                  return (
                    <Link key={liveSoc.id} to={`/watch?v=${liveSoc ? `${liveSoc.id.replace('Sport-', '')}` : ''}`} className={styles.sport_match_container}>
                      <LazyLoad containerClassName={styles.sport__livenupcoming_schedule}>
                        <div>
                          <div>
                            <span className={styles.sport_youtube_img} />
                            <div className={styles.sport__schedule_item}>
                              <div className={styles.sport__team_logo}>
                                <span className={styles.sport__defaultlogoteam}>{/*note: field hit image macth team 1 (not available) */}</span>
                                <h6 className={styles.sport_team_name}>{liveSoc.title}</h6>
                              </div>
                              <div className={styles.sport__infolive_upcoming}>
                                <h5 className={styles.sport__info_live_now}>Live Now {/*note: field hit kemana untuk live now */}</h5>
                                <h2 className={styles.sport__scoring}>0 - 0 {/* note: hit scoring ke field mana? */}</h2>
                                <h6 className={styles.livenowupcoming_penalty}>Pen. (3-4) {/*note: pen? */}</h6>
                                {/* <h6 className={styles.sport__subjectcontent}>
                                {liveSoc.description}
                                {/*English Premier League
                              </h6> */}
                              </div>
                              <div className={styles.sport__team_logo}>
                                <span className={styles.sport__defaultlogoteam}>{/* note: field hit image macth team 2 (not available) */}</span>
                                <h6 className={styles.sport_team_name}>{liveSoc.title}</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </LazyLoad>
                    </Link>
                  )
                })
              ) : (
                <div className={styles.defaultNoLive}>Tidak Ada Live Saat Ini</div>
              )}
            </div>
          </div>
        </LazyLoad>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  // console.log('live now value', state)
  return {
    ...state,
  }
}

const mapDispatchToProps = dispatch => ({
  onHandlePlaylist: () => dispatch(liveNowUpcomingActions.getSportCategoryList()),
  onHandleVideo: playlist => dispatch(liveNowUpcomingActions.getSportVideo(playlist)),
  // onHandleMatchDetail: () => dispatch(liveNowUpcomingActions.getMatchDetail()),
  onUpdatePlaylist: id => dispatch(liveNowUpcomingActions.updateActivePlaylist(id)),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(liveNowUpComing)
