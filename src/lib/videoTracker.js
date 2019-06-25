import dateFormat from 'dateformat'
import UaParser from 'ua-parser-js'
import queryString from 'query-string'
import _get from 'lodash/get'
import Tracker from '@source/lib/tracker'

export const handleTracker = async (data, props) => {
  const { clientIp, userId, heartbeat, window: clientWindow, event, referrer, video_quality, bitrate, client_bandwidth } = data
  const { id: videoId, source } = props
  /* Parse Current Url */
  const urlParams = queryString.parse(clientWindow.location.search)

  /* Get & Parse UA */
  const UA = new UaParser()
  UA.setUA(navigator.userAgent)

  /* Try get user_id & subs
  const userId = _get(users, 'profile.user_id', null);
  let adjustedSubs = [];
  if (userId !== null) {
    adjustedSubs = users.subscriptions.map(
      subs => `${_get(subs, 'subscriptionId', null)}`,
    );
  } else {
    adjustedSubs = [null];
  }
  */

  /* Try get platform and browser */
  const osName = _get(UA.getOS(), 'name', null)
  const osVersion = _get(UA.getOS(), 'version', null)
  const os = osName !== null && osVersion !== null ? `${osName} ${osVersion}` : null
  const vendor = _get(UA.getDevice(), 'vendor', null)
  const device = vendor !== null ? `${vendor}` : null
  const platform = _get(UA.getDevice(), 'type', null)
  const browserName = _get(UA.getBrowser(), 'name', null)
  const browserVersion = _get(UA.getBrowser(), 'version', null)
  const browser = browserName && browserVersion ? `${browserName} ${browserVersion}` : null

  const geolocation = Tracker.getLangLat()
  const latitude = geolocation && geolocation.split(',').length == 2 ? geolocation.split(',')[0] : ''
  const longitude = geolocation && geolocation.split(',').length == 2 ? geolocation.split(',')[1] : ''
  /* eslint-disable */
  const payload = {
    data: {
      referrer: referrer,
      host: `${clientWindow.location.host}`,
      client: 'mola-web',
      app: browser,
      session_id: Tracker.sessionId(), // Try get+set session_id
      client_id: Tracker.clientId(),
      utm_source: urlParams.utm_source || undefined,
      utm_medium: urlParams.utm_medium || undefined,
      utm_campaign: urlParams.utm_campaign || undefined,
      screen_resolution: `${clientWindow.screen.width}x${clientWindow.screen.height}`,
      user_id: userId,
      video_id: videoId,
      // pageContent: document.title || null,
      platform: platform,
      os,
      device,
      project_id: 'molatv',
      ip: clientIp || null,
      path: `${clientWindow.location.host}${location.pathname}${location.search}`,
      video_type: source || null,
      // action,
      // current_duration: currentDuration,
      // total_duration: totalDuration,
      // currentSubscriptionId: adjustedSubs,
      hit_timestamp: dateFormat(new Date(), 'yyyy-mm-dd hh:MM:ss'),
      latitude,
      longitude,
      video_quality,
      bitrate,
      client_bandwidth,
    },
    table: event,
  }
  /* eslint-enable */
  const token = await Tracker.getOrCreateToken()
  // console.log('token', token);
  if (event === 'event_video_plays') {
    payload.data.interval_beats = `${heartbeat}`
  }

  return Tracker.sendPubSub(payload, token)
  //tracker.trackVideoPlay({ token, data: payload.data });
  // return Tracker.trackVideoPlay(token, payload.data);
}
