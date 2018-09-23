import types from '../constants';

const initialState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  token: '',
  refreshToken: '',
  expire: '',
  type: ''
}

export default function runtime(state = initialState, action) {
  switch (action.type) {
  case types.SET_USER_VARIABLE:
    return {
      ...initialState,
      ...state,
      [action.payload.name]: action.payload.value,
    };
  default:
    return { ...initialState, ...state };
  }
}
