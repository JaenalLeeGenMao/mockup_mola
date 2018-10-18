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
  return async (dispatch, getState, { history }) => {
    const { token } = getState().user;
    const { csrf } = getState().runtime;

    dispatch(request());
    const update = await Auth.updateProfile({
      csrf: csrf,
      name: '',
      csrf: '',
      birthdate: '',
      gender: '',
      location: '',
      token: token,
      csrf: csrf
    });

    if (update.meta.status !== 'success') {
      const msg = 'Update profile is failed';
      toastr.warning('Notification', msg);

      dispatch(failure(msg));
      return null;
    }

    dispatch(success(update.meta.data));
  };

  function request() {
    return { type: types.UPDATE_PROFILE_REQUEST };
  }
  function success(payload) {
    toastr.success('Notification', 'Profile success to updated');
    return { type: types.UPDATE_PROFILE_SUCCESS, payload: payload };
  }
  function failure(error) {
    return { type: types.UPDATE_PROFILE_FAILURE };
  }
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
