import { get } from 'axios'
import { HOME_PLAYLIST_ENDPOINT, HISTORY_ENDPOINT } from './endpoints'
import utils from './util'

const getHomePlaylist = (payload) => {
  return get(`${HOME_PLAYLIST_ENDPOINT}/mola-home`, { ...payload }).then(
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
  return get(`${HOME_PLAYLIST_ENDPOINT}/${id}`).then(
    (response) => {
      const result = utils.normalizeHomeVideo(response)
      return [...result[0]] || []
    }
  ).catch((error) => {
    return {
      meta: {
        status: 'error',
        text: `home/getHomeVideo ~ ${error}`,
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

export default {
  getHomePlaylist,
  getHomeVideo,
  getAllHistory,
}
