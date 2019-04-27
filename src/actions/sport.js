/* eslint-disable import/prefer-default-export */
import Mola from '@api/mola'
import types from '../constants'

const getSportCategoryList = () => dispatch => {
  dispatch({
    type: types.GET_SPORT_PLAYLIST_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: '',
      },
      data: [],
    },
  })
  return Mola.getSportCategoryList().then(result => {
    // console.log('checking get sport cate', result)
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_SPORT_PLAYLIST_ERROR,
        payload: result,
      })
    } else {
      dispatch({
        type: types.GET_SPORT_PLAYLIST_SUCCESS,
        payload: result,
      })
    }
  })
}
const getSportVideo = playlist => dispatch => {
  // console.log('checking get sport video zzzzz', playlist)
  return Mola.getSportVideo({ id: playlist.id }).then(result => {
    // console.log('checking get sport video oooo', result)
    result = {
      meta: {
        status: result.meta.status,
        id: playlist.id,
        sortOrder: playlist.sortOrder,
      },
      data: result.data,
      background: {
        landscape: playlist.background.landscape,
      },
    }
    // console.log('get sport video 3', result)
    dispatch({
      type: types.GET_SPORT_VIDEO,
      payload: result,
    })
  })
}

const updateActivePlaylist = id => (dispatch, getState) => {
  const store = getState(),
    { sport: { playlists: { meta, data: playlistsData } } } = store,
    data = playlistsData.map(playlist => {
      if (playlist.id === id) {
        return { ...playlist, isActive: true }
      }
      return { ...playlist, isActive: false }
    })
  return dispatch({
    type: types.UPDATE_ACTIVE_PLAYLIST,
    payload: {
      meta: { ...meta },
      data: [...data],
    },
  })
}

export default {
  getSportCategoryList,
  getSportVideo,
  updateActivePlaylist,
}
