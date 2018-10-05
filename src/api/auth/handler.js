import { get, post } from 'axios';
import { AUTH_BASE_ENDPOINT } from './endpoints';
import utils from './util';

import { api } from '@source/config';
const { config } = api;

const getAuth = ({ code, redirect_uri }) => {
  const {
    endpoints: { auth: authURL },
    tokenAuth: authConfig
  } = config;
  return post(`${authURL}/_/oauth2/v1/token`, {
    ...authConfig,
    redirect_uri,
    code
  })
    .then(response => {
      if (response.status === 200) {
        const result = utils.normalizeAuth(response);
        return {
          meta: {
            status: 'success',
            error: ''
          },
          data: result
        };
      }
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

const getUserInfo = token => {
  const {
    endpoints: { auth: authURL }
  } = config;
  return get(`${authURL}/_/v1/userinfo`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      const result = utils.normalizeUserInfo(response);
      return {
        meta: {
          status: 'success',
          error: ''
        },
        data: result
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

const revokeAuth = token => {
  const {
    endpoints: { auth: authURL },
    tokenAuth: authConfig
  } = config;
  return post(`${authURL}/_/oauth2/v1/revoke`, {
    app_key: authConfig.app_key,
    app_secret: authConfig.app_secret,
    token
  })
    .then(response => {
      if (response.data.status === 'success') {
        return {
          meta: {
            status: 'success',
            error: ''
          },
          data: {}
        };
      }
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

const updateAuth = token => {
  const {
    endpoints: { auth: authURL },
    tokenAuth: authConfig
  } = config;
  return get(`${authURL}/_/v1/access_token`, {
    params: {
      app_key: authConfig.app_key,
      app_secret: authConfig.app_secret,
      access_token: token,
      expires_in: 3600
    }
  })
    .then(response => {
      if (response.status === 200) {
        const result = utils.normalizeAuth(response.data);
        return {
          meta: {
            status: 'success',
            error: ''
          },
          data: result
        };
      }
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

const createNewUser = ({ email = '', password = '', csrf = '' }) => {
  console.log(`${AUTH_BASE_ENDPOINT}/v1/signup`);
  console.log(email, password);
  const body = { email, password };
  return post(`${AUTH_BASE_ENDPOINT}/v1/signup`, body, {
    headers: {
      'x-csrf-token': csrf
    }
  })
    .then(response => {
      console.log('RESPONSE:\n', response);
    })
    .catch((error, ...props) => {
      console.log('ERROR:\n', error);
      console.log(props);
      return {
        meta: {
          status: 'error',
          error
        },
        data: {}
      };
    });
};

const verifyUserOTP = ({ token = '', email = '', csrf = '' }) => {
  console.log(token);
  const body = { token, email };
  return post(`${AUTH_BASE_ENDPOINT}/v1/signup/otp/verify`, body, {
    headers: {
      'x-csrf-token': csrf
    }
  })
    .then(response => {
      console.log('RESPONSE:\n', response);
    })
    .catch(error => {
      console.log('ERROR:\n', error);
      return {
        meta: {
          status: 'error',
          error
        },
        data: {}
      };
    });
};

const resendUserOTP = ({ email = '', csrf = '' }) => {
  console.log(email);
  const body = { email };
  return post(`${AUTH_BASE_ENDPOINT}/v1/signup/otp/resend`, body, {
    headers: {
      'x-csrf-token': csrf
    }
  })
    .then(response => {
      console.log('RESPONSE:\n', response);
    })
    .catch(error => {
      console.log('ERROR:\n', error);
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
  getUserInfo,
  getAuth,
  updateAuth,
  revokeAuth,
  createNewUser,
  verifyUserOTP,
  resendUserOTP
};
