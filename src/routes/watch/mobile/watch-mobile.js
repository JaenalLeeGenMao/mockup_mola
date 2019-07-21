import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import _get from 'lodash/get'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { get } from 'axios'

import { notificationBarBackground, logoLandscapeBlue } from '@global/imageUrl'
import { defaultVideoSetting } from '@source/lib/theoplayerConfig.js'
import { updateCustomMeta } from '@source/DOMUtils'
import config from '@source/config'

import Tracker from '@source/lib/tracker'
import { isMovie } from '@source/lib/globalUtil'
import recommendationActions from '@actions/recommendation'
import { getVUID_retry } from '@actions/vuid'

import MovieDetailError from '@components/common/error'
// import { Synopsis as ContentSynopsis, Review as ContentReview, Creator as ContentCreator, Suggestions as ContentSuggestions, Trailer as ContentTrailer } from './content'

import { movieDetailContainer, movieDetailNotAvailableContainer, videoPlayerContainer, videoTitle, playMovieButton, playMovieIcon, posterWrapper, playIcon } from './style'

import { customTheoplayer } from './theoplayer-style'
// const { getComponent } = require('../../../../../gandalf')
const { getComponent } = require('@supersoccer/gandalf')
const Theoplayer = getComponent('theoplayer')
class MovieDetail extends Component {
  state = {
    loc: '',
  }
  subtitles() {
    const { movieDetail } = this.props
    const subtitles = movieDetail.data.length > 0 && movieDetail.data[0].subtitles ? movieDetail.data[0].subtitles : null

    const myTheoPlayer =
      subtitles &&
      subtitles.map(({ subtitleUrl, country }) => ({
        kind: 'subtitles',
        src: subtitleUrl,
        label: country,
        type: 'srt',
      }))

    return myTheoPlayer
  }

  disableAds = (status, videoSettings) => {
    status === 'success' && (videoSettings.adsBannerOptions.ipaEnabled = false)
    status === 'success' && (videoSettings.adsBannerOptions.araEnabled = false)
    status === 'success' && (videoSettings.adsSource = '')
    status === 'success' && (videoSettings.adsBannerUrl = '')

    return videoSettings
  }

  getLoc = async () => {
    const geolocation = Tracker.getLangLat()
    const latitude = geolocation && geolocation.split(',').length == 2 ? geolocation.split(',')[0] : ''
    const longitude = geolocation && geolocation.split(',').length == 2 ? geolocation.split(',')[1] : ''

    const locationPayload = await get(`/sign-location?lat=${latitude}&long=${longitude}`)

    const loc = locationPayload.data.data.loc

    this.setState({
      loc: loc,
    })
  }

  componentDidMount() {
    const {
      fetchRecommendation,
    } = this.props

    this.getLoc()
    // fetchRecommendation(movieId)
  }

  handlePlayMovie = () => {
    const { movieId, runtime: { appPackage } } = this.props
    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent)
    if (!isSafari) {
      const domain = config.endpoints.domain
      // console.log('appPackage', appPackage)
      const url = encodeURIComponent(`${domain}/download-app/${movieId}`)
      // document.location = `intent://scan/#Intent;scheme=molaapp;package=com.molademo;S.browser_fallback_url=${url};end`
      document.location = `intent://mola.tv/watch?v=${movieId}/#Intent;scheme=molaapp;package=tv.mola.app;S.browser_fallback_url=${url};end`
    }
  }

  renderVideo = (poster, videoSettings) => {
    const isApple = /.*AppleWebKit.*/.test(navigator.userAgent)
    if (isApple) {
      return (
        <Theoplayer
          className={customTheoplayer}
          subtitles={this.subtitles()}
          poster={poster}
          autoPlay={false}
          // certificateUrl="test"
          handleOnVideoLoad={this.handleOnVideoLoad}
          handleOnVideoPause={this.handleOnVideoPause}
          handleOnLoadedData={this.handleOnLoadedData}
          handleOnReadyStateChange={this.handleOnReadyStateChange}
          showBackBtn={false}
          {...videoSettings}
          isMobile
        />
      )
    } else {
      return (
        <div className={posterWrapper}>
          <img src={poster} />
          <span className={playIcon} onClick={this.handlePlayMovie} />
        </div>
      )
    }
  }

  render() {
    const { loc } = this.state
    const { meta: { status, error }, data } = this.props.movieDetail
    const apiFetched = status === 'success' && data.length > 0
    const dataFetched = apiFetched ? data[0] : undefined
    const poster = apiFetched ? dataFetched.background.landscape : ''

    const { user, recommendation, movieDetail: { data: movieDetailData } } = this.props
    const { data: vuid, meta: { status: vuidStatus } } = this.props.vuid
    user.loc = loc
    const adsFlag = status === 'success' ? _get(movieDetailData, 'movieDetailData[0].ads', null) : null
    const defaultVidSetting = status === 'success' ? defaultVideoSetting(user, dataFetched, vuidStatus === 'success' ? vuid : '') : {}

    const checkAdsSettings = adsFlag !== null && adsFlag <= 0 ? this.disableAds(status, defaultVidSetting) : defaultVidSetting

    const videoSettings = {
      ...checkAdsSettings,
    }

    let drmStreamUrl = '',
      isDRM = false
    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent)
    if (status === 'success' && dataFetched.drm && dataFetched.drm.widevine && dataFetched.drm.fairplay) {
      drmStreamUrl = isSafari ? dataFetched.drm.fairplay.streamUrl : dataFetched.drm.widevine.streamUrl
    }
    isDRM = drmStreamUrl ? true : false

    const loadPlayer = status === 'success' && ((isDRM && vuidStatus === 'success') || !isDRM)
    const isMovieBool = isMovie(dataFetched.contentType)
    return (
      <>
        {dataFetched && (
          <>
            <div className={movieDetailContainer}>
              <div className={videoPlayerContainer}>{loadPlayer ? <>{this.renderVideo(poster, videoSettings)}</> : <div className={movieDetailNotAvailableContainer}>Video Not Available</div>}</div>
              <h1 className={videoTitle}>{dataFetched.title}</h1>
              {/* {dataFetched.trailers && dataFetched.trailers.length > 0 && <ContentTrailer videos={dataFetched.trailers} />}
              <ContentSynopsis content={dataFetched.description} />
              {dataFetched.people && dataFetched.people.length > 0 && <ContentCreator people={dataFetched.people} />}
              {dataFetched.quotes && dataFetched.quotes.length > 0 && <ContentReview review={dataFetched} />}
              {recommendation.meta.status === 'success' && <ContentSuggestions videos={recommendation.data} />} */}
            </div>
          </>
        )}
        {!dataFetched && status === 'error' && <MovieDetailError message={error} />}
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
  fetchRecommendation: movieId => dispatch(recommendationActions.getRecommendation(movieId)),
  getVUID_retry: () => dispatch(getVUID_retry()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail)
