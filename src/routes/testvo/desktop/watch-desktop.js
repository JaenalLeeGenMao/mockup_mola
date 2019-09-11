import React, { Component } from 'react'
import { connect } from 'react-redux'
import _get from 'lodash/get'
import _isUndefined from 'lodash/isUndefined'
import { getVUID_retry } from '@actions/vuid'

const { getComponent } = require('@supersoccer/gandalf')

class WatchDesktop extends Component {
  state = {}

  onError = error => {
    // Log the error
    console.error('Player error: ', error)
    switch (error.code) {
      case 1001: // bad HTTP status
        console.error('HTTP error', error.data[1], 'on URI', error.data[0])
        break
    }
  }

  async componentDidMount() {
    console.log('squadeo.Player.version', squadeo.Player.version)

    let lngMap = {
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

    var playerConfig = {
      base: 'vo/html5player',
      license: 'gKc8YRZTGe/xjaUG2FzquqQO8FYDJQXygubiXyVgv7PXz17bD9GEi3Y4T9GX9/ehIqwhoaD9DKFI/kw+/Uow6w==',
      // qualityLevelFormater: formatQualityLevelForDisplay,
      textTrackDisplayFormater: formatTextTrackForDisplay,
      // audioTrackDisplayFormater: formatAudioTrackForDisplay,
      // useQualityOnlyButton: true,
      // useCentralPlayBtn: false,
      // togglePlayPauseOnClick: true,
      // displayRelativePositionOnLive: false
    }

    try {
      var player = squadeo.createPlayerWithControls('videoContext', playerConfig)
      // let drm = {
      //   drmEnabled: true,
      //   fairplay: {
      //     certificateUrl: 'https://mola01.koicdn.com/fairplay.cer',
      //     licenseUrl: 'https://mola.tv/api/v2/videos/drm/license-url/fairplay',
      //     streamUrl:
      //       'https://cdn-mxs-01.akamaized.net/Content/HLS/VOD/b5558932-2120-4f7c-8b1b-4cdd4eca5a06/fdca642a-e382-c566-1a55-4053f9601a95/index_L2.m3u8?hdnts=st=1568094637~exp=1568098237~acl=/*~hmac=922051ead091fec40437fe2f8c2bed0d8f5f075f99a0cf7d1872ed2bd0f80f0f',
      //   },
      //   playready: {
      //     licenseUrl: 'https://mola.tv/api/v2/videos/drm/license-url/playready',
      //     streamUrl:
      //       'https://cdn-mxs-01.akamaized.net/Content/DASH/VOD/b5558932-2120-4f7c-8b1b-4cdd4eca5a06/fdca642a-e382-c566-1a55-4053f9601a95/manifest_L2.mpd?hdnts=st=1568094637~exp=1568098237~acl=/*~hmac=922051ead091fec40437fe2f8c2bed0d8f5f075f99a0cf7d1872ed2bd0f80f0f',
      //   },
      //   widevine: {
      //     licenseUrl: 'https://mola.tv/api/v2/videos/drm/license-url/widevine',
      //     streamUrl:
      //       'https://cdn-mxs-01.akamaized.net/Content/DASH/VOD/b5558932-2120-4f7c-8b1b-4cdd4eca5a06/fdca642a-e382-c566-1a55-4053f9601a95/manifest_L2.mpd?hdnts=st=1568094637~exp=1568098237~acl=/*~hmac=922051ead091fec40437fe2f8c2bed0d8f5f075f99a0cf7d1872ed2bd0f80f0f',
      //   },
      // }
      let data = _get(this.props, 'movieDetail.data[0]', '')
      window.data = data

      const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent)
      let drm = _get(this.props, 'movieDetail.data[0].drm', '')
      let manifestUri = isSafari && drm ? drm.fairplay.streamUrl : drm.widevine.streamUrl
      // let manifestUri = _get(this.props, 'movieDetail.data[0].streamSourceUrl', '')
      // const manifestUri = 'http://cdn.theoplayer.com/video/big_buck_bunny/big_buck_bunny.m3u8'
      // 'https://cdn-mxs-01.akamaized.net/Content/HLS/VOD/255b300c-9b7a-4d57-bcee-a73b55363116/c0de6451-cd85-84e0-fcd7-ea805ff7a6f2/index_L2.m3u8?hdnts=st=1568098172~exp=1568101772~acl=/*~hmac=76811e310e87fa9fbf8bf078ba36519bb261fe2fddf7089cb1ab409581e7ed42'
      // 'https://cdn-mxs-01.akamaized.net/Content/DASH/VOD/b5558932-2120-4f7c-8b1b-4cdd4eca5a06/fdca642a-e382-c566-1a55-4053f9601a95/manifest_L2.mpd?hdnts=st=1568094346~exp=1568097946~acl=/*~hmac=3cc0fcece49ae74a319e3a9c7bb83dcefc7cc6c0ced18c615fa7e7debaab5648'
      // player.license = 'https://mola.tv/api/v2/videos/drm/license-url/widevine'
      console.log('manifestUri', manifestUri)
      console.log('license', drm.fairplay.licenseUrl)
      console.log('cert', drm.fairplay.certificateUrl)

      player.reset().then(async function() {
        player.liveHack = true
        const deviceId = 'MDFkNzlhNTgtYjRiOC0zYzQ2LTk2ZmMtZDY2OTFlODA1MWEz'

        if (isSafari) {
          player.configure({
            drm: {
              servers: {
                'com.widevine.alpha': `${drm.widevine.licenseUrl}?deviceId=${deviceId}`,
                'com.microsoft.playready': `${drm.playready.licenseUrl}?deviceId=${deviceId}`,
                'com.apple.fps': `${drm.fairplay.licenseUrl}?deviceId=${deviceId}`,
              },
            },
          })
        } else {
          const req = await fetch(drm.fairplay.certificateUrl)
          const cert = await req.arrayBuffer()

          player.configure({
            drm: {
              servers: {
                'com.widevine.alpha': `${drm.widevine.licenseUrl}?deviceId=${deviceId}`,
                'com.microsoft.playready': `${drm.playready.licenseUrl}?deviceId=${deviceId}`,
                'com.apple.fps': `${drm.fairplay.licenseUrl}?deviceId=${deviceId}`,
              },
              advanced: {
                'com.apple.fps': {
                  serverCertificateUrl: cert,
                },
              },
            },
          })
        }

        player.registerLicenseRequestFilter(function(request) {
          // This is the specific header name and value the server wants:
          console.log('request', request)`${drm.fairplay.certificateUrl}?deviceId=${deviceId}`,
            (request.allowCrossSiteCredentials = true)
        })

        player.loadVMAP(
          'https://api.stag.supersoccer.tv/v1/ads/ads-rubik/api/v1/get-preroll-video?params=eyJwcm9qZWN0X2lkIjoiMiIsInZpZGVvX2lkIjoiczFrZmExQVNDNCIsImFwcF9pZCI6Im1vbGFfYWRzIiwic2Vzc2lvbl9pZCI6IndteDR4azg4aDhta2Fob252dHVzcnBlN2dpcTdyOXoiLCJjbGllbnRfaXAiOiIyMTIuMTE3LjYxLjU4IiwidXVpZCI6IjFiYmVkOTI1LWRhOTEtNDQ1OS04OGFkLWU4MGRlMjc3ODZlZSIsInRpbWVfb2Zmc2V0IjoiNyIsImxvYyI6ImhhSmZZNkpKUktOZllURWJvMTloTXRFQWthTmZZVFBSQ0RhaVgzb0w1aGljZGJvMTdybzcyIn0='
        )
        // player.configure(config);
        // Try to load a manifest
        // This is an asynchronous process, returning a Promise
        player
          .load(manifestUri, 0)
          .then(function() {
            // player.addSRTTextTrack('en', '', 'https://mola01.koicdn.com/subtitles/s1kfa1ASC4-id.srt')
            // player.srtManager_.addSRTTrack('id', '', 'https://mola01.koicdn.com/subtitles/s1kfa1ASC4-id.srt')
            // This runs if the asynchronous load is successful
            console.log('The video has now been loaded')
          })
          .catch(this.onError) // onError is executed if the asynchronous load fails
      })
      player.on('error', e => console.log(e))
      player.on('ready', function() {
        console.log('Player Controls loaded and ready')
      })
      // drive bandwdith timer (stop monitoring when player is paused)
      player.on('play', function(e) {
        // console.log(e)
        // if (typeof bandwidthLogTimer === 'undefined') {
        //   bandwidthLogTimer = setInterval(logBandwidth, 2000)
        // }
      })
      player.on('pause', function() {
        // if (bandwidthLogTimer) {
        //   clearInterval(bandwidthLogTimer)
        //   bandwidthLogTimer = undefined
        // }
      })
      player.on('ended', function() {
        console.log('Playback ended')
      })
      window.player = player
      const banner = new AdBanner(player)
      banner.closeable = false
      banner.visibility = false
      banner.requestURL =
        'https://api.stag.supersoccer.tv/v1/ads/ads-rubik/api/v1/get-inplayer-banner?params=eyJwcm9qZWN0X2lkIjoiNSIsInZpZGVvX2lkIjoiMTA4NzYxMDAxMyIsImFwcF9pZCI6InNlbnRfYWRzIiwic2Vzc2lvbl9pZCI6InZlcmltYXRyaXgtdGVzdCIsImNsaWVudF9pcCI6IjAuMC4wLjAiLCJ1dWlkIjoidmVyaW1hdHJpeC10ZXN0In0='
      banner.start()
      window.adbanner = AdBanner
      window.banner = banner
      console.log('banner', banner)
      console.log('AdBanner', AdBanner)
    } catch (e) {
      console.log('Error while creating the player: ', e)
      $('#videoContext').html('Error while creating player')
    }
  }

  render() {
    return (
      <>
        <div id="videoSection">
          <div id="videoContext" className="noselect">
            Video player goes here...
          </div>
        </div>
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
  // fetchRecommendation: movieId => dispatch(recommendationActions.getRecommendation(movieId)),
  getVUID_retry: () => dispatch(getVUID_retry()),
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchDesktop)
