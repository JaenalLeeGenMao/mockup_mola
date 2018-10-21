import { toastr } from 'react-redux-toastr';

import Auth from '@api/auth';

export const updatePassword = ({ currentPassword, newPassword, confirmNewPassword }) => {
  return async (dispatch, getState) => {
    const { csrf } = getState().runtime;

    if (newPassword !== confirmNewPassword) {
      toastr.warning('Notification', "Confirmation password doesn't match your new password.");
      return false;
    }

    const checkCurrentPassword = await Auth.verifyPassword({
      password: currentPassword,
      csrf: csrf
    });

    if (checkCurrentPassword.meta.status !== 'success') {
      toastr.warning('Notification', 'Current Password is invalid');
      return false;
    }

    const updateNewPassword = await Auth.updateNewPassword({
      password: newPassword,
      csrf: csrf
    });

    if (updateNewPassword.meta.status !== 'success') {
      toastr.warning('Notification', 'Update password is failed');
      return false;
    }

    toastr.success('Notification', 'Update password is success');
    return true;
  };
};
