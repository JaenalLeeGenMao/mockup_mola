import { get, post, delete as axiosDelete } from 'axios';
import {
  HOME_PLAYLIST_ENDPOINT,
  HISTORY_ENDPOINT,
  SEARCH_ENDPOINT,
  SEARCH_GENRE_ENDPOINT,
  RECENT_SEARCH_ENDPOINT,
  MOVIE_DETAIL_ENDPOINT,
  MOVIE_STREAMING
} from './endpoints';
import utils from './util';

import { endpoints } from '@source/config';

const getHomePlaylist = () => {
  return get(`${HOME_PLAYLIST_ENDPOINT}/mola-home`, {
    ...endpoints.setting
  })
    .then(response => {
      const result = utils.normalizeHomePlaylist(response);
      return {
        meta: {
          status: result[0].length > 0 ? 'success' : 'no_result',
          error: ''
        },
        data: [...result[0]] || []
      };
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error: `home/getHomePlaylist - ${error}`
        },
        data: []
      };
    });
};

const getHomeVideo = ({ id }) => {
  return get(`${HOME_PLAYLIST_ENDPOINT}/${id}`, {
    ...endpoints.setting
  })
    .then(response => {
      const result = utils.normalizeHomeVideo(response);
      return {
        meta: {
          status: 'success',
          error: ''
        },
        data: [...result[0]] || []
      };
    })
    .catch(error => {
      return {
        meta: {
          status,
          error: `home/getHomeVideo - ${error}`
        },
        data: []
      };
    });
};

const getAllHistory = ({ userId }) => {
  return get(`${HISTORY_ENDPOINT}/${userId}/videos/histories`, {
    ...endpoints.setting
  })
    .then(response => {
      const result = utils.normalizeHistory(response);
      return {
        meta: {
          status: result.length > 0 ? 'success' : 'no_result'
        },
        data: [...result] || []
      };
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          text: `history/getAllHistory - ${error}`
        },
        data: []
      };
    });
};

const getSearchResult = ({ q }) => {
  return get(`${SEARCH_ENDPOINT}`, {
    params: { q: q },
    ...endpoints.setting
  })
    .then(response => {
      const result = utils.normalizeSearchResult(response);
      return {
        meta: {
          status: result.length > 0 ? 'success' : 'no_result',
          error: ''
        },
        data: [...result] || []
      };
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error: `search/getSearchResult - ${error}`
        },
        data: []
      };
    });
};

const getSearchGenre = payload => {
  return get(`${SEARCH_GENRE_ENDPOINT}`, {
    ...endpoints.setting
  })
    .then(response => {
      const result = utils.normalizeSearchGenre(response);
      return {
        meta: {
          status: result.length > 0 ? 'success' : 'no_result',
          error: ''
        },
        data: [...result[0]] || []
      };
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error: `search/getSearchGenre - ${error}`
        },
        data: []
      };
    });
};

const getRecentSearch = (sessionId, sid) => {
  return get(`${RECENT_SEARCH_ENDPOINT}`, {
    params: { sessionId: sessionId },
    ...endpoints.setting,
    headers: { Authorization: `Bearer ${sid}` }
  })
    .then(response => {
      const result = utils.normalizeRecentSearch(response);
      return {
        meta: {
          status: result.length > 0 ? 'success' : 'no_result',
          error: ''
        },
        data: result.length > 0 ? [...result] : []
      };
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error: `search/getRecentSearch - ${error}`
        },
        data: []
      };
    });
};

const postRecentSearch = (sessionId, sid, keyword) => {
  post(
    `${RECENT_SEARCH_ENDPOINT}?sessionId=${sessionId}&q=${keyword}`,
    {},
    {
      ...endpoints.setting,
      headers: { Authorization: `Bearer ${sid}` }
    }
  )
    .then(result => {
      return {
        meta: {
          status: 'success',
          error: ''
        }
      };
    })
    .catch(err => {
      return {
        meta: {
          status: 'error',
          error: 'Error add recent search ' + err
        }
      };
    });
};

const deleteRecentSearchAll = (sessionId, sid) => {
  return axiosDelete(`${RECENT_SEARCH_ENDPOINT}?sessionId=${sessionId}`, {
    ...endpoints.setting,
    headers: { Authorization: `Bearer ${sid}` }
  })
    .then(result => {
      return {
        meta: {
          status: 'success',
          error: ''
        }
      };
    })
    .catch(err => {
      return {
        meta: {
          status: 'error',
          error: err
        }
      };
    });
};

const deleteRecentSearch = (sessionId, sid, keyword) => {
  return axiosDelete(`${RECENT_SEARCH_ENDPOINT}?sessionId=${sessionId}&q=${keyword}`, {
    ...endpoints.setting,
    headers: { Authorization: `Bearer ${sid}` }
  })
    .then(result => {
      return {
        meta: {
          status: 'success',
          error: ''
        }
      };
    })
    .catch(err => {
      return {
        meta: {
          status: 'error',
          error: err
        }
      };
    });
};

const getMovieDetail = ({ id }) => {
  return get(`${MOVIE_DETAIL_ENDPOINT}/${id}`, {
    ...endpoints.setting
  })
    .then(response => {
      const result = utils.normalizeVideoDetail(response);
      return {
        meta: {
          status: result.length > 0 ? 'success' : 'no_result',
          error: ''
        },
        data: [...result] || []
      };
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error: `home/getMovieDetail - ${error}`
        },
        data: []
      };
    });
};

const getMovieLibrary = id => {
  return get(`${HOME_PLAYLIST_ENDPOINT}/${id}`, {
    ...endpoints.setting
  })
    .then(response => {
      const result = utils.normalizeMovieLibrary(response);
      return {
        meta: {
          status: result.length > 0 ? 'success' : 'no_result',
          error: ''
        },
        data: [...result[0]] || []
      };
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error: `search/getMovieLibrary - ${error}`
        },
        data: []
      };
    });
};

const getMovieStream = ({ id }) => {
  return get(`${MOVIE_STREAMING}/${id}`)
    .then(response => {
      const result = utils.normalizeVideoStream(response);
      return {
        meta: {
          status: result.length > 0 ? 'success' : 'no_result',
          error: ''
        },
        data: [...result] || []
      };
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error: `home/getMovieStream - ${error}`
        },
        data: []
      };
    });
};

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
  getMovieStream
};
