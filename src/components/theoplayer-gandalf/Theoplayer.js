import React, { Component } from 'react'
import PropTypes from 'prop-types'
import history from '../../history'
import { theoScripts, theoStyle, theoLibraryLocation } from './config'
import { Arrow, videoPlayer, arrowIcon } from './style'
import AdBanner from './adApi'
class Theoplayer extends Component {
  state = {
    toggleArrow: false,
  }

  static propTypes = {
    licenseKey: PropTypes.string.isRequired,
    movieUrl: PropTypes.string.isRequired,
    isTrailer: PropTypes.bool,
    theoConfig: PropTypes.array,
    autoPlay: PropTypes.bool,
    allowMutedAutoplay: PropTypes.bool,
    showBackBtn: PropTypes.bool,
    fullscreen: PropTypes.bool,
    playerBtnImg: PropTypes.string,
    className: PropTypes.string,
    noPause: PropTypes.bool,
    showAudioButton: PropTypes.bool,
    showReplayButton: PropTypes.bool,
    handleOnVideoLoad: PropTypes.func,
    handleOnVideoPlaying: PropTypes.func,
    handleOnVideoEnded: PropTypes.func,
    handleOnVideoPause: PropTypes.func,
    handleOnVideoPlay: PropTypes.func,
    handleVideoTimeUpdate: PropTypes.func,
    isMobile: PropTypes.bool,
    videoType: PropTypes.string,
    poster: PropTypes.string,
    adsSource: PropTypes.string,
    adsBannerUrl: PropTypes.string,
    adsBannerOptions: PropTypes.object,
    resizeBannerAndCBarEnabled: PropTypes.bool,
    skipVideoAdsOffset: PropTypes.number,
  }

  static defaultProps = {
    licenseKey: '', //theoplayer
    autoPlay: true,
    isMobile: false,
    allowMutedAutoplay: true,
    className: '',
    fullscreen: true,
    isTrailer: false,
    showBackBtn: true,
    theoConfig: [],
    playerBtnImg: 'https://image.flaticon.com/icons/svg/60/60682.svg', //playerArrow
    noPause: false,
    showAudioButton: false,
    showReplayButton: false,
    videoType: 'application/x-mpegurl',
    poster: '',
    adsSource: null,
    adsBannerUrl: null,
    adsBannerOptions: null,
    resizeBannerAndCBarEnabled: true,
    skipVideoAdsOffset: null,
  }

  handleGoBack = () => {
    const { goBack } = history
    if (goBack) {
      goBack()
    }
  }

  getToggleArrow = () => {
    const { toggleArrow } = this.state
    const { showBackBtn } = this.props
    if (showBackBtn) {
      this.setState({
        toggleArrow: !toggleArrow,
      })
    }
  }

