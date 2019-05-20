/* eslint-disable import/prefer-default-export */
import Mola from '@api/mola'
import types from '../constants'

const getGetMatchesList = () => dispatch => {
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
  return Mola.getMatchesList().then(result => {
    // console.log('Checking data action matches', result)
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_MATCHES_PLAYLIST_ERROR,
        payload: result,
      })
    } else {
      return dispatch({
        type: types.GET_MATCHES_PLAYLIST_SUCCESS,
        payload: result,
      })
    }
  })
}
export default {
  getGetMatchesList,
}
