import Mola from '@api/mola'
import types from '../constants'
import DRMConfig from '@source/lib/DRMConfig';
export const getVUID = deviceId => dispatch => {
  const vuid = DRMConfig.getVUID();
  if (vuid) {
    return dispatch({
      type: types.GET_VUID_SUCCESS,
      payload: {
        meta: {
          status: 'success',
          error: ''
        },
        data: vuid || null
      }
    });
  }
  dispatch({
    type: types.GET_VUID_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: ''
      },
      data: []
    }
  });
  return Mola.getVUID({ deviceId: deviceId }).then(result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_VUID_ERROR,
        payload: result
      });
    } else {
      if (result.data) {
        DRMConfig.setVUID(result.data);
      }
      return dispatch({
        type: types.GET_VUID_SUCCESS,
        payload: result
      });
    }
  });
};

export const getVUID_retry = () => dispatch => {
  dispatch({
    type: types.GET_VUID_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: ''
      },
      data: []
    }
  });
  return Mola.getVUID({ r: 1 }).then(result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_VUID_ERROR,
        payload: result
      });
    } else {
      if (result.data) {
        DRMConfig.setVUID(result.data);
      }
      return dispatch({
        type: types.GET_VUID_SUCCESS,
        payload: result
      });
    }
  });
};
