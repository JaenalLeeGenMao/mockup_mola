import { toastr } from 'react-redux-toastr';

import Auth from '@api/auth';

export const updatePassword = ({ currentPassword, newPassword, confirmNewPassword }) => {
  return async (dispatch, getState) => {
    const { token } = getState().user;
    const { csrf } = getState().runtime;

    if (newPassword !== confirmNewPassword) {
      toastr.warning('Notification', "Confirmation password doesn't match your new password.");
      return null;
    }

    const checkCurrentPassword = await Auth.verifyUserToken({
      password: currentPassword,
      csrf: csrf,
      token: token
    });

    if (checkCurrentPassword.meta.status !== 'success') {
      toastr.warning('Notification', 'Current Password is invalid');
      return null;
    }

    const updateNewPassword = await Auth.updateNewPassword({
      password: currentPassword,
      csrf: csrf
    });

    if (updateNewPassword.meta.status !== 'success') {
      toastr.warning('Notification', 'Update password is failed');
      return null;
    }

    toastr.success('Notification', 'Update password is success');
    return null;
  };
};