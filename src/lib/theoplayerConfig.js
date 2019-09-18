import { handleTracker } from './videoTracker'
import { endpoints } from '@source/config'
import Tracker from '@source/lib/tracker'
import config from '@source/config'
import { get } from 'axios'
import { getContentTypeName } from '@source/lib/globalUtil'
import Moment from 'moment'

let ticker = [],
  tickerLive = [],
  tickerPerSec = []
var videoData, userData
let timeLive = -1

let handleNextVideoCallback
let handlePlayerHeaderToggleCallback

const handleOnTimePerMinute = ({ heartbeat, bitrate, video_quality, client_bandwidth }) => {
  const { clientIp, uid, referrer } = userData
  // const currentDuration = player ? player.currentTime : '';
  // const totalDuration = player ? player.duration : '';
  const payload = {
    clientIp,
    heartbeat: heartbeat ? 60 : 0,
    window: window,
    event: 'event_video_plays',
    referrer: referrer,
    bitrate,
    video_quality,
    client_bandwidth,
    // currentDuration,
    // totalDuration
  }

  if (uid) {
    payload.userId = uid
  }
  handleTracker(payload, videoData)
}

const handleTimeUpdate = (payload, player) => {
  const time = Math.round(payload)
  let bitrate = '',
    video_quality = '',
    client_bandwidth = ''

  //Live
  if (getContentTypeName(videoData.contentType) == 'linear' || getContentTypeName(videoData.contentType) == 'live') {
    if (!player.ads.playing) {
      if (!ticker.includes(time)) {
        ticker.push(time)
        timeLive = timeLive + 1
        if (timeLive % 5 === 0 && handlePlayerHeaderToggleCallback) {
          handlePlayerHeaderToggleCallback(timeLive)
        }
      }
      // console.log('timeLive', timeLive, tickerLive, ticker)
      // console.log('timeLive', timeLive)
      if (timeLive % 60 === 0) {
        // console.log('ticker', ticker)
        var vTracks = player && player.videoTracks && player.videoTracks.length > 0 ? player.videoTracks : [],
          currentTrack
        for (var i = 0; i < vTracks.length; i++) {
          currentTrack = vTracks.item(i)
          if (currentTrack.enabled && currentTrack.activeQuality) {
            // console.log("Resolution:", currentTrack.activeQuality.height)
            // console.log("bandwidth/bit rate:", currentTrack.activeQuality.bandwidth / 1024 / 1000)
            video_quality = `${currentTrack.activeQuality.height}`
            bitrate = `${currentTrack.activeQuality.bandwidth}`
            try {
              client_bandwidth = localStorage.getItem('theoplayer-stored-network-info')
            } catch (err) {}
            //console.log('bitrate full:', `${currentTrack.activeQuality.height} ${currentTrack.activeQuality.bandwidth / 1024 / 1000} ${localStorage.getItem('theoplayer-stored-network-info')}`);
          }

          if (!tickerLive.includes(timeLive)) {
            tickerLive.push(timeLive)
            Tracker.sessionId()
            const heartbeat = timeLive !== 0
            // console.log('masuk SINI TIMELIVE', timeLive)
            // console.log('dt:', video_quality, bitrate, client_bandwidth)
            handleOnTimePerMinute({ action: 'timeupdate', heartbeat, player, bitrate, video_quality, client_bandwidth })
          }
        }
      }
    }
  } else {
    const duration = player.duration
    if (!tickerPerSec.includes(time)) {
      tickerPerSec.push(time)
      if (handleNextVideoCallback) {
        if (!player.ads.playing && time >= duration - 11) {
          // if (!player.ads.playing && time > 2 && !tickerNextVideo.includes(time)) {
          handleNextVideoCallback(true)
        }
      }
      if (handlePlayerHeaderToggleCallback) {
        if (!player.ads.playing && time % 5 === 0) {
          // console.log("header toggle:", time)
          handlePlayerHeaderToggleCallback(time)
        }
      }

      if (time % 60 === 0 && !player.ads.playing) {
        // var calcTime = time
        var vTracks = player && player.videoTracks && player.videoTracks.length > 0 ? player.videoTracks : [],
          currentTrack
        for (var i = 0; i < vTracks.length; i++) {
          currentTrack = vTracks.item(i)
          if (currentTrack.enabled && currentTrack.activeQuality) {
            // console.log("Resolution:", currentTrack.activeQuality.height)
            // console.log("bandwidth/bit rate:", currentTrack.activeQuality.bandwidth / 1024 / 1000)
            video_quality = `${currentTrack.activeQuality.height}`
            bitrate = `${currentTrack.activeQuality.bandwidth}`
            try {
              client_bandwidth = localStorage.getItem('theoplayer-stored-network-info')
            } catch (err) {}
            //console.log('bitrate full:', `${currentTrack.activeQuality.height} ${currentTrack.activeQuality.bandwidth / 1024 / 1000} ${localStorage.getItem('theoplayer-stored-network-info')}`);
          }
        }
        // if (!ticker.includes(calcTime)) {
        // ticker.push(calcTime)
        // console.log("calcTime", calcTime)
        Tracker.sessionId()
        const heartbeat = time !== 0
        handleOnTimePerMinute({ action: 'timeupdate', heartbeat, player, bitrate, video_quality, client_bandwidth })
        // }
      }
    }
  }
}

