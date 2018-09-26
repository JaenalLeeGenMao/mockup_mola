import types from '../constants';
import { put } from '../lib/request';

export const updateSetting = params => {
  return (dispatch, getState) => {
    const { token } = getState().user
    dispatch(request())
    dispatch(success(params))
  }

  function request () {
    return { type: types.UPDATE_SETTING_REQUEST }
  }
  function success (payload) {
    return { type: types.UPDATE_SETTING_SUCCESS, payload: payload }
  }
  function failure (error) {
    return { type: types.UPDATE_SETTING_FAILURE }
  }
}

export const updateProfile = params => {
  return (dispatch, getState) => {
    const { token } = getState().user
    dispatch(request())
    dispatch(success(params))
    // put('/update-profile', token, payload)
    //   .then(payload => {
    //     success(payload)
    //   })
    //   .catch(err => {
    //     failure(err)
    //   })
  }


  function request () {
    return { type: types.UPDATE_PROFILE_REQUEST }
  }
  function success (payload) {
    return { type: types.UPDATE_PROFILE_SUCCESS, payload: payload }
  }
  function failure (error) {
    return { type: types.UPDATE_PROFILE_FAILURE }
  }
}

export function setUserVariable({ name, value }) {
  return {
    type: types.SET_USER_VARIABLE,
    payload: {
      name,
      value,
    },
  };
}