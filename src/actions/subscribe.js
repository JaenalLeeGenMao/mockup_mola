/* eslint-disable import/prefer-default-export */
import Mola from '@api/mola'
import types from '../constants'

const getAllSubscriptions = token => dispatch => {
  dispatch({
    type: types.GET_ALL_SUBSCRIPTION_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: '',
      },
      data: [],
    },
  })
  return Mola.getAllSubscriptions(token).then(result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_ALL_SUBSCRIPTION_ERROR,
        payload: result,
      })
    } else {
      dispatch({
        type: types.GET_ALL_SUBSCRIPTION_SUCCESS,
        payload: result,
      })
    }
  })
}

export default {
  getAllSubscriptions,
}
