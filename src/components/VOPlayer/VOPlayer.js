import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import loadjs from 'loadjs'
import _get from 'lodash/get'

import UpcomingVideo from './upcoming-video'

import { VOStyle, VOScript, VOLicense } from './config'

import s from './VOPlayer.css'
// const { getComponent } = require('@supersoccer/gandalf')
let scriptIdInc = 0
var currentFilter = undefined
class VOPlayer extends Component {
  state = {
    isPlaying: this.props.autoplay || false,
    nextVideoClose: false,
  }

  onError = error => {
    // Log the error
    console.error('Player error: ', error)
    switch (error.code) {
      case 1001: // bad HTTP status
        console.error('HTTP error', error.data[1], 'on URI', error.data[0])
        break
    }
  }

  //WARNING: below is only an example of Fairplay license request filter. This implementation is not meant to be generic
  fairplayLicenseRequestFilter = request => {
    // process only fairplay licenses, all others will not be touched
    if (request.drm == 'com.apple.fps') {
      request.allowCrossSiteCredentials = true
      console.log('fairplayLicenseRequestFilter', request)
      // request body is already base-64 encoded
      var newBody = 'spc=' + request.body
      newBody += '&assetID=' + request.keyIds[0]
      // replace request body with newly crafted one
      request.body = newBody
      // add the content-type header matching the new body format
      request.headers['content-type'] = 'application/x-www-form-urlencoded'
    }
  }

  //WARNING: below is only an example of Fairplay license response filter. This implementation is not meant to be generic
  fairplayLicenseResponseFilter = response => {
    var keyText = response.data.trim()
    if (keyText.substr(0, 5) === '<ckc>' && keyText.substr(-6) === '</ckc>') {
      keyText = keyText.slice(5, -6)
    }
    console.log(keyText.indexOf('<FAIRPLAY_RESPONSE>'))
    if (keyText.indexOf('<FAIRPLAY_RESPONSE>') >= 0) {
      var esidx = keyText.search('</LICENSE>')
      keyText = keyText.slice(28, esidx)
      console.log(keyText)
    }
    response.data = keyText
  }

  formatQualityLevelForDisplay(level, forPrimaryDisplay, abrEnabled) {
    var formatedQuality = {
      text: '',
      isHD: false,
    }

    if (level.hasOwnProperty('height') && level.height > 0) {
      formatedQuality.text += "<span class='mp-quality-height'>" + level.height + 'p</span>'
      if (level.height >= 720) {
        formatedQuality.isHD = true
      }
    }
    if (level.bandwidth > 1000000) {
      var b = Math.round(level.bandwidth / 100000)
      formatedQuality.text += " <span class='mp-quality-bandwidth'>" + b / 10 + ' Mbps</span>'
    } else {
      var b = Math.round(level.bandwidth / 1000)
      formatedQuality.text += " <span class='mp-quality-bandwidth'>" + b + ' kbps</span>'
    }

    if (forPrimaryDisplay && abrEnabled) {
      formatedQuality.text = 'Auto ' + formatedQuality.text
    }

    if (formatedQuality.isHD) {
      formatedQuality.text += "<span class='mp-quality-hd'>HD</span>"
    }

    return formatedQuality
  }

  loadDynamicStyle = () => {
    let existingStyle = true
    VOStyle.map(dt => {
      const el = document.getElementById(dt.id)
      const elExist = el ? true : false
      existingStyle = existingStyle && elExist
    })

    if (!existingStyle) {
      VOStyle.map(dt => {
        const head = document.getElementsByTagName('head')[0]
        const link = document.createElement('link')
        link.id = dt.id
        link.rel = dt.rel
        link.type = dt.type
        link.href = dt.href
        link.media = dt.media
        head.appendChild(link)
      })
    }
  }

