import { get, post, delete as axiosDelete } from 'axios'
import _ from 'lodash'
import {
  // VIDEOS_ENDPOINT,
  // HOME_PLAYLIST_ENDPOINT,
  HISTORY_ENDPOINT,
  SEARCH_ENDPOINT,
  // SEARCH_GENRE_ENDPOINT,
  RECENT_SEARCH_ENDPOINT,
  SUBSCRIPTION_ENDPOINT,
  ORDER_ENDPOINT,
  PAYMENT_ENDPOINT,
  CAMPAIGN_ENDPOINT,
  CHANNELS_PLAYLIST_ENDPOINT,
  PROGRAMME_GUIDES,
  RECOMMENDATION,
  HEADERMENU,
  ARTICLES_RECOMMENDED_ENDPOINT,
  ARTICLES_ENDPOINT,
  HOME_PLAYLIST_ENDPOINT_NOCACHE,
  VIDEOS_ENDPOINT_NOCACHE,
  NOTIFICATION_ENDPOINT,
  PARTNERS_ENDPOINT,
} from './endpoints'
import utils from './util'

import { endpoints } from '@source/config'

const getHomePlaylist = () => {
  return get(`${HOME_PLAYLIST_ENDPOINT_NOCACHE}/home-new`, {
    ...endpoints.setting,
  })
    .then(response => {
      const result = utils.normalizeHomePlaylist(response)
      return {
        meta: {
          status: result[0].length > 0 ? 'success' : 'no_result',
          error: '',
        },
        data: [...result[0]] || [],
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola Home')
      return {
        meta: {
          status: 'error',
          error: errorMessage,
        },
        data: [],
      }
    })
}

const getFeaturePlaylist = id => {
  return get(`${HOME_PLAYLIST_ENDPOINT_NOCACHE}/${id}`, {
    ...endpoints.setting,
  })
    .then(response => {
      const data = _.get(response, 'data.data', []),
        id = _.get(data, '[0].id', ''),
        type = _.get(data, '[0].type', ''),
        title = _.get(data, '[0].attributes.title', ''),
        visibility = _.get(data, '[0].attributes.visibility', 0),
        playlists = _.get(data, '[0].attributes.playlists', []),
        menuId = _.get(data, '[0].attributes.menuId', '')

      const playlistsFiltered =
        playlists.length > 0
          ? playlists
              .map(playlist => ({
                id: playlist.id,
                type: playlist.type,
                ...playlist.attributes,
              }))
              .filter(playlist => playlist.visibility === 1)
          : []
      return {
        meta: {
          status: data.length > 0 ? 'success' : 'no_result',
          error: '',
          id,
          title,
          type,
          visibility,
          menuId,
        },
        data: playlistsFiltered,
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola Feature playlist')
      return {
        meta: {
          status: 'error',
          error: errorMessage,
        },
        data: [],
      }
    })
}

const getFeatureBanner = ({ id = '' }) => {
  /* fid's are epl, sports, movies, kids */
  const url = id /* mobile-featured, desktop-featured, mobile-sport-featured, desktop-sport-featured, landing-page-${fid} */
  return get(`${CAMPAIGN_ENDPOINT}/${url}?include=banners`, {
    ...endpoints.setting,
  })
    .then(response => {
      const result = utils.normalizeFeatureBanner(response)
      return {
        meta: {
          status: result[0].length > 0 ? 'success' : 'no_result',
          error: '',
        },
        data: [...result[0]] || [],
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola Home')
      return {
        meta: {
          status: 'error',
          error: errorMessage,
        },
        data: [],
      }
    })
}

const getAllGenreSpo = (id = 'leagues') => {
  // link lama: genre-spo change into leagues
  return get(`${HOME_PLAYLIST_ENDPOINT_NOCACHE}/${id}`, {
    ...endpoints.setting,
  })
    .then(response => {
      const result = utils.normalizeHomePlaylist(response)
      return {
        meta: {
          status: result[0].length > 0 ? 'success' : 'no_result',
          error: '',
        },
        data: [...result[0]] || [],
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola Sport')
      return {
        meta: {
          status: 'error',
          error: errorMessage,
        },
        data: [],
      }
    })
}

const getMatchesList = (id = 'mola-soc') => {
  return get(`${HOME_PLAYLIST_ENDPOINT_NOCACHE}/${id}`, {
    ...endpoints.setting,
  })
    .then(response => {
      // console.log('response handler matcheslist', response)
      const result = utils.normalizeMatchesList(response)
      // console.log('after normalize matchlist', result)
      return {
        meta: {
          status: result[0].length > 0 ? 'success' : 'no_result',
          error: '',
        },
        data: [...result[0]] || [],
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola Sports')
      return {
        meta: {
          status: 'error',
          error: errorMessage,
        },
        data: [],
      }
    })
}

const getMatchDetail = ids => {
  return get(`${VIDEOS_ENDPOINT_NOCACHE}?${ids}&summary=1`, {
    ...endpoints.setting,
  })
    .then(response => {
      const result = utils.normalizeMatchDetail(response)
      // console.log('handler: after normalize match detail', result)
      return {
        meta: {
          status: result.length > 0 ? 'success' : 'no_result',
          error: '',
        },
        data: result || null,
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola Match Detail')
      return {
        meta: {
          status: 'error',
          error: errorMessage,
        },
        data: [],
      }
    })
}

const getMatchesPlaylists = ids => {
  return get(`${HOME_PLAYLIST_ENDPOINT_NOCACHE}?${ids}&summary=1`, {
    ...endpoints.setting,
  })
    .then(response => {
      const result = utils.normalizeMatchPlaylists(response)
      return {
        meta: {
          status: result.length > 0 ? 'success' : 'no_result',
          error: '',
        },
        data: result || null,
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error: Mola Genre Category')
      return {
        meta: {
          status: 'error',
          error: errorMessage,
        },
        data: [],
      }
    })
}

const getHomeVideo = ({ id }) => {
  // console.log('ID', id)
  return get(`${HOME_PLAYLIST_ENDPOINT_NOCACHE}/${id}`, {
    ...endpoints.setting,
  })
    .then(response => {
      const result = utils.normalizeHomeVideo(response)
      return {
        meta: {
          status: 'success',
          error: '',
        },
        data: [...result[0]] || [],
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola Video')
      return {
        meta: {
          status,
          error: errorMessage,
        },
        data: [],
      }
    })
}

const getPlaylistPlaylists = id => {
  return get(`${HOME_PLAYLIST_ENDPOINT_NOCACHE}/${id}`, {
    ...endpoints.setting,
  })
    .then(response => {
      const data = _.get(response, 'data.data', []),
        description = _.get(data, '[0].attributes.description', ''),
        background = _.get(data, '[0].attributes.images.cover.background.landscape', ''),
        playlists = _.get(data, '[0].attributes.playlists', ''),
        title = _.get(data, '[0].attributes.title', ''),
        menuId = _.get(data, '[0].attributes.menuId', '')

      let playlistsFiltered = []
      if (playlists) {
        playlistsFiltered =
          playlists.length > 0
            ? playlists
                .map(dt => ({
                  id: dt.id,
                  type: dt.type,
                  ...dt.attributes,
                }))
                .filter(dt => dt.visibility === 1)
            : []
      } else {
        playlistsFiltered =
          data.length > 0
            ? data
                .map(dt => ({
                  id: dt.id,
                  type: dt.type,
                  ...dt.attributes,
                }))
                .filter(dt => dt.visibility === 1)
            : []
      }

      return {
        meta: {
          background,
          title,
          description,
          status: playlistsFiltered.length > 0 ? 'success' : 'no_result',
          error: '',
          menuId,
        },
        data: playlistsFiltered || [],
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola Home')
      return {
        meta: {
          status: 'error',
          error: errorMessage,
        },
        data: [],
      }
    })
}

const getSportVideo = ({ id }) => {
  // console.log('id', id)
  return get(`${HOME_PLAYLIST_ENDPOINT_NOCACHE}/${id}`, {
    ...endpoints.setting,
  })
    .then(response => {
      let result = utils.normalizeHomeVideo(response)
      if (result.length > 0 && result[0].length > 0) {
        result = result[0].filter(dt => dt.visibility === 1)
      }
      return {
        meta: {
          status: 'success',
          error: '',
        },
        data: result || [],
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola Video')
      return {
        meta: {
          status,
          error: errorMessage,
        },
        data: [],
      }
    })
}

const getAllHistory = ({ userId }) => {
  return get(`${HISTORY_ENDPOINT}/${userId}/videos/histories`, {
    ...endpoints.setting,
  })
    .then(response => {
      const result = utils.normalizeHistory(response)
      return {
        meta: {
          status: result.length > 0 ? 'success' : 'no_result',
        },
        data: [...result] || [],
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola History')
      return {
        meta: {
          status: 'error',
          text: errorMessage,
        },
        data: [],
      }
    })
}

const getSearchResult = ({ q }) => {
  return get(`${SEARCH_ENDPOINT}`, {
    params: { q: q },
    ...endpoints.setting,
  })
    .then(response => {
      const result = utils.normalizeSearchResult(response)
      return {
        meta: {
          status: result.length > 0 ? 'success' : 'no_result',
          error: '',
        },
        data: [...result] || [],
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola Search Result')
      return {
        meta: {
          status: 'error',
          error: errorMessage,
        },
        data: [],
      }
    })
}

const getRecentSearch = (sessionId, sid) => {
  return get(`${RECENT_SEARCH_ENDPOINT}`, {
    params: { sessionId: sessionId },
    ...endpoints.setting,
    headers: { Authorization: `Bearer ${sid}` },
  })
    .then(response => {
      const result = utils.normalizeRecentSearch(response)
      return {
        meta: {
          status: result.length > 0 ? 'success' : 'no_result',
          error: '',
        },
        data: result.length > 0 ? [...result] : [],
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola Recent Search')
      return {
        meta: {
          status: 'error',
          error: errorMessage,
        },
        data: [],
      }
    })
}

const postRecentSearch = (sessionId, sid, keyword) => {
  post(
    `${RECENT_SEARCH_ENDPOINT}?sessionId=${sessionId}&q=${keyword}`,
    {},
    {
      ...endpoints.setting,
      headers: { Authorization: `Bearer ${sid}` },
    }
  )
    .then(result => {
      return {
        meta: {
          status: 'success',
          error: '',
        },
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola Update Recent Search')
      return {
        meta: {
          status: 'error',
          error: errorMessage,
        },
      }
    })
}

const deleteRecentSearchAll = (sessionId, sid) => {
  return axiosDelete(`${RECENT_SEARCH_ENDPOINT}?sessionId=${sessionId}`, {
    ...endpoints.setting,
    headers: { Authorization: `Bearer ${sid}` },
  })
    .then(result => {
      return {
        meta: {
          status: 'success',
          error: '',
        },
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola Removing All Recent Search')
      return {
        meta: {
          status: 'error',
          error: errorMessage,
        },
      }
    })
}

const deleteRecentSearch = (sessionId, sid, keyword) => {
  return axiosDelete(`${RECENT_SEARCH_ENDPOINT}?sessionId=${sessionId}&q=${keyword}`, {
    ...endpoints.setting,
    headers: { Authorization: `Bearer ${sid}` },
  })
    .then(result => {
      return {
        meta: {
          status: 'success',
          error: '',
        },
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola Removing Recent Search')
      return {
        meta: {
          status: 'error',
          error: errorMessage,
        },
      }
    })
}

const getMovieDetail = ({ id }) => {
  return get(`${VIDEOS_ENDPOINT_NOCACHE}/${id}`, {
    ...endpoints.setting,
  })
    .then(response => {
      const result = utils.normalizeVideoDetail(response)
      return {
        meta: {
          status: result.length > 0 ? 'success' : 'no_result',
          error: '',
        },
        data: [...result] || [],
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola Movie Detail')
      return {
        meta: {
          status: 'error',
          error: errorMessage,
        },
        data: [],
      }
    })
}

const getRecommendation = id => {
  return get(`${RECOMMENDATION}/${id}`, {
    ...endpoints.setting,
  })
    .then(response => {
      const result = utils.normalizeRecommendation(response)
      return {
        meta: {
          status: result.length > 0 ? 'success' : 'no_result',
          error: '',
        },
        data: [...result] || [],
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola Recommendation')
      return {
        meta: {
          status: 'error',
          error: errorMessage,
        },
        data: [],
      }
    })
}

const getAllSubscriptions = token => {
  return get(`${SUBSCRIPTION_ENDPOINT}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      app_id: 2,
    },
    ...endpoints.setting,
  })
    .then(response => {
      return {
        meta: {
          status: 'success',
          error: '',
        },
        data: response.data.data,
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola All Subscriptions')
      return {
        meta: {
          status: 'error',
          error: errorMessage,
        },
        data: [],
      }
    })
}

const createOrder = ({ token, uid, subscriptionId = 26, price = 10000 }) => {
  const data = JSON.stringify({
    order_type_id: 1,
    subscription_id: subscriptionId /* hanya hardcode midtrans 26 */,
    quantity: 1 /* subscription per tahun */,
    uom: 'm' /* sementara monthly */,
    package_expiry: '',
    status: 0,
    user_id: uid,
    order_amount: 1 * price,
    total_price: 1 * price,
    source: 'GSyOzu2WPaAijqbX3Tv6HCQr' /* hardcode dulu nanti baru di pikirin lagi */,
    payment_method_id: 270 /* payment_method_id midtrans di hardcode 270 dari DataBase */,
  })

  return post(`${ORDER_ENDPOINT}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
    ...endpoints.setting,
  })
    .then(response => {
      const { data } = response.data
      return {
        meta: {
          status: 'success',
          error: '',
        },
        data: {
          id: data[0].id,
          ...data[0].attributes,
        },
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola Order')
      return {
        meta: {
          status: 'error',
          error: errorMessage,
        },
        data: [],
      }
    })
}

const createMidtransPayment = ({ uid, firstName, lastName, phoneNumber, email, token, orderId }) => {
  const data = JSON.stringify({
    paymentMethodId: 270, // payment_method_id midtrans di hardcode 17 dari DataBase
    Id: `${orderId}`,
    title: 'Mola - Paket No Ads',
    phone: phoneNumber,
    email: email,
    name: `${firstName} ${lastName}`,
    userId: uid,
    productSku: '1',
    productName: 'Mola - Paket No Ads',
  })

  return post(`${PAYMENT_ENDPOINT}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
    ...endpoints.setting,
  })
    .then(response => {
      const { paymentData } = response.data
      const redirectUrl = `${endpoints.domain}/accounts/profile`
      return {
        meta: {
          status: 'success',
          error: '',
        },
        data: { ...paymentData, redirectUrl },
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola Midtrans Payment')
      return {
        meta: {
          status: 'error',
          error: errorMessage,
        },
        data: '',
      }
    })
}
// const getOrderHistoryTransactions = ({ uid, token }) => {
//   // console.log('token', token)
//   return get(`${ORDER_ENDPOINT}_/users/${uid}`, {
//     headers: token && { Authorization: `Bearer ${token}` },
//     withCredentials: true,
//     ...endpoints.setting,
//   })
//     .then(response => {
//       const { data } = response.data
//       return {
//         meta: {
//           status: 'success',
//           error: '',
//         },
//         data,
//       }
//     })
//     .catch(error => {
//       const errorMessage = error.toString().replace('Error:', 'Mola History Transactions')
//       return {
//         meta: {
//           status: 'error',
//           error: errorMessage,
//         },
//         data: [],
//       }
//     })
// }

const getNotifications = (limit = 5, time = '') => {
  // console.log('JALAN HANDLER', `${NOTIFICATION_ENDPOINT}/in-app?app_id=molatv&limit=${limit}&time=${time}`)
  return get(`${NOTIFICATION_ENDPOINT}/in-app?app_id=molatv&limit=${limit}&time=${time}`, { ...endpoints.setting })
    .then(response => {
      const result = utils.normalizeNotifications(response)
      return {
        meta: {
          status: 'success',
          error: '',
        },
        data: result || [],
      }
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error: error.toString(),
        },
      }
    })
}

const getTotalNotifications = () => {
  // console.log('JALAN HANDLER', NOTIFICATION_ENDPOINT)
  return get(`${NOTIFICATION_ENDPOINT}/total`, { ...endpoints.setting })
    .then(response => {
      const { data } = response.data
      const { total } = data.attributes
      return {
        meta: {
          status: 'success',
          error: '',
        },
        data: total || 0,
      }
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error: error.toString(),
        },
      }
    })
}

const getChannelsList = (id = 'channels-m') => {
  return get(`${CHANNELS_PLAYLIST_ENDPOINT}/${id}`, {
    ...endpoints.setting,
  })
    .then(response => {
      const result = utils.normalizeChannelPlaylist(response)
      return {
        meta: {
          status: result[0].length > 0 ? 'success' : 'no_result',
          error: '',
        },
        data: [...result[0]] || [],
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola Playlist Channels')
      return {
        meta: {
          status: 'error',
          error: errorMessage,
        },
        data: [],
      }
    })
}

const getProgrammeGuides = (date, playlistId, timezone = 7) => {
  return get(`${PROGRAMME_GUIDES}/${date}/playlists/${playlistId}?tz=${timezone}`, {
    ...endpoints.setting,
    // headers: token && { Authorization: `Bearer ${token}` }
  })
    .then(response => {
      const result = utils.normalizeProgrammeGuides(response)
      return {
        meta: {
          status: 'success',
          error: '',
        },
        data: result,
      }
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error: `${error} - Mola programme Guides`,
        },
        data: [],
        // playlistId: 'err',
      }
    })
}

const getHeaderMenu = () => {
  return get(`${HEADERMENU}/menu.json`, {
    ...endpoints.setting,
  })
    .then(response => {
      // console.log('response', response)
      return {
        meta: {
          status: 'success',
        },
        data: response,
      }
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error,
        },
        data: {},
      }
    })
}

const getRecommendedArticles = articlesId => {
  return get(`${ARTICLES_RECOMMENDED_ENDPOINT}/${articlesId}`, {
    ...endpoints.setting,
  })
    .then(response => {
      const data = _.get(response, 'data.data', {}),
        title = _.get(data, 'attributes.title', ''),
        articles = _.get(data, 'attributes.articles', [])

      const articlesFiltered =
        articles.length > 0
          ? articles.map(article => ({
              id: article.id,
              type: article.type,
              ...article.attributes,
            }))
          : []

      return {
        meta: {
          status: articlesFiltered.length > 0 ? 'success' : 'no_result',
          title,
          error: '',
        },
        data: articlesFiltered,
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola Articles')
      return {
        meta: {
          status: 'error',
          error: errorMessage,
        },
        data: [],
      }
    })
}

const getArticlesDetail = articleId => {
  return get(`${ARTICLES_ENDPOINT}/${articleId}`, {
    ...endpoints.setting,
  })
    .then(response => {
      if (response.status === 200) {
        const result = utils.normalizeArticles(response)
        return {
          meta: {
            status: 'success',
          },
          data: result,
        }
      } else {
        return {
          meta: {
            status: 'error',
            error: `Mola Articles request failed with status ${response.status}`,
          },
          data: [],
        }
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola Articles')
      return {
        meta: {
          status: 'error',
          error: errorMessage,
        },
        data: [],
      }
    })
}

const getPartners = () => {
  return get(`${PARTNERS_ENDPOINT}`, {
    ...endpoints.setting,
  })
    .then(response => {
      const result = utils.normalizePartners(response)
      return {
        meta: {
          status: 'success',
        },
        data: result,
      }
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error,
        },
        data: [],
      }
    })
}

export default {
  getHomePlaylist,
  getFeaturePlaylist,
  getFeatureBanner,
  getHomeVideo,
  getAllHistory,
  getSearchResult,
  getRecentSearch,
  postRecentSearch,
  deleteRecentSearch,
  deleteRecentSearchAll,
  getMovieDetail,
  getRecommendation,
  getAllSubscriptions,
  createOrder,
  createMidtransPayment,
  getSportVideo,
  getAllGenreSpo,
  getMatchesPlaylists,
  getMatchesList,
  getMatchDetail,
  getChannelsList,
  getProgrammeGuides,
  getHeaderMenu,
  getPlaylistPlaylists,
  getRecommendedArticles,
  getArticlesDetail,
  getPartners,
  getNotifications,
  getTotalNotifications,
}
