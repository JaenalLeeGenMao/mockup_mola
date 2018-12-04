/* eslint-disable import/prefer-default-export */
import Mola from '@api/mola'
import types from '../constants'

const getHotPlaylist = () => dispatch => {
  dispatch({
    type: types.GET_HOT_PLAYLIST_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: '',
      },
      data: [],
    },
  })
  return Mola.getHotPlaylist().then(result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_HOT_PLAYLIST_ERROR,
        payload: result,
      })
    } else {
      dispatch({
        type: types.GET_HOT_PLAYLIST_SUCCESS,
        payload: result,
      })
    }
  })
}

export default {
  getHotPlaylist,
}
