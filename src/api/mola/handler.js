import { get, post, delete as axiosDelete } from 'axios'
import qs from 'query-string'
import {
  VIDEOS_ENDPOINT,
  HOME_PLAYLIST_ENDPOINT,
  HISTORY_ENDPOINT,
  SEARCH_ENDPOINT,
  SEARCH_GENRE_ENDPOINT,
  RECENT_SEARCH_ENDPOINT,
  MOVIE_DETAIL_ENDPOINT,
  SUBSCRIPTION_ENDPOINT,
  ORDER_ENDPOINT,
  PAYMENT_ENDPOINT,
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

const getHomeVideo = ({ id }) => {
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
  return get(`${MOVIE_DETAIL_ENDPOINT}/${id}`, {
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
        data: [...result[0]] || [],
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

const getHotPlaylist = () => {
  return get(`${HOME_PLAYLIST_ENDPOINT}/mola-hot`, {
    ...endpoints.setting,
  })
    .then(response => {
      const result = utils.normalizeHomeVideo(response)
      return {
        meta: {
          status: result[0].length > 0 ? 'success' : 'no_result',
          error: '',
        },
        data: [...result[0]] || [],
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
  console.log(token, SUBSCRIPTION_ENDPOINT)
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

const createOrder = ({ token, uid }) => {
  const data = JSON.stringify({
    order_type_id: 1,
    subscription_id: 26, // hanya hardcode midtrans 26
    quantity: 1,
    uom: 'm',
    package_expiry: '',
    status: 0,
    user_id: uid,
    order_amount: 100000,
    total_price: 100000,
    source: 'GSyOzu2WPaAijqbX3Tv6HCQr',
    payment_method_id: 270, // payment_method_id midtrans di hardcode 270 dari DataBase
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
      console.log(response)
      const { paymentData } = response.data
      const redirectUrl = `${endpoints.domain}/accounts/profile?tab=subscription`
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

export default {
  getHomePlaylist,
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
  getHotPlaylist,
  getAllSubscriptions,
  createOrder,
  createMidtransPayment,
}
