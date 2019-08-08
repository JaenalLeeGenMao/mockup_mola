import tracker from '@source/lib/tracker'
import _get from 'lodash/get'
import UaParser from 'ua-parser-js'
import queryString from 'query-string'
import history from '@source/history'
import dateFormat from 'dateformat'

export const globalTracker = async data => {
  const {
    user,
    heartbeat,
    window: clientWindow,
    event,
    referrer,
    video_quality,
    bitrate,
    client_bandwidth,
    videoId,
    linkRedirectUrl,
  } = data

  // console.log('event', event)
  let currentLocation = history.location
  const UA = new UaParser()
  UA.setUA(navigator.userAgent)

  const platform = _get(UA.getDevice(), 'type', null)
  const osName = _get(UA.getOS(), 'name', null)
  const osVersion = _get(UA.getOS(), 'version', null)
  const os = osName !== null && osVersion !== null ? `${osName} ${osVersion}` : null
  const vendor = _get(UA.getDevice(), 'vendor', null)
  const device = vendor !== null ? `${vendor}` : null
  const browserName = _get(UA.getBrowser(), 'name', null)
  const browserVersion = _get(UA.getBrowser(), 'version', null)
  const browser = browserName !== null && browserVersion !== null ? `${browserName} ${browserVersion}` : null

  const geolocation = tracker.getLangLat() ? tracker.getLangLat() : ''
  const latitude = geolocation.split(',').length == 2 ? geolocation.split(',')[0] : ''
  const longitude = geolocation.split(',').length == 2 ? geolocation.split(',')[1] : ''

  const urlParams = queryString.parse(clientWindow.location.search)
  let adjustedSubs = []
  // Try get user_id & subs

  // Initialize Payload
  const payload = {
    data: {
      project_id: 'molatv',
      referrer: `${window.location.host}${currentLocation.pathname}${currentLocation.search}`,
      host: `${window.location.host}`,
      path: linkRedirectUrl ? linkRedirectUrl : `${window.location.host}${location.pathname}${location.search}`,
      session_id: tracker.sessionId(), // Try get+set session_id
      client_id: tracker.clientId(),
      video_id: videoId,
      page_content: document.title || null,
      ip: user.clientIp,
      platform,
      os,
      device,
      app: browser,
      client: 'mola-web',
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      current_subscription_id: adjustedSubs,
      hit_timestamp: dateFormat(new Date(), 'yyyy-mm-dd hh:MM:ss'),
      utm_source: urlParams.utm_source || undefined,
      utm_medium: urlParams.utm_medium || undefined,
      utm_campaign: urlParams.utm_campaign || undefined,
      latitude,
      longitude,
    },
    table: event,
  }

  if (event === 'event_video_plays') {
    payload.data.interval_beats = `${heartbeat}`
    payload.data.referrer = referrer
    // payload.data.user_id = user.uid
    payload.data.video_id = videoId
    payload.data.video_type = source || null
    payload.data.video_quality = video_quality
    payload.data.bitrate = bitrate
    payload.data.client_bandwidth = client_bandwidth
  }

  if (user.uid) {
    payload.data.user_id = user.uid
  }

  // if (firstRender) {
  //   firstRender = false;
  //   const referrer = _get(store.getState(), 'runtime.referer', null)
  //   payload.data.referrer = referrer;
  // }

  // Check if current path is in search page
  // const inSearchPage = currentLocation.pathname === '/search'

  // get the token
  const token = await tracker.getOrCreateToken()
  // console.log('PAYLOAD', payload, 'token', token)
  // Post to ds-feeder if there's token && not in search page
  return tracker.sendPubSub(payload, token)

  // const paths = pathname.split('/')
  // const lastPathIndex = paths.length - 1

  // if (pathname.includes('movie-detail')) {
  //   payload.data.video_id = paths[lastPathIndex]
  //   payload.table = 'event_videos'
  //   if (token && !inSearchPage) tracker.sendPubSub(payload, token)
  // } else if (pathname.includes('watch')) {
  //   payload.data.video_id = urlParams.v
  //   payload.table = 'event_videos'
  //   if (token && !inSearchPage) tracker.sendPubSub(payload, token)
  // }
}
