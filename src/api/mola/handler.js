import { get } from 'axios'
import { HOME_PLAYLIST_ENDPOINT, HISTORY_ENDPOINT, VIDEOS_ENDPOINT } from './endpoints'
import utils from './util'
import config from '@global/config/api'
const { NODE_ENV } = process.env

const getHomePlaylist = () => {
  return get(
    `${HOME_PLAYLIST_ENDPOINT}/mola-home`,
    {
      ...config[NODE_ENV].api
    }
  ).then(
    (response) => {
      const result = utils.normalizeHomePlaylist(response)
      return {
        meta: {
          status: result[0].length > 0 ? 'success' : 'no_result',
          error: '',
        },
        data: [...result[0]] || [],
      }
    }
  ).catch((error) => {
    return {
      meta: {
        status: 'error',
        error: `home/getHomePlaylist ~ ${error}`,
      },
      data: [],
    }
  })
}

const getHomeVideo = ({ id }) => {
  return get(
    `${HOME_PLAYLIST_ENDPOINT}/${id}`,
    {
      ...config[NODE_ENV].api
    }
  ).then(
    (response) => {
      const result = utils.normalizeHomeVideo(response)
      return {
        meta: {
          status: 'success',
          error: ''
        },
        data: [...result[0]] || []
      };
    }
  ).catch((error) => {
    const status = typeof error === 'object' ? 'success' : 'error';
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
      // console.log('RES', result)
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
  return get(`${VIDEOS_ENDPOINT}`, { ...payload }).then(
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
        error: `video/getSearchVideo ~ ${error}`,
      },
      data: [],
    }
  })
}

export default {
  getHomePlaylist,
  getHomeVideo,
  getAllHistory,
  getSearchVideo
}
