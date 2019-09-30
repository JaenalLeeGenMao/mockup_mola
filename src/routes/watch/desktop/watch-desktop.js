import React, { Component } from 'react'
import { connect } from 'react-redux'
import _get from 'lodash/get'
import { post } from 'axios'
import Moment from 'moment'
import _isUndefined from 'lodash/isUndefined'
import ReactTooltip from 'react-tooltip'

import config from '@source/config'
import { defaultVideoSetting } from '@source/lib/theoplayerConfig.js'
import { isMovie, getContentTypeName } from '@source/lib/globalUtil'
import Tracker from '@source/lib/tracker'
import watchPermission from '@source/lib/watchPermission'

import { getVUID_retry } from '@actions/vuid'

import PlatformDesktop from '@components/PlatformCheck'
import Header from '@components/Header'
import CountDown from '@components/CountDown'
import OfflineNoticePopup from '@components/OfflineNoticePopup'
import AgeRestrictionModal from '@components/AgeRestriction'
import UpcomingVideo from '../upcoming-video'
import PlayerHeader from '../player-header'

// import AgeRestrictionModal from '@components/AgeRestriction'
// import { Overview as ContentOverview, Review as ContentReview, Trailer as ContentTrailer, Suggestions as ContentSuggestions } from './content'

import {
  headerContainer,
  movieDetailContainer,
  movieDetailNotAvailableContainer,
  videoPlayerWrapper,
  videoPlayerContainer,
  videoPlayerContainer__nobar,
  videoPlayerInfoWrapper,
  PeopleWrapper,
  customTooltipTheme,
  movieDetailBottom,
  infoBar,
  infoBarContainer,
  infoBarText,
  infoBarClose,
  videoInnerContainer,
  movieDetailNotAllowed,
} from './style'

import { customTheoplayer } from './theoplayer-style'
// const { getComponent } = require('../../../../../gandalf')
const { getComponent } = require('@supersoccer/gandalf')
const Theoplayer = getComponent('theoplayer')

// let MissChat
import { Suggestions as ContentSuggestions } from './movie/content'
let errorFlag = 0

class WatchDesktop extends Component {
  state = {
    movieDetail: [],
    loc: '',
    countDownStatus: true,
    toggleInfoBar: this.props.configParams.data ? this.props.configParams.data.notice_bar_enabled : true,
    notice_bar_message: this.props.configParams.data
      ? this.props.configParams.data.notice_bar_message
      : 'Siaran Percobaan',
    isOnline: navigator && typeof navigator.onLine === 'boolean' ? navigator.onLine : true,
    showOfflinePopup: false,
    nextVideoBlocker: false,
    nextVideoClose: false,
    errorLicense: false,
  }

  handleOnReadyStateChange = player => {
    // console.log("player", player.duration)
    const playerButton = document.querySelector('.vjs-button')
    /** handle keyboard pressed */
    document.onkeyup = event => {
      switch (event.which || event.keyCode) {
        case 13 /* enter */:
          if (player.src) {
            playerButton.click()
          }
          break
        case 32 /* space */:
          if (player.src) {
            playerButton.click()
          }
          break
        default:
          event.preventDefault()
          break
      }
    }

    this.player = player
    this.trackedDuration = [] /** important note: prevent tracker fire 4 times */

    if (player && player.buffered.length > 0) {
      this.detectorConnection(player)
    }

    player.addEventListener('contentprotectionerror', e => {
      if (e.error.toLowerCase() == 'error during license server request') {
        errorFlag = errorFlag + 1
        if (errorFlag < 2) {
          this.props.getVUID_retry()
        } else if (errorFlag > 6) {
          //every error license will execute six times
          this.setState({ errorLicense: true })
        }
      } else {
        // console.log('ERROR content protection', e)
        // this.handleVideoError(e);
      }
    })
  }