  loadDynamicScript() {
    const that = this
    let scriptArray = []
    VOScript.map(script => {
      scriptArray.push(script.src)
    })

    if (!loadjs.isDefined('voplayerjs')) {
      loadjs(scriptArray, 'voplayerjs', {
        success: function() {
          /* files loaded successfully */
          // console.log("script loaded successfully")
          that.loadVOPlayer()
        },
        async: false,
      })
    } else {
      /* files ALREADY loaded successfully */
      // console.log("script ALREADY loaded successfully")
      that.loadVOPlayer()
    }
  }

  async loadVOPlayer() {
    console.log('voplayer.Player.version', voplayer.Player.version)
    const lngMap = {
      nl: 'Dutch',
      en: 'English',
      de: 'German',
      fr: 'French',
      it: 'Italian',
      pl: 'Polish',
      pt: 'Portuguese',
      ru: 'Russian',
      es: 'Spanish',
      vi: 'Viêt Namese',
      el: 'Greek',
      'pt-br': 'Portuguese',
    }

    const formatTextTrackForDisplay = track => {
      if (track.name) {
        return track.name
      } else {
        if (lngMap.hasOwnProperty(track.language)) {
          return lngMap[track.language]
        } else {
          return track.language
        }
      }
    }

    const playerConfig = {
      base: 'vo/html5player', //base path
      license: VOLicense,
      qualityLevelFormater: this.formatQualityLevelForDisplay,
      textTrackDisplayFormater: formatTextTrackForDisplay,
      // audioTrackDisplayFormater: formatAudioTrackForDisplay,
      // useQualityOnlyButton: true,
      // useCentralPlayBtn: false,
      togglePlayPauseOnClick: true, //click video to play and pause
      // displayRelativePositionOnLive: false
    }

    let drm = _get(this.props, 'drm', '')
    let vmapUrl = _get(this.props, 'adsSource', '')
    let autoplay = _get(this.props, 'autoplay', false)
    let subtitles = _get(this.props, 'subtitles', null)

    try {
      const player = voplayer.createPlayerWithControls('videoContext', playerConfig)
      new UIAds(player)

      player.volume = this.props.volume
      player.muted = this.props.muted

      const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent)

      if (drm && !drm.drmEnabled) {
        const config = {
          vmapUrl,
          subtitles,
          manifestUri: this.props.streamSourceUrl
        }
        this.handleInitPlayer(player, config)
        return
      }

      let drmStreamUrl = isSafari ? this.props?.drm?.fairplay?.streamUrl : this.props?.drm?.widevine?.streamUrl

      // console.log('drmStreamUrl', drmStreamUrl)
      let manifestUri = drmStreamUrl ? drmStreamUrl : this.props.streamSourceUrl //isSafari && drm ? drm.fairplay.streamUrl : drm.widevine.streamUrl
      // let manifestUri = 'https://cdn-mxs-01.akamaized.net/Content/HLS/VOD/398d54b1-4236-49e3-afd8-34d53c84a5c3/c0de6451-cd85-84e0-fcd7-ea805ff7a6f2/index_L2.m3u8?hdnts=st=1574842082~exp=1574845682~acl=/*~hmac=296a32e691f9409deb13ae3e08d746453d14915a0525f1e908f6bbf05331dd38'
      // const manifestUri = 'http://cdn.theoplayer.com/video/big_buck_bunny/big_buck_bunny.m3u8'
      // console.log('manifestUri', manifestUri)
      // console.log('license ', drm.fairplay.licenseUrl)
      // console.log('cert', drm.fairplay.certificateUrl)

      const deviceId = 'MDFkNzlhNTgtYjRiOC0zYzQ2LTk2ZmMtZDY2OTFlODA1MWEz'
      if (!isSafari) {
        const config = {
          vmapUrl,
          // 'https://api.stag.supersoccer.tv/v1/ads/ads-rubik/api/v1/get-preroll-video?params=eyJwcm9qZWN0X2lkIjoiMiIsInZpZGVvX2lkIjoiczFrZmExQVNDNCIsImFwcF9pZCI6Im1vbGFfYWRzIiwic2Vzc2lvbl9pZCI6IndteDR4azg4aDhta2Fob252dHVzcnBlN2dpcTdyOXoiLCJjbGllbnRfaXAiOiIyMTIuMTE3LjYxLjU4IiwidXVpZCI6IjFiYmVkOTI1LWRhOTEtNDQ1OS04OGFkLWU4MGRlMjc3ODZlZSIsInRpbWVfb2Zmc2V0IjoiNyIsImxvYyI6ImhhSmZZNkpKUktOZllURWJvMTloTXRFQWthTmZZVFBSQ0RhaVgzb0w1aGljZGJvMTdybzcyIn0=',
          // vmapUrl: 'http://51.38.231.56:8000/vmap?tc=autorefresh_pre_roll',
          subtitles,
          manifestUri,
          autostart: autoplay,
          drm: {
            servers: {
              'com.widevine.alpha': `${drm.widevine.licenseUrl}?deviceId=${deviceId}`,
              'com.microsoft.playready': `${drm.playready.licenseUrl}?deviceId=${deviceId}`,
              'com.apple.fps': `${drm.fairplay.licenseUrl}?deviceId=${deviceId}`,
            },
          },
        }
        this.handleInitPlayer(player, config)
      } else {
        const req = await fetch(drm.fairplay.certificateUrl)
        const cert = await req.arrayBuffer()

        const config = {
          vmapUrl, //: 'http://51.38.231.56:8000/vmap?tc=autorefresh_pre_roll',
          manifestUri,
          subtitles,
          // subtitles: {
          //   enableSMPTE: false,
          // },
          autostart: autoplay,
          drm: {
            servers: {
              'com.widevine.alpha': `${drm.widevine.licenseUrl}?deviceId=${deviceId}`,
              'com.microsoft.playready': `${drm.playready.licenseUrl}?deviceId=${deviceId}`,
              'com.apple.fps': `${drm.fairplay.licenseUrl}?deviceId=${deviceId}`,
            },
            advanced: {
              'com.apple.fps': {
                serverCertificate: new Uint8Array(cert),
              },
            },
            initDataTransform: initData => {
              const contentId = getMyContentId(initData)
              return shaka.util.FairPlayUtils.initDataTransform(initData, contentId, new Uint8Array(cert))
            },
          },
        }
        player.registerLicenseResponseFilter(this.fairplayLicenseResponseFilter)
        player.registerLicenseRequestFilter(this.fairplayLicenseRequestFilter)
        this.handleInitPlayer(player, config)
      }

      this.handlePlayerEventListener(player)

      window.video = _get(this.props, 'movieDetail.data[0]', '')
    } catch (e) {
      console.log('Error while creating the player: ', e)
      $('#videoContext').html('Error while creating player')
    }
  }

  async componentDidMount() {
    this.loadDynamicStyle()
    this.loadDynamicScript()
  }

  handlePlayerEventListener = player => {
    const that = this

    player.on('error', e => console.log(e))
    player.on('ready', function() {
      console.log('Player Controls loaded and ready')
      // that.handleInitBanner(player)
    })

    // drive bandwdith timer (stop monitoring when player is paused)
    // player.on('play', function (e) {
    //   // console.log(e)
    //   // if (typeof bandwidthLogTimer === 'undefined') {
    //   //   bandwidthLogTimer = setInterval(logBandwidth, 2000)
    //   // }
    // })

    let visitedTimeInSeconds = [],
      firstTimeFlag = 0,
      currentTime = 0
    player.on('play', function(e) {
      const { isPlaying } = that.state
      let isAds = false

      //if has ads
      if (player.currentVMAP) {
        isAds = true
        if (player.playingAd != undefined && !player.playingAd) {
          isAds = false
        }
        player.isPrerollPlaying = isAds
      }

      that.setState({
        isPlaying: true,
      })

      if (that.props.handleVideoPlay) {
        that.props.handleVideoPlay(player)
      }

      //if ads has finished playing
      if (!isAds) {
        if (!firstTimeFlag) {
          player.totalWatchTime = visitedTimeInSeconds.length
          if (that.props.handleVideoWatchTime) {
            player.isPrerollPlaying = isAds
            that.handleInitBanner(player)
            if (that.childRefs) {
              that.childRefs.addEventListener('DOMSubtreeModified', that.handleSubtreeOnChange)
              that.childRefs.addEventListener('mousemove', that.handleOnMouseMove)
              that.childRefs.addEventListener('mouseout', () => that.setState({ titleShow: false }))
            }
            that.props.handleVideoWatchTime(player)
          }
          firstTimeFlag = 1
        }

        this.durationInterval = setInterval(function() {
          currentTime = Math.floor(player.currentTime)
          // console.log('visitedTimeInSeconds.indexOf(totalWatchTime) ', visitedTimeInSeconds.indexOf(totalWatchTime))
          if (visitedTimeInSeconds.indexOf(currentTime) === -1) {
            visitedTimeInSeconds.push(currentTime)
          }
          // console.log("currentTime", currentTime)
          // console.log('visitedTimeInSeconds', visitedTimeInSeconds)
          player.totalWatchTime = visitedTimeInSeconds.length

          // implementasi next video
          // that.childRefs.removeEventListener('DOMSubtreeModified', that.handleSubtreeOnChange)

          // console.log("visitedTimeInSeconds.length", visitedTimeInSeconds.length)
          if (that.props.handleVideoWatchTime) {
            that.props.handleVideoWatchTime(player)
          }
        }, 1000)
      }
    })

    player.on('pause', function() {
      clearInterval(this.durationInterval)
      if (that.props.handleVideoPause) {
        that.props.handleVideoPause(player)
      }
    })

    player.on('ended', function() {
      // console.log('Playback ended')
      clearInterval(this.durationInterval)
      if (that.props.handleVideoEnded) {
        that.props.handleVideoEnded(player)
      }
    })

    player.on('durationchange', function(e) {
      clearInterval(this.durationInterval)
      if (that.props.handleDurationChange) {
        that.props.handleDurationChange(player)
      }
    })

    player.on('volumechange', function(e) {
      if (that.props.handleOnVideoVolumeChange) {
        that.props.handleOnVideoVolumeChange(player)
      }
      const playerVolumeInfo = {
        volume: player.volume,
        muted: player.muted,
      }
      try {
        localStorage.setItem('voplayer-volume-info', JSON.stringify(playerVolumeInfo))
      } catch (err) {}
    })
  }

  handleInitPlayer = (player, config) => {
    const that = this
    player.reset().then(function() {
      // player.liveHack = true
      player.configure(config)
      // that.applyDrmXHRFilters()
      if (config.vmapUrl) {
        that.loadVAST(player, config).then(() => {
          player
            .load(config.manifestUri, 0)
            .then(function() {
              // player.addSRTTextTrack('EN', '', 'https://mola01.koicdn.com/subtitles/s1kfa1ASC4-id.srt')
              if (config.subtitles && config.subtitles.length > 0) {
                config.subtitles.map(subtitle => {
                  player.addSRTTextTrack(subtitle.label, '', subtitle.src)
                })
              }
              // player.addSRTTextTrack('EN', '', 'http://localhost:3000/vo/sample-subs2.srt')
              // player.addSRTTextTrack('ID', '', 'http://localhost:3000/vo/sample-subs.srt')
              console.log('The video has now been loaded with ads')
            })
            .catch(that.onError) // onError is executed if the asynchronous load fails
        }).catch(() => {
          player
            .load(config.manifestUri, 0)
            .then(function() {
              // player.addSRTTextTrack('EN', '', 'https://mola01.koicdn.com/subtitles/s1kfa1ASC4-id.srt')
              if (config.subtitles && config.subtitles.length > 0) {
                config.subtitles.map(subtitle => {
                  player.addSRTTextTrack(subtitle.label, '', subtitle.src)
                })
              }
              // player.addSRTTextTrack('EN', '', 'http://localhost:3000/vo/sample-subs2.srt')
              // player.addSRTTextTrack('ID', '', 'http://localhost:3000/vo/sample-subs.srt')
              console.log('The video has now been loaded, failed to retrieve ads')
            })
            .catch(that.onError) // onError is executed if the asynchronous load fails
        })
      } else {
        player
          .load(config.manifestUri, 0)
          .then(function() {
            // player.addSRTTextTrack('en', '', 'https://mola01.koicdn.com/subtitles/s1kfa1ASC4-id.srt')
            // player.addSRTTextTrack('en', '', 'http://localhost:3000/vo/sample-subs.srt')
            if (config.subtitles && config.subtitles.length > 0) {
              config.subtitles.map(subtitle => {
                player.addSRTTextTrack(subtitle.label, '', subtitle.src)
              })
            }
            console.log('The video has now been loaded without ads')
          })
          .catch(that.onError) // onError is executed if the asynchronous load fails
      }
      window.player = player
    })
  }

  loadVAST = (player, config) => {
    if (config.vastUrl == null && config.vmapUrl == null) {
      return new Promise((resolve, reject) => {
        resolve()
      })
    } else if (config.vastUrl != null) {
      return player.loadVMAP(config.vastUrl, false, true)
    } else {
      return player.loadVMAP(config.vmapUrl, false, false)
    }
  }

  applyDrmXHRFilters = () => {
    var filter = 'volicenser'
    // unregister current filters if any
    if (undefined != currentFilter) {
      if (filters[currentFilter].request) {
        player.unregisterLicenseRequestFilter(filters[currentFilter].requestFct)
      }
      if (filters[currentFilter].response) {
        player.unregisterLicenseResponseFilter(filters[currentFilter].responseFct)
      }
      currentFilter = undefined
    }

    // register new filters if it exists
    if (filters.hasOwnProperty(filter)) {
      currentFilter = filter
      console.log('Apply DRM filters: ' + filters[filter].displayName)
      if (filters[currentFilter].requestFct) {
        player.registerLicenseRequestFilter(filters[currentFilter].requestFct)
      }
      if (filters[currentFilter].responseFct) {
        player.registerLicenseResponseFilter(filters[currentFilter].responseFct)
      }
    }
  }

  handleInitBanner = player => {
    let adsBannerUrl = _get(this.props, 'adsBannerUrl', '')
    const banner = new AdBanner(player)
    banner.closeable = false
    banner.visibility = false
    banner.requestURL = adsBannerUrl
    //'https://api.stag.supersoccer.tv/v1/ads/ads-rubik/api/v1/get-inplayer-banner?params=eyJwcm9qZWN0X2lkIjoiNSIsInZpZGVvX2lkIjoiMTA4NzYxMDAxMyIsImFwcF9pZCI6InNlbnRfYWRzIiwic2Vzc2lvbl9pZCI6InZlcmltYXRyaXgtdGVzdCIsImNsaWVudF9pcCI6IjAuMC4wLjAiLCJ1dWlkIjoidmVyaW1hdHJpeC10ZXN0In0='
    banner.start()
    window.banner = banner
  }

  handlePlayButton = () => {
    /** nanti di fix deh gua binggung */
    this.setState({
      isPlaying: true
    })
    window.player.play()
  }

  handleSubtreeOnChange = () => {
    // const overlayDisplay = _get(document.getElementsByClassName('sqp-video-overlay'), '[0].style.display', '')

    const videoHeight = _get(document.getElementsByClassName('sqp-video'), '[0].offsetHeight', '')
    const videoChildEl = _get(document.getElementsByClassName(s.vo_child_container), '[0]', '')

    if (videoHeight && videoChildEl) {
      // if (!this.player.isPrerollPlaying && this.player.duration - this.player.currentTime <= 10) {
      //   videoChildEl.style.opacity = 1
      // } else {
      //   videoChildEl.style.opacity = overlayDisplay ? 0 : 1
      // }

      videoChildEl.style.height = `${videoHeight - videoHeight * 0.15}px`
    }
  }

  componentWillUnmount() {
    if (this.childRefs) {
      this.childRefs.removeEventListener('DOMSubtreeModified', this.handleSubtreeOnChange)
    }
  }

  handleOnMouseMove = e => {
    this.prevPosition = { x: e.x, y: e.y }
    this.setState(
      {
        titleShow: true,
      },
      () => {
        setTimeout(() => {
          const currentPosition = { x: e.x, y: e.y }
          if (this.prevPosition.x === currentPosition.x && this.prevPosition.y === currentPosition.y) {
            this.setState({
              titleShow: false,
            })
          }
        }, 5000)
      }
    )
  }

  handleCancelUpcVideo = e => {
    this.setState({
      nextVideoClose: true,
    })
  }

  renderNextVideo = nextVideoClose => {
    const {
      recommendation: { data: recomData = [] },
    } = this.props
    let nextVideo = null
    if (recomData && recomData.length > 0) {
      if (recomData[0].video_id !== this.props.videoId) {
        nextVideo = recomData[0]
      } else if (recomData.length > 1) nextVideo = recomData[1]
    }

    if (nextVideo && !nextVideoClose) {
      return <UpcomingVideo data={nextVideo} handleCancelVideo={this.handleCancelUpcVideo} />
    } else {
      return <div />
    }
  }

  render() {
    const { isPlaying, titleShow, nextVideoClose } = this.state
    const { title, poster, children } = this.props
    console.log(this.props)
    const nextVideoStart =
      this.player && !this.player.isPrerollPlaying && this.player.duration - this.player.currentTime <= 100
    return (
      <>
        <div id="videoSection" className={s.vo_container}>
          <div id="videoArea">
            {!isPlaying && poster && (
              <>
                <div
                  className={s.vo_poster}
                  style={{
                    backgroundImage: `url(${poster})`,
                  }}
                />
                <button
                  className="vo-big-play-button"
                  type="button"
                  title="Play Video"
                  onClick={() => this.handlePlayButton()}
                >
                  <div className="vo-big-play-button-svg-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" fill="currentColor">
                      <circle cx="75" cy="75" r="73" fill="#000" fillOpacity="0.2" />
                      <circle
                        cx="75"
                        cy="75"
                        r="73"
                        className="theo-play-svg-circle"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="none"
                        transform="rotate(-90,75,75)"
                      />
                      <g transform="translate(85,75) scale(0.5625) translate(-75,-75)">
                        <path d="m 123.89639,85.432 c -12.865,9.167 -29.482997,19.402 -49.848997,30.7 -19.634,11.035 -36.851,19.7 -51.65,26 l -16.3990002,6.099 c -1.033,-4.433 -2,-11.002 -2.9,-19.7 -2.033,-17.333 -3.04999998,-36.466 -3.04999998,-57.399 0,-19.167 1.38199998,-37.081 4.14799998,-53.75 l 4.0019995,-19.1499994 17.3990007,5.849 c 15.068,5.9999994 31.401,14.5169994 49,25.5509994 18.631,11.666 34.616997,22.766 47.948997,33.3 6.663,5.3 11.463,9.383 14.396,12.25 l -13.046,10.25" />
                      </g>
                    </svg>
                  </div>
                </button>
              </>
            )}
            <div ref={node => (this.childRefs = node)} id="videoContext" className="noselect">
              {isPlaying && (
                <div className={s.vo_child_container}>
                  <h1 style={{ transition: '300ms ease-out', opacity: titleShow ? 1 : 0 }}>{title}</h1>
                  <div>{children}</div>
                  {nextVideoStart && this.renderNextVideo(nextVideoClose)}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default withStyles(s)(VOPlayer)
