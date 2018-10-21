import types from '../constants';
import { toastr } from 'react-redux-toastr';
import dateFormat from 'dateformat';

import Auth from '@api/auth';

export const updateSetting = params => {
  return (dispatch, getState) => {
    const { token } = getState().user;
    dispatch(request());
    dispatch(success(params));
  };

  function request() {
    return { type: types.UPDATE_SETTING_REQUEST };
  }
  function success(payload) {
    toastr.success('Notification', 'Config success to updated');
    return { type: types.UPDATE_SETTING_SUCCESS, payload: payload };
  }
  function failure(error) {
    return { type: types.UPDATE_SETTING_FAILURE };
  }
};

export const updateProfile = params => {
  return async (dispatch, getState) => {
    const { token } = getState().user;
    const { csrf } = getState().runtime;
    const splitDate = params.birthdate.split('/');
    let date = params.birthdate;

    if (splitDate.length > 2) {
      date = new Date(splitDate[2], splitDate[1] - 1, splitDate[0]);
    }

    const update = await Auth.updateProfile({
      name: params.username,
      csrf: csrf,
      birthdate: dateFormat(date, 'yyyy-mm-dd hh:MM:ss'),
      gender: params.gender,
      location: params.location,
      token: token,
      phone: params.phoneNumber
    });

    if (update.meta.status !== 'success') {
      toastr.warning('Notification', 'Update profile is failed');
      return null;
    }

    toastr.success('Notification', 'Update profile is success');
    return null;
  };
};

export function fetchProfile() {
  return async (dispatch, getState) => {
    const { csrf } = getState().runtime;

    const profile = await Auth.fetchProfile({ csrf: csrf });
    if (profile.meta.status === 'success') {
      let data = profile.data;
      data.username = `${data.first_name || ''} ${data.last_name || ''}`.trim();
      data.phoneNumber = data.phone;

      dispatch({ type: types.FETCH_PROFILE_USER, payload: data });
    }
  };
}

export function setUserVariable({ name, value }) {
  return {
    type: types.SET_USER_VARIABLE,
    payload: {
      name,
      value
    }
  };
}
