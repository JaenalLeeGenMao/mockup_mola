import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { swipeGestureListener, getErrorCode } from '@routes/sport/util'

import liveNowUpcomingActions from '@actions/sport'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import LazyLoad from '@components/common/Lazyload'
import styles from './livenowupcoming.css'

import defaultTeamLogo from './../assets/defaultTeamLogo.png'

class liveNowUpComing extends Component {
  state = {
    playlists: [],
    videos: [],
  }

  render() {
    return (
      <Fragment>
        <LazyLoad>
          <div className={styles.sport_schedule_container}>
            <div className={styles.lnupcoming_grid_label}>
              <span className={styles.lnupcoming_label}>Live now and upcoming</span>
              <span className={styles.lnupcoming_viewall}>View all</span>
            </div>
            <div className={styles.sport__livenupcoming_grid}>
              <div className={styles.sport__livenupcoming_schedule}>
                <span className={styles.sport_youtube_img} />
                <div className={styles.sport__schedule_item}>
                  <div className={styles.sport__team_logo}>
                    <span className={styles.sport__defaultlogoteam} />
                    <h6 className={styles.sport_team_name}>Manchester United</h6>
                  </div>
                  <div className={styles.sport__infolive_upcoming}>
                    <h5 className={styles.sport__info_live_now}>Live Now*</h5>
                    <h2 className={styles.sport__scoring}>0 - 0</h2>
                    <h6>Pen. (3-4)</h6>
                    <h6 className={styles.sport__subjectcontent}>English Premier League</h6>
                  </div>
                  <div className={styles.sport__team_logo}>
                    <span className={styles.sport__defaultlogoteam} />
                    <h6 className={styles.sport_team_name}>Leicester City</h6>
                  </div>
                </div>
              </div>
              <div className={styles.sport__livenupcoming_schedule}>
                <div className={styles.sport__schedule_item}>
                  <div className={styles.sport__team_logo}>
                    <span className={styles.sport__defaultlogoteam} />
                    <h6 className={styles.sport_team_name}>Paris Saint German</h6>
                  </div>
                  <div className={styles.sport__infolive_upcoming}>
                    <h5 className={styles.sport__info_upcoming}>Upcoming</h5>
                    <h5>9.00PM</h5>
                    <h6 className={styles.sport__subjectcontent}>Ligue 1 France</h6>
                  </div>
                  <div className={styles.sport__team_logo}>
                    <span className={styles.sport__defaultlogoteam} />
                    <h6 className={styles.sport_team_name}>RC Strasbourg Alsace</h6>
                  </div>
                </div>
              </div>
              <div className={styles.sport__livenupcoming_schedule}>
                <div className={styles.sport__schedule_item}>
                  <div className={styles.sport__team_logo}>
                    <span className={styles.sport__defaultlogoteam} />
                    <h6 className={styles.sport_team_name}>Juventus</h6>
                  </div>
                  <div className={styles.sport__infolive_upcoming}>
                    <h5 className={styles.sport__info_tomorrow}>Tomorrow, 2 April</h5>
                    <h5>8.15PM</h5>
                    <h6 className={styles.sport__subjectcontent}>Serie A Italia</h6>
                  </div>
                  <div className={styles.sport__team_logo}>
                    <span className={styles.sport__defaultlogoteam} />
                    <h6 className={styles.sport_team_name}>RC Strasbourg Alsace</h6>
                  </div>
                </div>
              </div>
              <div className={styles.sport__livenupcoming_schedule}>
                <div className={styles.sport__schedule_item}>
                  <div className={styles.sport__team_logo}>
                    <span className={styles.sport__defaultlogoteam} />
                    <h6 className={styles.sport_team_name}>Tottenham Hotspurs</h6>
                  </div>
                  <div className={styles.sport__infolive_upcoming}>
                    <h5>Replay match</h5>
                    <h6 className={styles.sport__subjectcontent}>English Premier League</h6>
                  </div>
                  <div className={styles.sport__team_logo}>
                    <span className={styles.sport__defaultlogoteam} />
                    <h6 className={styles.sport_team_name}>Watford F.C</h6>
                  </div>
                </div>
              </div>
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
  // onHandlePlaylist: () => dispatch(sportActions.getSportCategoryList()),
  // onHandleVideo: playlist => dispatch(sportActions.getSportVideo(playlist)),
  // onUpdatePlaylist: id => dispatch(sportActions.updateActivePlaylist(id)),
  // onHandleLiveSoc: () => dispatch(sportAction.getLiveNowUpcomingCategoryList()),
  // onHandleVideoLiveSoc: playlist => dispatch(sportAction.getSportVideo(playlist)),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(liveNowUpComing)
