import React, { Component } from 'react'
import { connect } from 'react-redux'
import _get from 'lodash/get'
import { post } from 'axios'
import _isUndefined from 'lodash/isUndefined'
import queryString from 'query-string'

import { globalTracker } from '@source/lib/globalTracker'
import { playStoreBadge, appStoreBadge } from '@global/imageUrl'

// import { defaultVideoSetting } from '@source/lib/theoplayerConfig.js'
import { defaultVideoSetting } from '@source/lib/playerConfig.js'
import config from '@source/config'
import Tracker from '@source/lib/tracker'
import { isMovie, getContentTypeName } from '@source/lib/globalUtil'
import { getVUID_retry } from '@actions/vuid'
import watchPermission from '@source/lib/watchPermission'
import AgeRestrictionModal from '@components/AgeRestriction'
import PlatformCheckMobile from '@components/PlatformCheckMobile'

import Header from '@components/Header'
import CountDown from '@components/CountDown'
import OfflineNoticePopup from '@components/OfflineNoticePopup'
import PlayerHeader from '../player-header'

import VOPlayer from '@components/VOPlayer'
// import { Synopsis as ContentSynopsis, Review as ContentReview, Creator as ContentCreator, Suggestions as ContentSuggestions, Trailer as ContentTrailer } from './content'
import UpcomingVideo from '../upcoming-video'

import {
  movieDetailContainer,
  movieDetailNotAvailableContainer,
  videoPlayerContainer,
  videoTitle,
  countdownWinfobar,
  countdownWOinfobar,
  infoBar,
  infoBarContainer,
  infoBarClose,
  infoBarText,
  posterWrapper,
  playIcon,
  movieDetailNotAllowed,
  headerContainer,
  videoInnerContainer,
  videoBlockerPlatform,
} from './style'

import { customTheoplayer } from './theoplayer-style'
// const { getComponent } = require('../../../../../gandalf')
const { getComponent } = require('@supersoccer/gandalf')
const Theoplayer = getComponent('theoplayer')

import MovieContent from './movie'
import SportContent from './sport'

let errorFlag = 0
const defaultTextDownloadApp =
  'Untuk menyaksikan tayangan ini, silakan unduh aplikasi Mola TV melalui tombol di bawah ini'
