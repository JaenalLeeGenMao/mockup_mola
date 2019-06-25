import { post, patch, get } from 'axios'
import { AUTH_BASE_ENDPOINT } from './endpoints'
import config from '@source/config'

// const createNewUser = ({ email = '', password = '', csrf = '' }) => {
//   const body = { email, password }
//   return post(`${AUTH_BASE_ENDPOINT}/v1/signup`, body, {
//     headers: {
//       'x-csrf-token': csrf,
//     },
//   })
//     .then(response => {
//       return {
//         meta: {
//           status: 'success',
//         },
//         data: response.data,
//       }
//     })
//     .catch(error => {
//       return {
//         meta: {
//           status: 'error',
//           error,
//         },
//         data: {},
//       }
//     })
// }

// const verifyUserToken = ({ token = '', email = '', csrf = '' }) => {
//   const body = { token, email }
//   return post(`${AUTH_BASE_ENDPOINT}/v1/signup/otp/verify`, body, {
//     headers: {
//       'x-csrf-token': csrf,
//     },
//   })
//     .then(() => {
//       return {
//         meta: {
//           status: 'success',
//         },
//         data: {},
//       }
//     })
//     .catch(error => {
//       return {
//         meta: {
//           status: 'error',
//           error,
//         },
//         data: {},
//       }
//     })
// }

// const resendUserToken = ({ email = '', csrf = '' }) => {
//   const body = { email }
//   return post(`${AUTH_BASE_ENDPOINT}/v1/signup/otp/resend`, body, {
//     headers: {
//       'x-csrf-token': csrf,
//     },
//   })
//     .then(() => {
//       return {
//         meta: {
//           status: 'success',
//         },
//         data: {},
//       }
//     })
//     .catch(error => {
//       return {
//         meta: {
//           status: 'error',
//           error,
//         },
//         data: {},
//       }
//     })
// }

// const requestLogin = ({ email = '', password = '', csrf = '' }) => {
//   const body = { email, password }
//   return post(`${AUTH_BASE_ENDPOINT}/v1/login`, body, {
//     headers: {
//       'x-csrf-token': csrf,
//     },
//   })
//     .then(response => {
//       return {
//         meta: {
//           status: 'success',
//         },
//         data: response.data.data,
//       }
//     })
//     .catch(error => {
//       return {
//         meta: {
//           status: 'error',
//           error,
//         },
//         data: {},
//       }
//     })
// }

// const requestLogout = ({ uid = '', csrf = '' }) => {
//   const body = { uid }
//   return post(`${AUTH_BASE_ENDPOINT}/v1/logout`, body, {
//     headers: {
//       'x-csrf-token': csrf,
//     },
//   })
//     .then(response => {
//       return {
//         meta: {
//           status: 'success',
//         },
//         data: response,
//       }
//     })
//     .catch(error => {
//       return {
//         meta: {
//           status: 'error',
//           error,
//         },
//         data: {},
//       }
//     })
// }

// const emailForgotPassword = ({ email = '', csrf = '' }) => {
//   const body = { email }
//   return post(`${AUTH_BASE_ENDPOINT}/v1/password/forgot`, body, {
//     headers: {
//       'x-csrf-token': csrf,
//     },
//   })
//     .then(response => {
//       return {
//         meta: {
//           status: 'success',
//         },
//         data: response,
//       }
//     })
//     .catch(error => {
//       return {
//         meta: {
//           status: 'error',
//           error,
//         },
//         data: {},
//       }
//     })
// }

// const verifyPasswordToken = ({ email = '', token = '', csrf = '', password = '' }) => {
//   let body = {}
//   if (!password) {
//     body = { email, token }
//   } else {
//     body = { password }
//   }
//   return post(`${AUTH_BASE_ENDPOINT}/v1/password/token`, body, {
//     headers: {
//       'x-csrf-token': csrf,
//     },
//   })
//     .then(response => {
//       return {
//         meta: {
//           status: 'success',
//         },
//         data: response,
//       }
//     })
//     .catch(error => {
//       return {
//         meta: {
//           status: 'error',
//           error,
//         },
//         data: {},
//       }
//     })
// }

