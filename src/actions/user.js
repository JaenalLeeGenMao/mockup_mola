import types from '../constants'
import { toastr } from 'react-redux-toastr'
import dateFormat from 'dateformat'

import Auth from '@api/auth'

export const updateSetting = params => {
  return (dispatch, getState) => {
    const { token } = getState().user
    dispatch(request())
    dispatch(success(params))
  }

  function request() {
    return { type: types.UPDATE_SETTING_REQUEST }
  }
  function success(payload) {
    toastr.success('Notification', 'Config success to updated')
    return { type: types.UPDATE_SETTING_SUCCESS, payload: payload }
  }
  function failure(error) {
    return { type: types.UPDATE_SETTING_FAILURE }
  }
}

export const updateProfile = params => {
  return async (dispatch, getState) => {
    const { token } = getState().user
    const { csrf } = getState().runtime
    const splitDate = params.birthdate.split('/')
    let date = params.birthdate

    if (splitDate.length > 2) {
      date = new Date(splitDate[2], splitDate[1] - 1, splitDate[0])
    }

    const update = await Auth.updateProfile({
      // name: params.firstName + ' ' + params.lastName,
      firstName: params.firstName,
      lastName: params.lastName,
      csrf: csrf,
      birthdate: dateFormat(date, 'yyyy-mm-dd hh:MM:ss'),
      gender: params.gender,
      location: params.location,
      token: token,
      phone: params.phoneNumber,
    })

    if (update.meta.status !== 'success') {
      toastr.warning('Notification', 'Update profile is failed')
      return null
    }

    toastr.success('Notification', 'Update profile is success')
    // dispatch({ type: types.UPDATE_PROFILE_SUCCESS, payload: params })
    return null
  }
}

export function fetchProfile() {
  return async (dispatch, getState) => {
    const { csrf } = getState().runtime

    const profile = await Auth.fetchProfile({ csrf: csrf })
    if (profile.meta.status === 'success') {
      let data = profile.data
      // data.username = `${data.firstName || ''} ${data.lastName || ''}`.trim()
      data.firstName = data.firstName.trim()
      data.lastName = data.lastName.trim()
      data.phoneNumber = data.phone

      if (data.birthdate == null) {
        data.birthdate = dateFormat(new Date(), 'yyyy-mm-dd')
      }

      if (data.gender == null) {
        data.gender = 'lain'
      }
      dispatch({ type: types.FETCH_PROFILE_USER, payload: data })
      return data
    }
    // let data = {
    //   birthdate: '2019-06-05',
    //   firstName: 'dsadsad',
    //   email: 'ganteng@gmail.com',
    //   lastName: 'cek',
    //   gender: 'f',
    //   id: 'Fbulm80CnjrOpMcwjyaRjcenIJCOcC',
    //   last_name: '',
    //   location: 'Andorra',
    //   phone: null,
    // }
    // dispatch({ type: types.FETCH_PROFILE_USER, payload: data })
    // return data
    return false
  }
}

export function setUserVariable({ name, value }) {
  return {
    type: types.SET_USER_VARIABLE,
    payload: {
      name,
      value,
    },
  }
}