  handleOnVideoPlaying = (status, player) => {
    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent)
    let i = 0
    if (isSafari && player.textTracks && player.textTracks.length > 0) {
      // to hide empty subtitle in safari
      player.textTracks.map(element => {
        if (!element.id) {
          if (player.textTracks.length > 1) {
            const el = document.getElementsByClassName('theo-menu-item vjs-menu-item theo-text-track-menu-item')
            el[i].style.display = 'none'
          } else {
            const subtitle = document.querySelector('.vjs-icon-subtitles')
            subtitle.style.display = 'none'
          }
        } else {
          i++
        }
      })
    }
  }

  detectorConnection = player => {
    if (!this.state.isOnline && Math.ceil(player.currentTime) >= Math.floor(player.buffered.end(0))) {
      setTimeout(() => {
        this.setState({
          showOfflinePopup: true,
        })
      }, 3000)
    } else if (this.state.isOnline && this.state.showOfflinePopup) {
      this.setState({
        showOfflinePopup: false,
      })
    }
  }

  goOnline = () => {
    if (!this.state.isOnline) {
      this.setState({
        isOnline: true,
      })
    }
  }

  goOffline = () => {
    if (this.state.isOnline) {
      this.setState({
        isOnline: false,
      })
    }
  }

  handleCloseOfflinePopup = () => {
    this.setState({
      showOfflinePopup: false,
    })
  }

  handleOnVideoVolumeChange = player => {
    if (player) {
      const playerVolumeInfo = {
        volume: player.volume,
        muted: player.muted,
      }
      try {
        localStorage.setItem('theoplayer-volume-info', JSON.stringify(playerVolumeInfo))
      } catch (err) {}
    }
  }

  subtitles() {
    const { movieDetail } = this.props
    const subtitles =
      movieDetail.data.length > 0 && movieDetail.data[0].subtitles ? movieDetail.data[0].subtitles : null
    const myTheoPlayer =
      subtitles &&
      subtitles.length > 0 &&
      subtitles.map(({ subtitleUrl, country, type = 'subtitles' }) => {
        const arrSubType = subtitleUrl.split('.')
        const subtitleType = arrSubType[arrSubType.length - 1] || 'vtt'
        return {
          kind: type,
          src: subtitleUrl,
          label: country,
          type: subtitleType,
        }
      })
    return myTheoPlayer
  }

  disableAds = (status, videoSettings) => {
    status === 'success' && (videoSettings.adsBannerOptions.ipaEnabled = false)
    status === 'success' && (videoSettings.adsBannerOptions.araEnabled = false)
    status === 'success' && (videoSettings.adsSource = '')
    status === 'success' && (videoSettings.adsBannerUrl = '')

    return videoSettings
  }

  getLoc = () => {
    const geolocation = Tracker.getLangLat()
    const latitude =
      geolocation && geolocation.length > 0 && geolocation.split(',').length == 2 ? geolocation.split(',')[0] : ''
    const longitude =
      geolocation && geolocation.length > 0 && geolocation.split(',').length == 2 ? geolocation.split(',')[1] : ''
    const locationUrl = `${config.endpoints.ads}/v1/ads/sentadv-ads-manager/api/v1/sign-location?app_id=mola_ads`
    const body = {
      lat: parseFloat(latitude),
      long: parseFloat(longitude),
    }
    let loc = ''

    if (typeof latitude !== 'undefined' && typeof longitude !== 'undefined' && latitude !== '' && longitude !== '') {
      post(locationUrl, body)
        .then(response => {
          if (response.status === 200) {
            loc = typeof response.data.data.loc !== 'undefined' ? response.data.data.loc : ''
            this.setState({
              loc: loc,
            })
          } else {
            this.setState({
              loc: '',
            })
          }
        })
        .catch(err => {
          this.setState({
            loc: '',
          })
        })
    }
  }

  // getConfig = async () => {
  //   const { configParams } = this.props
  //   if (configParams.data) {
  //     const { notice_bar_enabled, notice_bar_message } = configParams.data
  //     this.setState({
  //       toggleInfoBar: notice_bar_enabled,
  //       notice_bar_message,
  //     })
  //   }
  // }

  componentDidMount() {
    const { user, videoId, movieDetail, configParams } = this.props

    this.getLoc()

    if (!_isUndefined(window)) {
      window.addEventListener('online', this.goOnline)
      window.addEventListener('offline', this.goOffline)
    }

    if (movieDetail) {
      if (movieDetail.meta.status === 'success') {
        const { nextVideoClose } = this.state
        const { data: vuid, meta: { status: vuidStatus } } = this.props.vuid

        const dataFetched = movieDetail.data.length > 0 ? movieDetail.data[0] : undefined

        let handleNextVideo = null
        if (
          !nextVideoClose &&
          getContentTypeName(dataFetched.contentType) !== 'live' &&
          getContentTypeName(dataFetched.contentType) !== 'trailers'
        ) {
          handleNextVideo = this.handleNextVideo
        }

        const videoSettingProps = {
          akamai_analytic_enabled:
            configParams && configParams.data ? configParams.data.akamai_analytic_enabled : false,
        }

        const defaultVidSetting = dataFetched
          ? defaultVideoSetting(
              user,
              dataFetched,
              vuidStatus === 'success' ? vuid : '',
              handleNextVideo,
              videoSettingProps
            )
          : {}

        this.setState({
          defaultVidSetting: defaultVidSetting,
        })

        if (window) {
          const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent)
          const videoContainer = document.getElementById('videoContainer').clientHeight
          const videoWrapper = document.getElementById('videoWrapper').clientHeight
          document.querySelector('#detailBottom > div').style.height = isSafari
            ? `${videoContainer - videoWrapper - 60}px`
            : 'calc(26vh - 60px)'
          window.addEventListener('resize', this.handleWindowSizeChange)
        }
      }
    }
  }

  componentWillUnmount() {
    if (!_isUndefined(window)) {
      window.removeEventListener('online', this.goOnline)
      window.removeEventListener('offline', this.goOffline)
    }
  }

  handleNextVideo = (isShow = false) => {
    if (isShow) {
      this.setState({
        nextVideoBlocker: true,
      })
    }
  }

  renderVideo = dataFetched => {
    const {
      user,
      getMovieDetail,
      videoId,
      blocked,
      iconStatus,
      status,
      icon,
      name,
      isAutoPlay,
      isMatchPassed,
      configParams,
    } = this.props
    let theoVolumeInfo = {}

    try {
      theoVolumeInfo = localStorage.getItem('theoplayer-volume-info') || '{"muted": false,"volume": 1}'
      if (theoVolumeInfo != null) {
        theoVolumeInfo = JSON.parse(theoVolumeInfo)
      }
    } catch (err) {}

    if (dataFetched) {
      const permission = watchPermission(dataFetched.permission, this.props.user.sid)
      const isAllowed = permission.isAllowed
      let watchPermissionErrorCode = permission.errorCode

      const { loc, nextVideoBlocker, nextVideoClose, defaultVidSetting } = this.state
      const { data: vuid, meta: { status: vuidStatus } } = this.props.vuid

      const poster = dataFetched ? dataFetched.background.landscape : ''

      const adsFlag = dataFetched ? _get(dataFetched, 'ads', null) : null
      user.loc = loc

      // let handleNextVideo = null
      // if (
      //   !nextVideoClose &&
      //   getContentTypeName(dataFetched.contentType) !== 'live' &&
      //   getContentTypeName(dataFetched.contentType) !== 'trailers'
      // ) {
      //   handleNextVideo = this.handleNextVideo
      // }

      // const videoSettingProps = {
      //   akamai_analytic_enabled: configParams && configParams.data ? configParams.data.akamai_analytic_enabled : false,
      // }

      // const defaultVidSetting = dataFetched
      //   ? defaultVideoSetting(
      //     user,
      //     dataFetched,
      //     vuidStatus === 'success' ? vuid : '',
      //     handleNextVideo,
      //     videoSettingProps
      //   )
      //   : {}

      const checkAdsSettings =
        adsFlag !== null && adsFlag <= 0 ? this.disableAds('success', defaultVidSetting) : defaultVidSetting

      const videoSettings = {
        ...theoVolumeInfo,
        ...checkAdsSettings,
      }

      // Block if the video is not available in web & app
      if (blocked) {
        return (
          <>
            <PlatformDesktop
              iconStatus={iconStatus}
              status={status}
              icon={icon}
              name={name}
              // title={apiFetched ? dataFetched.title : ''}
              portraitPoster={poster ? dataFetched.background.landscape : ''}
              user={this.props.user}
              videoId={this.props.videoId}
            />
          </>
        )
      } else {
        // Block if user is not logged in
        if (!isAllowed) {
          if (watchPermissionErrorCode == 'login_first') {
            return (
              <div className={movieDetailNotAllowed}>
                <p>
                  Silahkan{' '}
                  <a style={{ color: '#005290' }} href={`/accounts/login?redirect_watch=${this.props.videoId}`}>
                    {' '}
                    login
                  </a>{' '}
                  untuk menyaksikan tayangan ini.
                </p>
              </div>
            )
          }
        }

        // Show countdown if it is a live match
        if (
          this.state.countDownStatus &&
          getContentTypeName(dataFetched.contentType) === 'live' &&
          dataFetched.startTime * 1000 > Date.now()
        ) {
          return (
            <CountDown
              hideCountDown={this.hideCountDown}
              startTime={dataFetched.startTime}
              videoId={videoId}
              getMovieDetail={getMovieDetail}
              isMobile={false}
            />
          )
        } else if (isMatchPassed) {
          return <div className={movieDetailNotAvailableContainer}>Pertandingan ini telah selesai</div>
        } else if (dataFetched.streamSourceUrl && defaultVidSetting) {
          // Else render, only if there's streamSourceUrl
          if (!this.state.errorLicense) {
            const autoPlay = isAutoPlay && !(dataFetched.suitableAge && dataFetched.suitableAge >= 18) ? true : false
            return (
              <>
                <Theoplayer
                  className={customTheoplayer}
                  subtitles={this.subtitles()}
                  poster={autoPlay ? null : poster}
                  autoPlay={autoPlay}
                  handleOnReadyStateChange={this.handleOnReadyStateChange}
                  handleOnVideoVolumeChange={this.handleOnVideoVolumeChange}
                  handleOnVideoPlaying={this.handleOnVideoPlaying}
                  {...videoSettings}
                >
                  <div className={videoInnerContainer}>
                    {nextVideoBlocker && !nextVideoClose && this.renderNextVideo(dataFetched)}
                    {this.renderPlayerHeader(dataFetched)}
                  </div>
                </Theoplayer>
                {dataFetched && dataFetched.suitableAge && dataFetched.suitableAge >= 18 && <AgeRestrictionModal />}
              </>
            )
          } else {
            return (
              <div className={movieDetailNotAvailableContainer}>
                Error during license server request. Please refresh the browser.
              </div>
            )
          }
        }
      }
    }
  }

  handleCancelUpcVideo = e => {
    // console.log("CANCEWL AJAJAJ")
    this.setState({
      nextVideoBlocker: false,
      nextVideoClose: true,
    })
  }

  renderNextVideo = () => {
    const { recommendation: { data: recomData } } = this.props
    let nextVideo = null
    if (recomData && recomData.length > 0) {
      if (recomData[0].video_id !== this.props.videoId) {
        nextVideo = recomData[0]
      } else if (recomData.length > 1) nextVideo = recomData[1]
    }

    if (nextVideo) {
      return <UpcomingVideo data={nextVideo} handleCancelVideo={this.handleCancelUpcVideo} />
    }
  }

  renderPlayerHeader = dataFetched => {
    if (dataFetched) {
      return <PlayerHeader data={dataFetched} />
    }
  }

  hideCountDown = () => {
    this.setState({
      countDownStatus: false,
    })
  }

  handleCloseInfoBar = () => {
    this.setState({
      toggleInfoBar: false,
    })
  }

  render() {
    const { isControllerActive, loc, showOfflinePopup } = this.state
    const { meta: { status: videoStatus }, data } = this.props.movieDetail
    const { user, videoId } = this.props
    const { data: vuid, meta: { status: vuidStatus } } = this.props.vuid

    const dataFetched = videoStatus === 'success' && data.length > 0 ? data[0] : undefined
    let drmStreamUrl = '',
      isDRM = false
    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent)
    if (videoStatus === 'success') {
      drmStreamUrl = isSafari ? dataFetched?.drm?.fairplay?.streamUrl : dataFetched?.drm?.widevine?.streamUrl
    }
    isDRM = drmStreamUrl ? true : false

    const loadPlayer = dataFetched && ((isDRM && vuidStatus === 'success') || !isDRM)
    let hiddenController = []
    if (dataFetched && dataFetched.trailers.length === 0) {
      hiddenController.push('trailers')
    }
    if (dataFetched && dataFetched.quotes.length === 0) {
      hiddenController.push('review')
    }

    const isLiveMatch = getContentTypeName(dataFetched.contentType) === 'live'
    // const isLiveMatch = true

    const { toggleInfoBar, notice_bar_message } = this.state
    let isMatchPassed = false
    if (dataFetched && dataFetched.endTime < Date.now() / 1000) {
      isMatchPassed = true
    }

    const playerClass = toggleInfoBar && !isMatchPassed ? videoPlayerContainer : videoPlayerContainer__nobar
    return (
      <>
        {dataFetched && (
          <>
            <div className={headerContainer}>
              <Header {...this.props} activeMenuId={dataFetched.menuId} />
            </div>
            {showOfflinePopup && <OfflineNoticePopup />}
            <div className={movieDetailContainer} id="videoContainer">
              <div className={videoPlayerWrapper} id="videoWrapper">
                {toggleInfoBar &&
                  !isMatchPassed && (
                    <div className={infoBar}>
                      <div className={infoBarContainer}>
                        <div className={infoBarText}>{notice_bar_message}</div>
                        <div className={infoBarClose} onClick={this.handleCloseInfoBar}>
                          <span />
                        </div>
                      </div>
                    </div>
                  )}
                <div className={playerClass} id="video-player-root">
                  {loadPlayer ? (
                    <>{this.renderVideo(dataFetched)}</>
                  ) : (
                    <div className={movieDetailNotAvailableContainer}>Video Not Available</div>
                  )}
                  <div className={`${videoPlayerInfoWrapper} ${isLiveMatch ? 'live' : ''}`}>
                    <div className="player__info_grid_title">
                      <h1>{dataFetched.title}</h1>
                      <div>
                        {videoDuration && <span>{videoDuration}</span>}
                        {dataFetched.genre.length > 0 && <span>{dataFetched.genre[0]}</span>}
                        {dataFetched.suitableAge && <span className="border">{dataFetched.suitableAge}+</span>}
                      </div>
                    </div>
                    <div className="player__info_grid_desc">
                      <p>{dataFetched.description}</p>
                    </div>
                    <div className="player__info_grid_cast">
                      {dataFetched.people.length > 0 && (
                        <>
                          <strong>Cast & Crew</strong>
                          <div className={customTooltipTheme}>
                            {dataFetched.people.map(person => {
                              return (
                                <>
                                  <PeopleWrapper
                                    data-tip={person.attributes.name}
                                    data-for={person.attributes.name}
                                    src={person.attributes.imageUrl}
                                  />
                                  <ReactTooltip
                                    id={person.attributes.name}
                                    aria-haspopup="true"
                                    effect="solid"
                                    className="grey"
                                  >
                                    <p>{person.attributes.name}</p>
                                  </ReactTooltip>
                                </>
                              )
                            })}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="player__info_grid_chat">{isLiveMatch && <div> </div>}</div>
                  </div>
                </div>
              </div>
              {this.props.recommendation.data.length > 0 && (
                <div className={movieDetailBottom} id="detailBottom">
                  <div className="recommendationWrapper">
                    <p className="title">Related Video</p>
                    <ContentSuggestions videos={this.props.recommendation.data} contentType={dataFetched.contentType} />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

const mapDispatchToProps = dispatch => ({
  getVUID_retry: () => dispatch(getVUID_retry()),
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchDesktop)