class MovieDetail extends Component {
  state = {
    loc: '',
    countDownStatus: true,
    toggleInfoBar: this.props.configParams.data ? this.props.configParams.data.notice_bar_enabled : true,
    android_redirect_to_app: this.props.configParams.data
      ? this.props.configParams.data.android_redirect_to_app
      : false,
    ios_redirect_to_app: this.props.configParams.data ? this.props.configParams.data.ios_redirect_to_app : false,
    android_text_download_app: _get(this.props, 'configParams.data.android_text_download_app', defaultTextDownloadApp),
    ios_text_download_app: _get(this.props, 'configParams.data.ios_text_download_app', defaultTextDownloadApp),
    notice_bar_message: this.props.configParams.data
      ? this.props.configParams.data.notice_bar_message
      : 'Siaran Percobaan',
    isOnline: navigator && typeof navigator.onLine === 'boolean' ? navigator.onLine : true,
    showOfflinePopup: false,
    nextVideoBlocker: false,
    nextVideoClose: false,
    errorLicense: false,
    store_url: '',
    ios_store_url: '',
    badgeUrl: '',
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

  // getConfig = () => {
  //   const { configParams } = this.props
  //   if (configParams.data) {
  //     const { android_redirect_to_app, ios_redirect_to_app, notice_bar_enabled, notice_bar_message } = configParams.data
  //     this.setState({
  //       android_redirect_to_app,
  //       ios_redirect_to_app,
  //       toggleInfoBar: notice_bar_enabled,
  //       notice_bar_message,
  //     })
  //   }
  // }

  componentDidMount() {
    this.getLoc()
    this.getConfig()
    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const badgeUrl = isApple ? appStoreBadge : playStoreBadge
    this.setState({
      badgeUrl: badgeUrl,
    })

    if (!_isUndefined(window)) {
      window.addEventListener('online', this.goOnline)
      window.addEventListener('offline', this.goOffline)
    }
  }

  getConfig = async () => {
    const { configParams } = this.props
    if (configParams.data) {
      const { store_url, ios_store_url } = configParams.data
      this.setState({
        store_url,
        ios_store_url,
      })
    }
  }

  componentWillUnmount() {
    if (!_isUndefined(window)) {
      window.removeEventListener('online', this.goOnline)
      window.removeEventListener('offline', this.goOffline)
    }
  }

  handlePlayMovie = () => {
    const { videoId } = this.props
    const domain = config.endpoints.domain
    let urlParams = queryString.parse(window.location.search)
    const source = urlParams.utm_source ? urlParams.utm_source : 'redirect-from-browser'
    const medium = urlParams.utm_medium ? urlParams.utm_medium : ''
    const campaign = urlParams.utm_campaign ? urlParams.utm_campaign : ''
    const url = encodeURIComponent(
      `${domain}/download-app/${videoId}?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`
    )
    document.location = `intent://mola.tv/watch?v=${videoId}&utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}/#Intent;scheme=molaapp;package=tv.mola.app;S.browser_fallback_url=${url};end`
  }

  handlePlayMovieApple = () => {
    const { videoId } = this.props
    const domain = config.endpoints.domain
    let urlParams = queryString.parse(window.location.search)
    const source = urlParams.utm_source ? urlParams.utm_source : 'redirect-from-browser'
    const medium = urlParams.utm_medium ? urlParams.utm_medium : ''
    const campaign = urlParams.utm_campaign ? urlParams.utm_campaign : ''
    const url = `${domain}/download-app/${videoId}?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`
    document.location = `molaapp://mola.tv/watch?v=${videoId}&utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`
    setTimeout(function() {
      window.location.href = url
    }, 250)
  }

  // handleOnReadyStateChange = player => {
  //   this.player = player
  //   this.trackedDuration = [] /** important note: prevent tracker fire 4 times */

  //   if (player && player.buffered.length > 0) {
  //     this.detectorConnection(player)
  //   }

  //   player.addEventListener('contentprotectionerror', e => {
  //     if (e.error.toLowerCase() == 'error during license server request') {
  //       errorFlag = errorFlag + 1
  //       if (errorFlag < 2) {
  //         this.props.getVUID_retry()
  //       } else if (errorFlag > 6) {
  //         //every error license will execute six times
  //         this.setState({ errorLicense: true })
  //       }
  //     } else {
  //       // console.log('ERROR content protection', e)
  //       // this.handleVideoError(e);
  //     }
  //   })
  // }

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

  handleNextVideo = (isShow = false) => {
    if (isShow) {
      this.setState({
        nextVideoBlocker: true,
      })
    }
  }

  renderVideo = dataFetched => {
    const { user, getMovieDetail, videoId, isMatchPassed, isAutoPlay, configParams } = this.props
    let playerVolumeInfo = {}

    try {
      playerVolumeInfo = localStorage.getItem('voplayer-volume-info') || '{"muted": false,"volume": 1}'
      if (playerVolumeInfo != null) {
        playerVolumeInfo = JSON.parse(playerVolumeInfo)
      }
    } catch (err) {}

    const {
      toggleInfoBar,
      ios_redirect_to_app,
      android_redirect_to_app,
      nextVideoBlocker,
      nextVideoClose,
      defaultVidSetting,
    } = this.state
    if (dataFetched && defaultVidSetting) {
      const { loc } = this.state
      const { data: vuid, meta: { status: vuidStatus } } = this.props.vuid

      const poster = dataFetched ? `${dataFetched.background.landscape}?w=720` : ''

      const adsFlag = dataFetched ? _get(dataFetched, 'ads', null) : null
      user.loc = loc

      let handleNextVideo = null
      if (
        !nextVideoClose &&
        getContentTypeName(dataFetched.contentType) !== 'live' &&
        getContentTypeName(dataFetched.contentType) !== 'trailers'
      ) {
        handleNextVideo = this.handleNextVideo
      }

      const videoSettingProps = {
        akamai_analytic_enabled: configParams && configParams.data ? configParams.data.akamai_analytic_enabled : false,
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

      const checkAdsSettings =
        adsFlag !== null && adsFlag <= 0 ? this.disableAds('success', defaultVidSetting) : defaultVidSetting

      const videoSettings = {
        ...playerVolumeInfo,
        ...checkAdsSettings,
      }

      const permission = watchPermission(dataFetched.permission, this.props.user.sid)
      const isAllowed = permission.isAllowed
      let watchPermissionErrorCode = permission.errorCode

      const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent)

      let isRedirectToApp = false
      if (isApple) {
        //ios
        if (ios_redirect_to_app) {
          isRedirectToApp = true
          return (
            <div className={posterWrapper}>
              <img src={poster} />
              <span className={playIcon} onClick={this.handlePlayMovieApple} />
            </div>
          )
        }
      } else {
        if (android_redirect_to_app) {
          isRedirectToApp = true
          return (
            <div className={posterWrapper}>
              <img src={poster} />
              <span className={playIcon} onClick={this.handlePlayMovie} />
            </div>
          )
        }
      }

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

      const countDownClass = toggleInfoBar && !isMatchPassed ? countdownWinfobar : countdownWOinfobar
      if (
        this.state.countDownStatus &&
        getContentTypeName(dataFetched.contentType) === 'live' &&
        dataFetched.startTime * 1000 > Date.now()
      ) {
        return (
          <CountDown
            className={countDownClass}
            hideCountDown={this.hideCountDown}
            startTime={dataFetched.startTime}
            videoId={videoId}
            getMovieDetail={getMovieDetail}
            isMobile={true}
          />
        )
      } else if (isMatchPassed) {
        return <div className={movieDetailNotAvailableContainer}>Pertandingan ini telah selesai</div>
      } else if (!isRedirectToApp) {
        if (!this.state.errorLicense) {
          const autoPlay = isAutoPlay && !(dataFetched.suitableAge && dataFetched.suitableAge >= 18) ? true : false
          return (
            <>
              <VOPlayer
                deviceId={vuid}
                title={dataFetched.title}
                poster={poster}
                autoPlay={false}
                subtitles={this.subtitles()}
                streamSourceUrl={dataFetched.streamSourceUrl}
                recommendation={this.props.recommendation}
                {...videoSettings}
              >
                <div className={videoInnerContainer}>
                  {nextVideoBlocker && !nextVideoClose && this.renderNextVideo(dataFetched)}
                  {this.renderPlayerHeader(dataFetched)}
                </div>
              </VOPlayer>
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

  handleStoreTracker = () => {
    let urlParams = queryString.parse(window.location.search)
    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const payload = {
      window,
      user: this.props.user,
      linkRedirectUrl: isApple ? `redirect-to-appstore/${urlParams.v}` : `redirect-to-playstore/${urlParams.v}`,
      event: 'event_pages',
    }
    globalTracker(payload)
  }

  renderBlockerPlatformFooter() {
    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const { ios_redirect_to_app, android_redirect_to_app } = this.state
    const { store_url, ios_store_url, android_text_download_app, ios_text_download_app } = this.state

    const storeUrl = isApple ? ios_store_url : store_url
    const downloadText = isApple ? ios_text_download_app : android_text_download_app

    const renderTemplate = (
      <div className={videoBlockerPlatform}>
        <div className="wrap__info">
          <p className="text__info">{downloadText}</p>
          <a onClick={this.handleStoreTracker} href={storeUrl}>
            <img src={this.state.badgeUrl} alt="img-blocker-platform" className="img__info" />
          </a>
        </div>
      </div>
    )

    if (isApple) {
      //ios
      if (ios_redirect_to_app) {
        return renderTemplate
      }
    } else {
      if (android_redirect_to_app) {
        return renderTemplate
      }
    }
  }

  handleCancelUpcVideo = e => {
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
      return <UpcomingVideo data={nextVideo} isMobile={true} handleCancelVideo={this.handleCancelUpcVideo} />
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

  renderPlayerHeader = dataFetched => {
    if (dataFetched) {
      return <PlayerHeader data={dataFetched} />
    }
  }

  render() {
    const { loc, showOfflinePopup } = this.state
    const { meta: { status, error }, data } = this.props.movieDetail
    const apiFetched = status === 'success' && data.length > 0
    const dataFetched = apiFetched ? data[0] : undefined

    const { user, movieDetail: { data: movieDetailData } } = this.props
    const { data: vuid, meta: { status: vuidStatus } } = this.props.vuid
    const { blocked } = this.props
    const isDesktopVideoBlocker = this.props.configParams.data.desktop_video_blocker ? true : false
    // user.loc = loc
    // const adsFlag = status === 'success' ? _get(movieDetailData, 'movieDetailData[0].ads', null) : null
    // const defaultVidSetting = status === 'success' ? defaultVideoSetting(user, dataFetched, vuidStatus === 'success' ? vuid : '') : {}

    // const checkAdsSettings = adsFlag !== null && adsFlag <= 0 ? this.disableAds(status, defaultVidSetting) : defaultVidSetting

    // const videoSettings = {
    //   ...checkAdsSettings,
    // }

    let drmStreamUrl = '',
      isDRM = false
    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent)
    if (status === 'success' && dataFetched.drm && dataFetched.drm.widevine && dataFetched.drm.fairplay) {
      drmStreamUrl = isSafari ? dataFetched.drm.fairplay.streamUrl : dataFetched.drm.widevine.streamUrl
    }
    isDRM = drmStreamUrl ? true : false

    const loadPlayer = status === 'success' && ((isDRM && vuidStatus === 'success') || !isDRM)
    const isMovieBool = isMovie(dataFetched.contentType)

    const { toggleInfoBar, notice_bar_message } = this.state
    let isMatchPassed = false
    if (dataFetched && dataFetched.endTime < Date.now() / 1000) {
      isMatchPassed = true
    }

    if (blocked) {
      return <PlatformCheckMobile showHeader isDesktopVideoBlocker={isDesktopVideoBlocker} {...this.props} />
    }

    return (
      <>
        {dataFetched && (
          <>
            <div className={headerContainer}>
              <Header isMobile {...this.props} activeMenuId={dataFetched.menuId} />
            </div>
            {showOfflinePopup && <OfflineNoticePopup />}
            <div className={movieDetailContainer}>
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
              <div className={videoPlayerContainer} id="video-player-root">
                {loadPlayer ? (
                  <>{this.renderVideo(dataFetched)}</>
                ) : (
                  <div className={movieDetailNotAvailableContainer}>Video Not Available</div>
                )}
              </div>
              <h1 className={videoTitle}>{dataFetched.title}</h1>
              {isMovieBool && (
                <MovieContent dataFetched={dataFetched} fetchRecommendation={this.props.recommendation} />
              )}
              {!isMovieBool && <SportContent dataFetched={dataFetched} />}
            </div>
          </>
        )}

        <>{this.renderBlockerPlatformFooter()}</>
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail)
