import { handleTracker } from './videoTracker'
import { endpoints } from '@source/config'
import Tracker from '@source/lib/tracker'
import config from '@source/config'
import { get } from 'axios'

let ticker = []
var videoData, userData
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

  // console.log("time", time)
  // console.log("buffer start", player.buffered.start(0))
  // console.log("buffer end", player.buffered.end(0))
  // console.log("buffer length", player.buffered.length)

  if (time % 60 === 0 && !player.ads.playing) {
    var calcTime = time
    /* NOTE:
      these two types (live video) return currentTime callback
      from theoplayer starting from 60s
      so we need to substract 60s from the currentTime
      2 = channel
      3 = live match
      untuk live match type nya bisa berubah setelah matchnya selesai, jadinya
      cek berdasarkan streamsourceurl, karena kalau live di urlnya ada text 'Live'
    */
    if (videoData.streamSourceUrl.toLowerCase().indexOf('live') > -1) {
      calcTime = Math.max(time - 60, 0)
    }

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

    if (bitrate && !ticker.includes(calcTime)) {
      ticker.push(calcTime)

      Tracker.sessionId()
      const heartbeat = calcTime !== 0
      handleOnTimePerMinute({ action: 'timeupdate', heartbeat, player, bitrate, video_quality, client_bandwidth })
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

export const defaultVideoSetting = (user, videoDt, vuid) => {
  const baseUrl = endpoints.ads
  videoData = videoDt
  userData = user
  ticker = []

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
