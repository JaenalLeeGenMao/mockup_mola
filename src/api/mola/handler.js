import { get, post, delete as axiosDelete } from 'axios'
import _ from 'lodash'
import {
  VIDEOS_ENDPOINT,
  HOME_PLAYLIST_ENDPOINT,
  HISTORY_ENDPOINT,
  SEARCH_ENDPOINT,
  SEARCH_GENRE_ENDPOINT,
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
} from './endpoints'
import utils from './util'

import { endpoints } from '@source/config'

const getHomePlaylist = () => {
  return get(`${HOME_PLAYLIST_ENDPOINT}/mola-home`, {
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
  return get(`${HOME_PLAYLIST_ENDPOINT}/${id}`, {
    ...endpoints.setting,
  })
    .then(response => {
      const data = _.get(response, 'data.data', []),
        id = _.get(data, '[0].id', ''),
        type = _.get(data, '[0].type', ''),
        title = _.get(data, '[0].attributes.title', ''),
        visibility = _.get(data, '[0].attributes.visibility', 0),
        playlists = _.get(data, '[0].attributes.playlists', [])

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
      // const response = {
      //   data: {
      //     data: [
      //       {
      //         id: 7,
      //         attributes: {
      //           name: isMobile ? 'mobile-featured' : 'desktop-featured',
      //           banners: [
      //             {
      //               id: 767,
      //               type: 'banners',
      //               attributes: {
      //                 buttonText: ' ',
      //                 description: ' ',
      //                 imageUrl: isMobile ? 'https://mola01.koicdn.com/u/image/057b30fe-e0fb-41dd-90b8-231b071105d4/image.jpeg' : 'https://mola01.koicdn.com/u/image/911b47a8-d224-4288-8cde-1f25dd2b0105/image.jpeg',
      //                 link: ' ',
      //                 name: ' ',
      //                 isDark: isMobile ? 1 : 0,
      //               },
      //             },
      //             {
      //               id: 768,
      //               type: 'banners',
      //               attributes: {
      //                 buttonText: ' ',
      //                 description: ' ',
      //                 imageUrl: isMobile ? 'https://mola01.koicdn.com/u/image/057b30fe-e0fb-41dd-90b8-231b071105d4/image.jpeg' : 'https://mola01.koicdn.com/u/image/911b47a8-d224-4288-8cde-1f25dd2b0105/image.jpeg',
      //                 link: ' ',
      //                 name: ' ',
      //                 isDark: isMobile ? 1 : 0,
      //               },
      //             },
      //             {
      //               id: 769,
      //               type: 'banners',
      //               attributes: {
      //                 buttonText: ' ',
      //                 description: ' ',
      //                 imageUrl: isMobile ? 'https://mola01.koicdn.com/u/image/057b30fe-e0fb-41dd-90b8-231b071105d4/image.jpeg' : 'https://mola01.koicdn.com/u/image/911b47a8-d224-4288-8cde-1f25dd2b0105/image.jpeg',
      //                 link: ' ',
      //                 name: ' ',
      //                 isDark: isMobile ? 1 : 0,
      //               },
      //             },
      //           ],
      //         },
      //       },
      //     ],
      //   },
      // }
      const result = utils.normalizeFeatureBanner(response)
      // return new Promise(resolve =>
      //   resolve({
      //     meta: {
      //       status: result[0].length > 0 ? 'success' : 'no_result',
      //       error: '',
      //     },
      //     data: [...result[0]] || [],
      //   })
      // )
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
  return get(`${HOME_PLAYLIST_ENDPOINT}/${id}`, {
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

const getSportList = (id = 'mola-sport') => {
  return get(`${HOME_PLAYLIST_ENDPOINT}/${id}`, {
    ...endpoints.setting,
  })
    .then(response => {
      const result = utils.normalizeHomePlaylist(response)
      // console.log('handler Sport or matches 1', result)
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
  return get(`${HOME_PLAYLIST_ENDPOINT}/${id}`, {
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

const getMatchDetail = id => {
  return post(
    `${VIDEOS_ENDPOINT}/?relationships=1`,
    {
      videos: id,
    },
    {
      ...endpoints.setting,
    }
  )
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
const getMatchesPlaylists = id => {
  return post(
    `${HOME_PLAYLIST_ENDPOINT}`,
    {
      playlists: id,
    },
    {
      ...endpoints.setting,
    }
  )
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
  return get(`${HOME_PLAYLIST_ENDPOINT}/${id}`, {
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
  return get(`${HOME_PLAYLIST_ENDPOINT}/${id}`, {
    ...endpoints.setting,
  })
    .then(response => {
      const data = _.get(response, 'data.data', []),
        description = _.get(data, '[0].attributes.description', ''),
        background = _.get(data, '[0].attributes.images.cover.background.landscape', ''),
        title = _.get(data, '[0].attributes.title', '')

      const playlistsFiltered =
        data.length > 0
          ? data
            .map(dt => ({
              id: dt.id,
              type: dt.type,
              ...dt.attributes,
            }))
            .filter(dt => dt.visibility === 1)
          : []

      return {
        meta: {
          background,
          title,
          description,
          status: playlistsFiltered.length > 0 ? 'success' : 'no_result',
          error: '',
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
  return get(`${HOME_PLAYLIST_ENDPOINT}/${id}`, {
    ...endpoints.setting,
  })
    .then(response => {
      // console.log('handler response get sport 2222', response) //here video exist?
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

const getSearchGenre = () => {
  return get(`${SEARCH_GENRE_ENDPOINT}`, {
    ...endpoints.setting,
  })
    .then(response => {
      const result = utils.normalizeSearchGenre(response)
      return {
        meta: {
          status: result.length > 0 ? 'success' : 'no_result',
          error: '',
        },
        data: [...result[0]] || [],
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola Search Genre')
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
  return get(`${VIDEOS_ENDPOINT}/${id}`, {
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

const getMovieLibraryList = () => {
  return get(`${VIDEOS_ENDPOINT}`, {
    ...endpoints.setting,
  })
    .then(response => {
      const result = utils.normalizeMovieLibraryList(response)

      return {
        meta: {
          status: result.length > 0 ? 'success' : 'no_result',
          error: '',
        },
        data: [...result] || [],
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola List of Movie Library')
      return {
        meta: {
          status: 'error',
          error: errorMessage,
        },
        data: [],
      }
    })
}

const getMovieLibrary = id => {
  return get(`${HOME_PLAYLIST_ENDPOINT}/${id}`, {
    ...endpoints.setting,
  })
    .then(response => {
      const result = utils.normalizeMovieLibrary(response)
      return {
        meta: {
          status: result.length > 0 ? 'success' : 'no_result',
          error: '',
        },
        data: result.length > 0 ? result : [],
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola Movie Library')
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
    // return get(`${HOME_PLAYLIST_ENDPOINT}/mola-hot`, {
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
      const errorMessage = error.toString().replace('Error:', 'Mola Hot Playlists')
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
const getOrderHistoryTransactions = ({ uid, token }) => {
  // console.log('token', token)
  return get(`${ORDER_ENDPOINT}_/users/${uid}`, {
    headers: token && { Authorization: `Bearer ${token}` },
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
        data,
      }
    })
    .catch(error => {
      const errorMessage = error.toString().replace('Error:', 'Mola History Transactions')
      return {
        meta: {
          status: 'error',
          error: errorMessage,
        },
        data: [],
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

const getProgrammeGuides = (date, playlistId, timezone = '7') => {
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

export default {
  getHomePlaylist,
  getFeaturePlaylist,
  getFeatureBanner,
  getHomeVideo,
  getAllHistory,
  getSearchResult,
  getSearchGenre,
  getRecentSearch,
  postRecentSearch,
  deleteRecentSearch,
  deleteRecentSearchAll,
  getMovieDetail,
  getMovieLibrary,
  getMovieLibraryList,
  getRecommendation,
  getAllSubscriptions,
  createOrder,
  createMidtransPayment,
  getOrderHistoryTransactions,
  getSportList,
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
}
