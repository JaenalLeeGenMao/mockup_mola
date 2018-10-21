import types from '../constants';
import { toastr } from 'react-redux-toastr';

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

    const update = await Auth.updateProfile({
      name: params.username,
      csrf: csrf,
      birthdate: params.birthdate,
      gender: params.gender,
      location: params.location,
      token: token
    });

    if (update.meta.status !== 'success') {
      toastr.warning('Notification', 'Update profile is failed');
      return null;
    }

    toastr.success('Notification', 'Update profile is success');
    return null;
  };
};

export function setUserVariable({ name, value }) {
  return {
    type: types.SET_USER_VARIABLE,
    payload: {
      name,
      value
    }
  };
}
