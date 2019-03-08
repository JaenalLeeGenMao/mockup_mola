import { get, post, delete as axiosDelete } from 'axios'
import { VIDEOS_ENDPOINT, HOME_PLAYLIST_ENDPOINT, HISTORY_ENDPOINT, SEARCH_ENDPOINT, SEARCH_GENRE_ENDPOINT, RECENT_SEARCH_ENDPOINT, MOVIE_DETAIL_ENDPOINT, SUBSCRIPTION_ENDPOINT } from './endpoints'
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
  return get('/api/v2/subscriptions/subscriptions', {
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
}
