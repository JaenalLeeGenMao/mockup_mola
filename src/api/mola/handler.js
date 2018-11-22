import { get, post, delete as axiosDelete } from 'axios';
import { VIDEOS_ENDPOINT, HOME_PLAYLIST_ENDPOINT, HISTORY_ENDPOINT, SEARCH_ENDPOINT, SEARCH_GENRE_ENDPOINT, RECENT_SEARCH_ENDPOINT, MOVIE_DETAIL_ENDPOINT, MOVIE_STREAMING } from './endpoints';
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
          error: 'Mola loves watchin playlist from home, but Mola is no where to be found'
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
          error: "Mola loves video but sadly it's not available, cheer up!"
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
          text: 'Mola could not reach through the history, because Mola is positive and stays in the present'
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
          error: "We've searched every corner of our empire, looks like the your search is history"
        },
        data: []
      };
    });
};

const getSearchGenre = () => {
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
          error: 'Searching genre is probably missing, off we go to hunt'
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
          error: "Looks like you have not searched recently, what've you been up to?"
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
          error: "Aha! Couldn't add recent search, seems like we detected some spooky search result "
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
          error: 'Sure deleting all your recent search, we will miss you'
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
          error: 'Recent search is refusing to be removed, since it loves you'
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
          error: 'Movie details are missing, contact officer Mola immediately'
        },
        data: []
      };
    });
};

const getMovieLibraryList = () => {
  return get(`${VIDEOS_ENDPOINT}`, {
    ...endpoints.setting
  })
    .then(response => {
      const result = utils.normalizeMovieLibraryList(response);

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
          error: 'Apparently Mola is having difficulty to list down movie library'
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
          error: "We've searched thoroughly in our Movie Library, your sure you're not entering your password?"
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
          error: 'Something amazing is happening behind the scene, to kickstart your stream make sure to browse other movies'
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
  getMovieLibraryList,
  getMovieStream
};
