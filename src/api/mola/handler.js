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

const updateUserToken = ({ origin = '', search = '', ...props }) => {
  const parsed = queryString.parse(search),
    { baseURL: { auth: authURL }, tokenAuth: authConfig } = config["production"];
  if (parsed.code) {
    return post(
      `${authURL}/_/oauth2/v1/token`,
      {
        ...authConfig,
        redirect_uri: origin,
        code: parsed.code
      }
    )
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          const result = utils.normalizeUserToken(response);
          console.log("UPDATE USER TOKEN", result);
          return {
            meta: {
              status: 'success',
              error: '',
            },
            data: result,
          }
        }
        return {
          meta: {
            status: 'error',
            error: `user/updateUserToken ~ Failed to authenticate user`,
          },
          data: {}
        }
      })
      .catch(error => {
        return {
          meta: {
            status: 'error',
            error: `user/updateUserToken ~ ${error}`,
          },
          data: {}
        }
      });
  }
  return {
    meta: {
      status: 'error',
      error: `user/updateUserToken ~ Failed to authenticate user`,
    },
    data: {}
  }
}

const getUserInfo = token => {
  const { baseURL: { auth: authURL } } = config["production"];
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
          error: `user/getUserInfo ~ ${error}`,
        },
        data: {}
      }
    });
}

export default {
  getHomePlaylist,
  getHomeVideo,
  getAllHistory,
  getSearchVideo,
  getSearchResult,
  updateUserToken,
  getUserInfo,
}
