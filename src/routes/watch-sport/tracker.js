import dateFormat from 'dateformat'
import UaParser from 'ua-parser-js'
import queryString from 'query-string'
import _get from 'lodash/get'

import Tracker from '@source/lib/tracker'

export const handleTracker = async (data, props) => {
  const { action, clientIp, sessionId, userId, heartbeat, window: clientWindow, currentDuration, totalDuration } = data
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
  const platform = _get(UA.getDevice(), 'type', null)
  const osName = _get(UA.getOS(), 'name', null)
  const osVersion = _get(UA.getOS(), 'version', null)
  const os = osName !== null && osVersion !== null ? `${osName} ${osVersion}` : null
  const vendor = _get(UA.getDevice(), 'vendor', null)
  const device = vendor !== null ? `${vendor}` : null

  const browserName = _get(UA.getBrowser(), 'name', null)
  const browserVersion = _get(UA.getBrowser(), 'version', null)
  const browser = browserName && browserVersion ? `${browserName} ${browserVersion}` : null

  const payload = {
    data: {
      project_id: 'molatv',
      // referrer: `${clientWindow.location.origin}${currentLocation.pathname}${currentLocation.search}`,
      host: `${clientWindow.location.host}`,
      path: `${clientWindow.location.host}${location.pathname}${location.search}`,
      session_id: Tracker.sessionId(), // Try get+set session_id
      // pageContent: document.title || null,
      ip: clientIp || null,
      platform,
      os,
      device,
      app: browser,
      app_version: browserVersion,
      utm_source: urlParams.utm_source || undefined,
      utm_medium: urlParams.utm_medium || undefined,
      utm_campaign: urlParams.utm_campaign || undefined,
      video_type: source || null,
      // action,
      client: 'mola-web',
      screen_resolution: `${clientWindow.screen.width}x${clientWindow.screen.height}`,
      user_id: userId,
      video_id: videoId,
      // current_duration: currentDuration,
      // total_duration: totalDuration,
      // currentSubscriptionId: adjustedSubs,
      hit_timestamp: dateFormat(new Date(), 'yyyy-mm-dd hh:MM:ss'),
      interval_beats: `${heartbeat}`,
    },
    table: 'event_video_plays',
  }
  // console.log(payload)
  const token = await Tracker.getOrCreateToken()

  /* Post to ds-feeder */
  return Tracker.sendPubSub(payload, token)
}