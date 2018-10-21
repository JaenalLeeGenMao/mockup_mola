import { post, patch, get } from 'axios';
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
          status: 'success'
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

const emailForgotPassword = ({ email = '', csrf = '' }) => {
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

const verifyPasswordToken = ({ email = '', token = '', csrf = '', password = '' }) => {
  const body = { email, token, password };
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

const verifyPassword = ({ csrf = '', password = '' }) => {
  const body = { password };
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

const fetchProfile = ({ csrf = '' }) => {
  return get(`${AUTH_BASE_ENDPOINT}/v1/profile`, {
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

const updateProfile = ({
  name = '',
  csrf = '',
  birthdate = '',
  gender = '',
  location = '',
  token = ''
}) => {
  const body = { name, birthdate, gender, location, token };
  return patch(`${AUTH_BASE_ENDPOINT}/v1/profile`, body, {
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
  requestLogout,
  emailForgotPassword,
  verifyPasswordToken,
  updateNewPassword,
  verifyPassword,
  fetchProfile,
  updateProfile
};
