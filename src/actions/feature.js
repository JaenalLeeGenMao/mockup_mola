/* eslint-disable import/prefer-default-export */
import Mola from '@api/mola'
import types from '../constants'
import { viewAllMovieBg, viewAllMovieBgWebp, viewAllMovieMobileBg, viewAllMovieMobileBgWebp } from '@global/imageUrl'

const getFeaturePlaylist = id => dispatch => {
  dispatch({
    type: types.GET_FEATURE_PLAYLIST_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: '',
      },
      data: [],
    },
  })
  return Mola.getFeaturePlaylist(id).then(result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_FEATURE_PLAYLIST_ERROR,
        payload: {
          meta: {
            status: 'error',
            error: 'Error: feature playlist failed',
          },
          data: [],
        },
      })
    } else {
      dispatch({
        type: types.GET_FEATURE_PLAYLIST_SUCCESS,
        payload: result,
      })
    }
  })
}

const getFeatureVideo = playlist => dispatch => {
  return Mola.getHomeVideo({ id: playlist.id }).then(result => {
    const filterVisibility = result.data.filter(dt => {
      return dt.visibility === 1
    })

    result = {
      meta: {
        status: result.meta.status,
        id: playlist.id,
        contentType: playlist.contentType || playlist.attributes.contentType,
        sortOrder: playlist.sortOrder,
      },
      data: filterVisibility,
    }
    dispatch({
      type: types.GET_FEATURE_VIDEO,
      payload: result,
    })
  })
}

export default {
  getFeaturePlaylist,
  getFeatureVideo,
}
