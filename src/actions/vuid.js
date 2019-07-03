// import Mola from '@api/mola'
import types from '../constants'
import DRMConfig from '@source/lib/DRMConfig'

import axios from 'axios'
import axiosRetry from 'axios-retry'
import { ADD_DEVICE_ENDPOINT } from '@api/mola/endpoints'

const handlerGetVUID = ({ deviceId, r }) => {
  let urlParam = `deviceId=${deviceId}`

  if (r === 1) {
    urlParam = 'r=1'
  }

  return axios
    .get(`${ADD_DEVICE_ENDPOINT}?${urlParam}&test=1`, {
      timeout: 15000,
    })
    .then(response => {
      const vuid = response.data.data.attributes.vuid
      return {
        meta: {
          status: vuid ? 'success' : 'no_vuid',
          error: '',
        },
        data: vuid || null,
      }
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error: `vuid/getVUID - ${error}`,
        },
        data: null,
      }
    })
}

axiosRetry(axios, {
  retries: 3,
  retryDelay: retryCount => {
    return retryCount * 2000
  },
  retryCondition: () => true,
})

export const getVUID = deviceId => dispatch => {
  const vuid = DRMConfig.getVUID()
  if (vuid) {
    return dispatch({
      type: types.GET_VUID_SUCCESS,
      payload: {
        meta: {
          status: 'success',
          error: '',
        },
        data: vuid || null,
      },
    })
  }
  dispatch({
    type: types.GET_VUID_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: '',
      },
      data: [],
    },
  })
  return handlerGetVUID({ deviceId: deviceId }).then(result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_VUID_ERROR,
        payload: result,
      })
    } else {
      if (result.data) {
        DRMConfig.setVUID(result.data)
      }
      return dispatch({
        type: types.GET_VUID_SUCCESS,
        payload: result,
      })
    }
  })
}

export const getVUID_retry = () => dispatch => {
  dispatch({
    type: types.GET_VUID_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: '',
      },
      data: [],
    },
  })
  return handlerGetVUID({ r: 1 }).then(result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_VUID_ERROR,
        payload: result,
      })
    } else {
      if (result.data) {
        DRMConfig.setVUID(result.data)
      }
      return dispatch({
        type: types.GET_VUID_SUCCESS,
        payload: result,
      })
    }
  })
}
