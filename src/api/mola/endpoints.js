/* eslint-disable import/prefer-default-export */
import { endpoints } from '@source/config'

export const HOME_PLAYLIST_ENDPOINT = `${endpoints.api}/videos/cache/playlists`
export const HOME_PLAYLIST_ENDPOINT_NOCACHE = `${endpoints.api}/videos/playlists`
export const VIDEOS_ENDPOINT = `${endpoints.api}/videos/cache`
export const VIDEOS_ENDPOINT_NOCACHE = `${endpoints.api}/videos`
// export const VIDEOS_ENDPOINT = 'https://private-86dd3-movie178.apiary-mock.com/videos';
export const HISTORY_ENDPOINT = `${endpoints.api}/userdata`

export const SEARCH_ENDPOINT = `${endpoints.api}/search/`
export const SEARCH_GENRE_ENDPOINT = `${endpoints.api}/videos/playlists/genre`
export const RECENT_SEARCH_ENDPOINT = `${SEARCH_ENDPOINT}histories`

export const SUBSCRIPTION_ENDPOINT = `${endpoints.api}/subscriptions/subscriptions`
export const USER_SUBSCRIPTION = `${endpoints.api}/subscriptions/user`
export const ORDER_ENDPOINT = `${endpoints.api}/orders/`
export const PAYMENT_ENDPOINT = `${endpoints.api}/payments/api/v1/dopay`
export const CAMPAIGN_ENDPOINT = `${endpoints.api}/campaigns/banner-positions`
export const ADD_DEVICE_ENDPOINT = `${endpoints.api}/videos/drm/add-device`
export const CHANNELS_PLAYLIST_ENDPOINT = `${endpoints.api}/videos/playlists`
export const PROGRAMME_GUIDES = `${endpoints.api}/videos/program-guides`
// export const RECOMMENDATION = `${endpoints.api}/videos/recommendation`
export const RECOMMENDATION = `${endpoints.api}/videos/recommendation`
export const HEADERMENU = 'http://mola01.koicdn.com/dev/json'

export const ARTICLES_ENDPOINT = `${endpoints.api}/articles/articles`
export const ARTICLES_RECOMMENDED_ENDPOINT = `${endpoints.api}/articles/lists`
export const ARTICLES_RELATED_ENDPOINT = `${endpoints.api}/articles/related`
export const PARTNERS_ENDPOINT = `${endpoints.api}/config/partners`

// export const MOVIE_DETAIL_ENDPOINT = 'https://private-e3227-molawebapi4.apiary-mock.com/videos';
// export const MOVIE_STREAMING = 'https://private-e3227-molawebapi4.apiary-mock.com/videos';

export const NOTIFICATION_ENDPOINT = `${endpoints.api}/inbox/notif` //'https://private-6bd318-ferdy.apiary-mock.com/notifications'