const setBannerOptions = (ipaEnabled = true, araEnabled = true, araRequestUrl) => {
  const setOption = {
    araRequestUrl: araRequestUrl,
    ipaEnabled: ipaEnabled, // enable / disable IPA ads feature
    araEnabled: araEnabled, // enable / disable ARA ads feature
    ipaDuration: 30, // durasi refresh banner, how long the ad will last untill another one will be loaded
    ipaTimeOffset: 0, // describes the time between ending one ad and showing another one
    ipaVisibility: true, // If it's set to "false", the ad is normally loaded but it's visualy hidden.
    ipaNoAdsTime: 0, // the time between requests if there will be no in player ads received
    araRefreshTime: 0, // the time interval of ARA request. Timer starts counting after last sheduled linear ad end
    araResume: false, // toggles ON and OFF the ARA Resume feature
    closable: false,
    skipOffset: 0, // its the time, after which the ad can be closed either by using close() function or by clicking in the "X" button
  }
  return setOption
}

const uuidADS = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const defaultVideoSetting = (user, videoDt, vuid, handleNextVideo, handlePlayerHeaderToggle) => {
  const baseUrl = endpoints.ads
  videoData = videoDt
  userData = user
  ticker = []
  tickerLive = []
  tickerPerSec = []
  timeLive = -1

  handleNextVideoCallback = handleNextVideo
  handlePlayerHeaderToggleCallback = handlePlayerHeaderToggle

  var movieUrl = videoDt.streamSourceUrl

  // if (user.subscriptions) {
  //   user.subscriptions.data.map(list => {
  //     list.attributes.subscriptions.map(item => hasSubcription.push(item));
  //   });
  // }

  //Get Time Right Now
  const todayDate = new Date().getTime()

  //Get ExpireAt
  const setSubscribe = user.subscriptions
  const setSubscribeExp = Object.keys(setSubscribe).map(key => setSubscribe[key].attributes.expireAt)
  const setSubscribeExpVal = new Date(setSubscribeExp).getTime()

  //Validation Ads Show
  const resultCompareDate = setSubscribeExpVal - todayDate

  //Get Status Subscribe Type from User
  // const getSubscribeType = Object.keys(setSubscribe).map(key => setSubscribe[key].attributes.subscriptions[key].type)

  if (resultCompareDate > 0) {
    return {
      showBackBtn: false,
      drm: videoDt.drm,
      movieUrl: movieUrl,
      deviceId: vuid,
      handleVideoTimeUpdate: handleTimeUpdate,
      // theoConfig: [],
    }
  }

  //console.log(`THEOCINFLOCATION+++++`, user.loc)

  const payload = {
    project_id: '2',
    video_id: videoData.id,
    app_id: config.env === 'production' ? 'sent_ads' : 'mola_ads',
    session_id: Tracker.sessionId(window),
    client_ip: user.clientIp,
    uuid: uuidADS(),
    time_offset: `${Moment().utcOffset() / 60}`,
    loc: user.loc,
  }

  if (user.uid) {
    payload.user_id = user.uid
  }
  const encryptPayload = window.btoa(JSON.stringify(payload))
  // console.log("VUID", vuid)
  // console.log("videodt drm", videoDt.drm)
  return {
    adsBannerOptions: setBannerOptions(),
    showBackBtn: false,
    adsSource: `${baseUrl}/v1/ads/ads-rubik/api/v1/get-preroll-video?params=${encryptPayload}`,
    adsBannerUrl: `${baseUrl}/v1/ads/ads-rubik/api/v1/get-inplayer-banner?params=${encryptPayload}`,
    drm: videoDt.drm,
    movieUrl: movieUrl,
    deviceId: vuid,
    handleVideoTimeUpdate: handleTimeUpdate,
    // theoConfig: [],
  }
}
