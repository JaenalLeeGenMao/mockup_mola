/* eslint-disable import/prefer-default-export */
import Mola from '@api/mola'
import types from '../constants'

const getSportList = () => dispatch => {
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
  return Mola.getMatchesList().then(async result => {
    // console.log('action matches', result)
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
      // console.log('see result', allMatchDetailId)
      let matchDetailList = []
      matchDetailList = await Mola.getMatchDetail(allMatchDetailId)
      // console.log('see result 2', matchDetailList)

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
  getSportList,
}
