import { get, post } from 'axios'
import queryString from 'query-string'

import { HOME_PLAYLIST_ENDPOINT, HISTORY_ENDPOINT, SEARCH_VIDEOS_ENDPOINT, SEARCH_ENDPOINT } from './endpoints'

import utils from './util'

import config from '@global/config/api'
const { NODE_ENV } = process.env

const getHomePlaylist = ({ ...payload }) => {
  return get(
    `${HOME_PLAYLIST_ENDPOINT}/mola-home`,
    {
      ...config[NODE_ENV].api
    }
  ).then(
    response => {
      const result = utils.normalizeHomePlaylist(response)
      return {
        meta: {
          status: result[0].length > 0 ? 'success' : 'no_result',
          error: '',
        },
        data: [...result[0]] || [],
      }
    }
  ).catch(error => {
    return {
      meta: {
        status: 'error',
        error: `home/getHomePlaylist ~ ${error}`,
      },
      data: [],
    }
  })
}

const getHomeVideo = ({ id, ...payload }) => {
  return get(
    `${HOME_PLAYLIST_ENDPOINT}/${id}`,
    {
      ...config[NODE_ENV].api
    }
  ).then(
    response => {
      const result = utils.normalizeHomeVideo(response)
      return {
        meta: {
          status: 'success',
          error: ''
        },
        data: [...result[0]] || []
      };
    }
  ).catch(error => {
    return {
      meta: {
        status,
        error: `home/getHomeVideo ~ ${error}`,
      },
      data: [],
    }
  })
}

const getAllHistory = (payload) => {
  return get(`${HISTORY_ENDPOINT}`, { ...payload }).then(
    (response) => {
      const result = utils.normalizeHistory(response)
      return {
        meta: {
          status: result.length > 0 ? 'success' : 'no_result',
        },
        data: [...result] || [],
      }
    }
  ).catch((error) => {
    return {
      meta: {
        status: 'error',
        text: `history/getAllHistory ~ ${error}`,
      },
      data: [],
    }
  })
}

const getSearchVideo = (payload) => {
  return get(`${SEARCH_VIDEOS_ENDPOINT}`, { ...payload }).then(
    (response) => {
      const result = utils.normalizeSearchVideo(response);
      return {
        meta: {
          status: result.length > 0 ? 'success' : 'no_result',
          error: '',
        },
        data: [...result] || [],
      }
    }
  ).catch((error) => {
    return {
      meta: {
        status: 'error',
        error: `search/getSearchResult ~ ${error}`,
      },
      data: [],
    }
  })
}

const getSearchResult = ({ q }) => {
  return get(`${SEARCH_ENDPOINT}`, { params: { q: q } }).then(
    (response) => {
      const result = utils.normalizeSearchResult(response);
      return {
        meta: {
          status: result.length > 0 ? 'success' : 'no_result',
          error: '',
        },
        data: [...result] || [],
      }
    }
  ).catch((error) => {
    return {
      meta: {
        status: 'error',
        error: `search/getSearchResult ~ ${error}`,
      },
      data: [],
    }
  })
}

const getAuth = ({ code, redirect_uri }) => {
  const { endpoints: { auth: authURL }, tokenAuth: authConfig } = config["production"];
  return post(
    `${authURL}/_/oauth2/v1/token`,
    {
      ...authConfig,
      redirect_uri,
      code
    }
  )
    .then(response => {
      if (response.status === 200) {
        const result = utils.normalizeUserToken(response);
        return {
          meta: {
            status: 'success',
            error: '',
          },
          data: result,
        }
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

const getUserInfo = token => {
  const { endpoints: { auth: authURL } } = config["production"];
  return get(
    `${authURL}/_/v1/userinfo`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(response => {
      const result = utils.normalizeUserInfo(response);
      return {
        meta: {
          status: 'success',
          error: '',
        },
        data: result
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

const revokeAuth = token => {
  const { endpoints: { auth: authURL }, tokenAuth: authConfig } = config["production"];
  return post(
    `${authURL}/_/oauth2/v1/revoke`,
    {
      app_key: authConfig.app_key,
      app_secret: authConfig.app_secret,
      token
    }
  )
    .then(response => {
      if (response.status === 'success') {
        return {
          meta: {
            status: 'success',
            error: '',
          },
          data: {},
        }
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

export default {
  getHomePlaylist,
  getHomeVideo,
  getAllHistory,
  getSearchVideo,
  getAuth,
  getUserInfo,
  getSearchResult,
  revokeAuth,
  // updateUserToken,
}
