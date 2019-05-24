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
    // const { onHandleMatchDetail } = this.props
    // onHandleMatchDetail()
    this.getShowMatchCards()
  }

  getShowMatchCards = () => {
    const validateMatch = this.props.sport.playlists.data[0].playlists
    if (validateMatch.meta.status == 'success') {
      const matchTeamSortedDate = validateMatch.data.sort((a, b) => a.startTime - b.startTime)
      const liveNowMatch = matchTeamSortedDate.filter(match => {
        return match.endTime * 1000 >= Date.now()
      })
      this.setState({
        newestMatches: liveNowMatch.slice(0, 4),
      })
    }
  }

  render() {
    const { playlists, videos } = this.props.sport
    // console.log('testing data liveupcoming', this.props.sport)

    return (
      <Fragment>
        <LazyLoad containerClassName={styles.sport_schedule_wrapper}>
          <div className={styles.lnupcoming_grid_label}>
            <span className={styles.lnupcoming_label}>Live now and upcoming</span>
            <span className={styles.lnupcoming_viewall}>
              <a href="/matches">View all</a>
            </span>
          </div>
          <div className={styles.sport__livenupcoming_grid}>
            {this.state.newestMatches.length > 0 ? (
              this.state.newestMatches.map(liveSoc => {
                return (
                  <Link key={liveSoc.id} to={'/watch?v=vd56611105'} className={styles.sport_match_container}>
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
        </LazyLoad>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

const mapDispatchToProps = dispatch => ({
  // onHandleMatchDetail: () => dispatch(liveNowUpcomingActions.getSportList()),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(liveNowUpComing)
