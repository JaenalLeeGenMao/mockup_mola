/* eslint-disable import/prefer-default-export */
import Mola from '@api/mola'
import types from '../constants'

// import { getAction } from '../../../gandalf';
// const { home: { getHomePlaylist } } = getAction();

// export default {
//   getHomePlaylist
// };

const getHomePlaylist = () => dispatch => {
  dispatch({
    type: types.GET_HOME_PLAYLIST_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: '',
      },
      data: [],
    },
  })
  return Mola.getHomePlaylist().then(result => {
    // console.log('get home playlist ', result)
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_HOME_PLAYLIST_ERROR,
        payload: result,
      })
    } else {
      dispatch({
        type: types.GET_HOME_PLAYLIST_SUCCESS,
        payload: result,
      })
    }
  })
}

const getHomeVideo = playlist => dispatch => {
  // console.log('get home video 1', playlist)
  return Mola.getHomeVideo({ id: playlist.id }).then(result => {
    console.log('result video 2', result)
    result = {
      meta: {
        status: result.meta.status,
        id: playlist.id,
        sortOrder: playlist.sortOrder,
      },
      // data: [playlist].concat(result.data)
      data: result.data,
    }
    // console.log('get home video 3', result)
    dispatch({
      type: types.GET_HOME_VIDEO,
      payload: result,
    })
  })
}

const updateActivePlaylist = id => (dispatch, getState) => {
  const store = getState(),
    { home: { playlists: { meta, data: playlistsData } } } = store,
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
  getHomePlaylist,
  getHomeVideo,
  updateActivePlaylist,
}