  loadDynamicStyle = () => {
    let existingStyle = true
    theoStyle.map(dt => {
      const el = document.getElementById(dt.id)
      const elExist = el ? true : false
      existingStyle = existingStyle && elExist
    })

    if (!existingStyle) {
      theoStyle.map(dt => {
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

  initTheoPlayer = () => {
    const playerConfig = {
      libraryLocation: theoLibraryLocation,
      ui: {
        fluid: true,
      },
    }
    this.theoPlayer = new window.THEOplayer.Player(this.containerPlayer, playerConfig)
    return this.theoPlayer
  }

  configVideoPlayer = () => {
    const { videoType, movieUrl, theoConfig, adsSource, skipVideoAdsOffset } = this.props
    if (adsSource) {
      this.player.source = {
        sources: [
          {
            src: movieUrl,
            type: videoType, // sets type to HLS
          },
        ],
        ads: [
          {
            sources: adsSource,
            skipOffset: skipVideoAdsOffset,
          },
        ],
        textTracks: theoConfig,
        preload: 'auto',
      }
    } else {
      this.player.source = {
        sources: [
          {
            src: movieUrl,
            type: videoType, // sets type to HLS
          },
        ],
        textTracks: theoConfig,
      }
    }
  }

  loadTheoPlayer() {
    const { autoPlay, allowMutedAutoplay, poster } = this.props
    this.player = this.initTheoPlayer()
    this.configVideoPlayer()

    if (poster) {
      this.player.poster = poster
      this.player.autoplay = false
    }

    if (!poster && autoPlay) {
      //if poster is set
      //video must not be autoplay
      if (allowMutedAutoplay) {
        this.player.muted = true
        this.player.loop = false
      }
      this.player.play()
    }

    const that = this
    this.player.addEventListener('pause', this.handleVideoPause)
    this.player.addEventListener('play', this.handleVideoPlay)
    this.player.addEventListener('ended', this.handleVideoEnded)

    this.player.addEventListener('playing', this.handleVideoPlaying)

    this.player.addEventListener('timeupdate', this.handleVideoTimeUpd)

    // the first banner ad is scheduled upon the first playing event
    this.player.addEventListener('sourcechange', this.handleVideoSrcChange)
  }

  handleVideoPause = () => {
    if (this.props.handleOnVideoPause) {
      this.props.handleOnVideoPause(true, this.player)
    }
  }

  handleVideoPlay = () => {
    if (this.props.handleOnVideoPlay) {
      this.props.handleOnVideoPlay(true, this.player)
    }
  }

  handleVideoEnded = () => {
    if (this.props.handleOnVideoPlaying) {
      this.props.handleOnVideoPlaying(false, this.player)
    }
    if (this.props.handleOnVideoEnded) {
      this.props.handleOnVideoEnded(true, this.player)
    }
    if (this.props.handleOnVideoPlay) {
      this.props.handleOnVideoPlay(false, this.player)
    }
  }

  handleVideoPlaying = () => {
    if (this.props.handleOnVideoPlaying) {
      this.props.handleOnVideoPlaying(true, this.player)
    }
  }

  handleVideoTimeUpd = () => {
    if (this.props.handleVideoTimeUpdate) {
      this.props.handleVideoTimeUpdate(this.currentTime, this.player)
    }
  }

  handleVideoSrcChange = () => {
    this.player.removeEventListener('playing', this.firstplay)
    this.player.addEventListener('playing', this.firstplay)
  }

  firstplay = () => {
    const { adsBannerUrl, adsBannerOptions, resizeBannerAndCBarEnabled } = this.props

    if (!this.player.ads.playing) {
      // check that we're not trying to schedule the banner during a preroll
      this.player.removeEventListener('playing', this.firstplay)
      if (adsBannerUrl) {
        var AdBannerOptions = {
          player: this.player,
          ipaRequestUrl: adsBannerUrl,
          resizeBannerAndCBarEnabled: resizeBannerAndCBarEnabled,
          ...adsBannerOptions,
        }
        const Advert = new AdBanner(AdBannerOptions)
        Advert.init()
      }
      /*
      the first param (player) is the THEOplayer instance,
      the second param (adURL) is the requestURL,
      the third param (0) is the skipOffset, (if you set it to 5, you can close the ad after 5 seconds),
      the fourth param (0) is the timeOffset, (if you set it to 5, the banner appears after 5 seconds)
      */
      //showBannerAdBelowPlayer(player, adURL, 0, 0);
    }
  }

  loadFullscreenEvent = () => {
    ;['', 'webkit', 'moz', 'ms'].forEach(prefix => document.addEventListener(prefix + 'fullscreenchange', this.handleFullscreen, false))
  }

  handleFullscreen = () => {
    this.isSafari = /.*Version.*Safari.*/.test(navigator.userAgent)

    const { isFullscreen } = this.state
    if (!this.isSafari) {
      this.setState({ isFullscreen: !isFullscreen }, () => {
        if (window.screen.orientation) {
          if (!isFullscreen) {
            window.screen.orientation.lock('landscape')
          } else {
            window.screen.orientation.unlock()
          }
        }
      })
    }
  }

  componentDidMount() {
    this.loadDynamicStyle()
    this.loadDynamicScript()
    this.loadFullscreenEvent()
  }

  loadDynamicScript = () => {
    let existingScript = true
    theoScripts.map(dt => {
      const el = document.getElementById(dt.id)
      const elExist = el ? true : false
      existingScript = existingScript && elExist
    })

    if (!existingScript) {
      const scriptCount = theoScripts.length
      let loadedScriptCount = 0
      theoScripts.map(dt => {
        const script = document.createElement('script')
        script.src = dt.src
        script.id = dt.id
        document.body.appendChild(script)
        script.onload = () => {
          loadedScriptCount += 1
          if (loadedScriptCount >= scriptCount) {
            this.loadTheoPlayer()
            if (this.props.handleOnVideoLoad) {
              this.props.handleOnVideoLoad(this.player)
            }
          }
        }
      })
    } else {
      this.loadTheoPlayer()
    }
    return false
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.destroy()
      if (!this.isSafari) {
        window.screen.orientation.unlock()
      }
    }

    this.player.removeEventListener('pause', this.handleVideoPause)
    this.player.removeEventListener('play', this.handleVideoPlay)
    this.player.removeEventListener('ended', this.handleVideoEnded)
    this.player.removeEventListener('playing', this.handleVideoPlaying)
    this.player.removeEventListener('timeupdate', this.handleVideoTimeUpd)
    this.player.removeEventListener('sourcechange', this.handleVideoSrcChange)
  }

  render() {
    const { toggleArrow } = this.state
    const { className, showBackBtn, children } = this.props
    return (
      <div
        className={`${videoPlayer} ${className} video-container video-js theoplayer-skin`}
        onMouseEnter={this.getToggleArrow}
        onMouseLeave={this.getToggleArrow}
        ref={el => {
          this.containerPlayer = el
        }}
      >
        {showBackBtn && (
          <Arrow isShow={toggleArrow} onClick={this.handleGoBack}>
            <span className={arrowIcon} />
          </Arrow>
        )}
        {children}
      </div>
    )
  }
}

export default Theoplayer
