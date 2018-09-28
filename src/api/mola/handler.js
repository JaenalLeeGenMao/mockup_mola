import { get, post } from 'axios'
import { HOME_PLAYLIST_ENDPOINT, HISTORY_ENDPOINT, SEARCH_ENDPOINT, SEARCH_GENRE_ENDPOINT, MOVIE_DETAIL_ENDPOINT, MOVIE_STREAMING } from './endpoints'
import utils from './util'

import { api } from '@source/config'
const { config } = api;

const getHomePlaylist = ({ ...payload }) => {
  return get(
    `${HOME_PLAYLIST_ENDPOINT}/mola-home`,
    {
      ...config.api
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
      ...config.api
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

const getAllHistory = ({ userId }) => {
  return get(`${HISTORY_ENDPOINT}/${userId}/videos/histories`, {
    ...config.api
  }).then(
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

const getSearchResult = ({ q }) => {
  return get(`${SEARCH_ENDPOINT}`, { params: { q: q },
    ...config.api
  }).then(
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

const getSearchGenre = (payload) => {
  return get(`${SEARCH_GENRE_ENDPOINT}`, {
    ...config.api
  }).then(
    (response) => {
      const result = utils.normalizeSearchGenre(response);
      return {
        meta: {
          status: result.length > 0 ? 'success' : 'no_result',
          error: '',
        },
        data: [...result[0]] || [],
      }
    }
  ).catch((error) => {
    return {
      meta: {
        status: 'error',
        error: `search/getSearchGenre ~ ${error}`,
      },
      data: [],
    }
  })
}

const getMovieDetail = ({ id }) => {
  return get(
    `${MOVIE_DETAIL_ENDPOINT}/${id}`,
    {
      ...config.api
    }).then(
    (response) => {
      const result = utils.normalizeVideoDetail(response)
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
        error: `home/getMovieDetail ~ ${error}`,
      },
      data: [],
    }
  })
}

const getMovieLibrary = (id) => {
  return get(`${HOME_PLAYLIST_ENDPOINT}/${id}`,
    {
      ...config.api
    }).then(
    (response) => {
      const result = utils.normalizeMovieLibrary(response);
      return {
        meta: {
          status: result.length > 0 ? 'success' : 'no_result',
          error: '',
        },
        data: [...result[0]] || [],
      }
    }).catch((error) => {
    return {
      meta: {
        status: 'error',
        error: `search/getMovieLibrary ~ ${error}`,
      },
      data: [],
    }
  })
}

const getMovieStream = ({ id }) => {
  return get(
    `${MOVIE_STREAMING}/${id}`).then(
    (response) => {
      const result = utils.normalizeVideoStream(response)
      console.log('meta status', result);
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
        error: `home/getMovieStream ~ ${error}`,
      },
      data: [],
    }
  })
}

const getAuth = ({ code, redirect_uri }) => {
  const { endpoints: { auth: authURL }, tokenAuth: authConfig } = config;
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
        const result = utils.normalizeAuth(response);
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
  const { endpoints: { auth: authURL } } = config;
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
  const { endpoints: { auth: authURL }, tokenAuth: authConfig } = config;
  return post(
    `${authURL}/_/oauth2/v1/revoke`,
    {
      app_key: authConfig.app_key,
      app_secret: authConfig.app_secret,
      token
    }
  )
    .then(response => {
      if (response.data.status === 'success') {
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

const updateAuth = token => {
  const { endpoints: { auth: authURL }, tokenAuth: authConfig } = config;
  return get(
    `${authURL}/_/v1/access_token`,
    {
      params: {
        app_key: authConfig.app_key,
        app_secret: authConfig.app_secret,
        access_token: token,
        expires_in: 3600,
      }
    }
  )
    .then(response => {
      if (response.status === 200) {
        const result = utils.normalizeAuth(response.data);
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

export default {
  getHomePlaylist,
  getHomeVideo,
  getAllHistory,
  getSearchResult,
  getSearchGenre,
  getMovieDetail,
  getUserInfo,
  getAuth,
  updateAuth,
  revokeAuth,
  getMovieLibrary,
  getMovieStream
}
