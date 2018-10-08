import { post, patch } from 'axios';
import { AUTH_BASE_ENDPOINT } from './endpoints';

const createNewUser = ({ email = '', password = '', csrf = '' }) => {
  const body = { email, password };
  return post(`${AUTH_BASE_ENDPOINT}/v1/signup`, body, {
    headers: {
      'x-csrf-token': csrf
    }
  })
    .then(response => {
      return {
        meta: {
          status: 'error',
          error
        },
        data: response.data
      };
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error
        },
        data: {}
      };
    });
};

const verifyUserToken = ({ token = '', email = '', csrf = '' }) => {
  const body = { token, email };
  return post(`${AUTH_BASE_ENDPOINT}/v1/signup/otp/verify`, body, {
    headers: {
      'x-csrf-token': csrf
    }
  })
    .then(() => {
      return {
        meta: {
          status: 'success'
        },
        data: {}
      };
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error
        },
        data: {}
      };
    });
};

const resendUserToken = ({ email = '', csrf = '' }) => {
  const body = { email };
  return post(`${AUTH_BASE_ENDPOINT}/v1/signup/otp/resend`, body, {
    headers: {
      'x-csrf-token': csrf
    }
  })
    .then(() => {
      return {
        meta: {
          status: 'success'
        },
        data: {}
      };
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error
        },
        data: {}
      };
    });
};

const requestLogin = ({ email = '', password = '', csrf = '' }) => {
  const body = { email, password };
  return post(`${AUTH_BASE_ENDPOINT}/v1/login`, body, {
    headers: {
      'x-csrf-token': csrf
    }
  })
    .then(response => {
      return {
        meta: {
          status: 'success'
        },
        data: response.data.data
      };
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error
        },
        data: {}
      };
    });
};

const requestLogout = ({ uid = '', csrf = '' }) => {
  const body = { uid };
  return post(`${AUTH_BASE_ENDPOINT}/v1/logout`, body, {
    headers: {
      'x-csrf-token': csrf
    }
  })
    .then(response => {
      return {
        meta: {
          status: 'success'
        },
        data: response
      };
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error
        },
        data: {}
      };
    });
};

const resetPassword = ({ email = '', csrf = '' }) => {
  const body = { email };
  return post(`${AUTH_BASE_ENDPOINT}/v1/password/forgot`, body, {
    headers: {
      'x-csrf-token': csrf
    }
  })
    .then(response => {
      return {
        meta: {
          status: 'success'
        },
        data: response
      };
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error
        },
        data: {}
      };
    });
};

const verifyPasswordToken = ({ email = '', token = '', csrf = '' }) => {
  const body = { email, token };
  return post(`${AUTH_BASE_ENDPOINT}/v1/password/token`, body, {
    headers: {
      'x-csrf-token': csrf
    }
  })
    .then(response => {
      return {
        meta: {
          status: 'success'
        },
        data: response
      };
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error
        },
        data: {}
      };
    });
};

const updateNewPassword = ({ password = '', csrf = '' }) => {
  const body = { password };
  return patch(`${AUTH_BASE_ENDPOINT}/v1/password`, body, {
    headers: {
      'x-csrf-token': csrf
    }
  })
    .then(response => {
      return {
        meta: {
          status: 'success'
        },
        data: response
      };
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error
        },
        data: {}
      };
    });
};

export default {
  createNewUser,
  verifyUserToken,
  resendUserToken,
  requestLogin,
  requestLogout
};
