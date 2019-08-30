import Mola from '@api/mola'
import types from '../constants'

export const getPartners = () => dispatch => {
  dispatch({
    type: types.GET_PARTNERS_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: '',
      },
      data: [],
    },
  })
  return Mola.getPartners().then(result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_PARTNERS_ERROR,
        payload: {
          meta: {
            status: 'error',
            error: result.meta.error || 'Error: get partners failed',
          },
          data: [],
        },
      })
    } else {
      dispatch({
        type: types.GET_PARTNERS_SUCCESS,
        payload: result,
      })
    }
  })
}
