import { handleTracker } from './videoTracker'
import { endpoints } from '@source/config'
import Tracker from '@source/lib/tracker'
import TrackerTest from '../../../web-tracker'
import history from '@source/history'
import config from '@source/config'
import { get } from 'axios'
import { getContentTypeName } from '@source/lib/globalUtil'
import Moment from 'moment'

var videoData, userData, akamai_analytic_enabled

let handleNextVideoCallback

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

const handleVideoWatchTime = player => {
  const data = {
    videoData,
    userData,
    player,
    window,
    currentLocation: history.location,
    event: 'event_video_plays',
  }

  const production = process.env.REACT_APP_ENV === 'production'
  const cookieName = production ? '_pst' : '_pst_staging'
  const intervalBeat = TrackerTest.getIntervalBeats()

  if (player.totalWatchTime % intervalBeat === 0) {
    //uncomment tracker
    TrackerTest.trackEvent({ data, env: production || 'staging' })
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

export const defaultVideoSetting = (user, videoDt, vuid, handleNextVideo, props) => {
  const baseUrl = endpoints.ads
  videoData = videoDt
  userData = user
  akamai_analytic_enabled = props.akamai_analytic_enabled || false
  // console.log('KEPANGGIL??')
  handleNextVideoCallback = handleNextVideo

  var streamSourceUrl = videoDt.streamSourceUrl

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
      streamSourceUrl: streamSourceUrl,
      deviceId: vuid,
      handleVideoWatchTime: handleVideoWatchTime,
      // theoConfig: [],
    }
  }

  //console.log(`THEOCINFLOCATION+++++`, user.loc)

  const payload = {
    project_id: '2',
    video_id: videoData.id,
    app_id: 'mola_ads',
    session_id: TrackerTest.sessionId(window),
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
  return {
    // adsBannerOptions: setBannerOptions(),
    // showBackBtn: false,
    adsSource: `${baseUrl}/v1/ads/ads-rubik/api/v1/get-preroll-video?params=${encryptPayload}`,
    adsBannerUrl: `${baseUrl}/v1/ads/ads-rubik/api/v1/get-inplayer-banner?params=${encryptPayload}`,
    drm: videoDt.drm,
    streamSourceUrl: streamSourceUrl,
    // deviceId: vuid,
    handleVideoWatchTime: handleVideoWatchTime,
    // theoConfig: [],
  }
}