// const updateNewPassword = ({ password = '', csrf = '' }) => {
//   const body = { password }
//   return patch(`${AUTH_BASE_ENDPOINT}/v1/password`, body, {
//     headers: {
//       'x-csrf-token': csrf,
//     },
//   })
//     .then(response => {
//       return {
//         meta: {
//           status: 'success',
//         },
//         data: response,
//       }
//     })
//     .catch(error => {
//       return {
//         meta: {
//           status: 'error',
//           error,
//         },
//         data: {},
//       }
//     })
// }

// const fetchProfile = ({ csrf = '' }) => {
//   return get(`${AUTH_BASE_ENDPOINT}/v1/profile`, {
//     headers: {
//       'x-csrf-token': csrf,
//     },
//   })
//     .then(response => {
//       return {
//         meta: {
//           status: 'success',
//         },
//         data: response.data.data,
//       }
//     })
//     .catch(error => {
//       return {
//         meta: {
//           status: 'error',
//           error,
//         },
//         data: {},
//       }
//     })
// }

const updateProfile = ({ name = '', csrf = '', birthdate = '', gender = '', location = '', token = '', phone = '' }) => {
  const body = { name, birthdate, gender, location, token, phone }
  return patch(`${AUTH_BASE_ENDPOINT}/v1/profile`, body, {
    headers: {
      'x-csrf-token': csrf,
    },
  })
    .then(response => {
      return {
        meta: {
          status: 'success',
        },
        data: response,
      }
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error,
        },
        data: {},
      }
    })
}

// const { oauth: { appKey, appSecret }, endpoints: { domain } } = config

// const requestGuestToken = () => {
//   return get(`${AUTH_BASE_ENDPOINT}/v1/guest/token`, {
//     params: {
//       app_key: appKey,
//     },
//   })
//     .then(response => {
//       const { access_token, expires_in, token_type } = response.data.data
//       return {
//         meta: {
//           status: 'success',
//         },
//         data: {
//           token: access_token,
//           expire: expires_in,
//           type: token_type,
//         },
//       }
//     })
//     .catch(error => {
//       return {
//         meta: {
//           status: 'error',
//           error: error.response,
//         },
//         data: undefined,
//       }
//     })
// }

// const requestCode = () => {
//   const state = Math.random()
//     .toString()
//     .substr(2)
//   const json = {
//     app_key: appKey,
//     response_type: 'code',
//     redirect_uri: `${domain}/oauth/callback`,
//     scope: [
//       'https://internal.supersoccer.tv/users/users.profile.read',
//       'https://internal.supersoccer.tv/subscriptions/users.read' /* DARI CODINGAN LAMA */,
//       'https://internal.supersoccer.tv/subscriptions/users.read.global' /* DARI VINCENT */,
//       'https://api.supersoccer.tv/subscriptions/subscriptions.read' /* DARI VINCENT */,
//       'https://api.supersoccer.tv/videos/videos.read' /* DARI CODINGAN LAMA */,
//       'paymentmethods:read.internal',
//     ].join(' '),
//     state,
//   }
//   return get(`${AUTH_BASE_ENDPOINT}/oauth2/v1/authorize`, {
//     params: json,
//   })
//     .then(response => {
//       console.log(response)
//       return response.data
//     })
//     .catch(error => {
//       return null
//     })
// }

import { getApi } from '@supersoccer/gandalf'
const Auth = getApi('auth/handler')

export default {
  createNewUser: Auth.createNewUser,
  verifyUserToken: Auth.verifyUserToken,
  resendUserToken: Auth.resendUserToken,
  requestLogin: Auth.requestLogin,
  requestLogout: Auth.requestLogout,
  emailForgotPassword: Auth.emailForgotPassword,
  verifyPasswordToken: Auth.verifyPasswordToken /* Verify password upon create new account */,
  verifyPassword: Auth.verifyPassword /* Verify password after login */,
  updateNewPassword: Auth.updateNewPassword,
  fetchProfile: Auth.fetchProfile,
  updateProfile,
  // updateProfile: Auth.updateProfile,
  // requestGuestToken,
  // requestCode,
}
