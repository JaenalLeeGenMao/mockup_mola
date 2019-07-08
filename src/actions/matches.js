/* eslint-disable import/prefer-default-export */
import Mola from '@api/mola'
import types from '../constants'

const getAllMatches = (id) => dispatch => {
  dispatch({
    type: types.GET_MATCHES_PLAYLIST_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: '',
      },
      data: [],
    },
  })
  return Mola.getMatchesList(id).then(async result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_MATCHES_PLAYLIST_ERROR,
        payload: result,
      })
    } else {
      let allMatchDetailId = []
      result.data.map(matchDetail => {
        allMatchDetailId.push(matchDetail.id)
      })
      let matchDetailList = []
      matchDetailList = await Mola.getMatchDetail(allMatchDetailId)

      if (matchDetailList.meta.status === 'success') {
        dispatch({
          type: types.GET_MATCHES_PLAYLIST_SUCCESS,
          payload: matchDetailList,
        })
      } else {
        dispatch({
          type: types.GET_MATCHES_PLAYLIST_ERROR,
          payload: matchDetailList,
        })
      }
    }
  })
}
export default {
  getAllMatches,
}
