/* eslint-disable import/prefer-default-export */
import Mola from '@api/mola'
import types from '../constants'

const getRecommendation = (id = 'cSz5OZmGKS') => dispatch => {
  dispatch({
    type: types.GET_RECOMMENDATION_PLAYLIST_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: '',
      },
      data: [],
    },
  })
  return Mola.getRecommendation(id).then(result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_RECOMMENDATION_PLAYLIST_ERROR,
        payload: result,
      })
    } else {
      dispatch({
        type: types.GET_RECOMMENDATION_PLAYLIST_SUCCESS,
        payload: result,
      })
    }
  })
}

export default {
  getRecommendation,
}
