import types from '../constants';

const initialState = {
  meta: { status: 'loading', error: `` },
  data: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    token: '',
    refreshToken: '',
    lang: 'en'
  }
};

export default function user(state = initialState, action) {
  let meta, data;
  if (action.payload) {
    const { meta: payloadMeta, data: payloadData } = action.payload;
    meta = payloadMeta;
    data = payloadData;
  }

  switch (action.type) {
  case types.UPDATE_USER_AUTH_LOADING:
    return {
      ...state,
      meta: {
        ...initialState.meta,
        ...meta
      },
      data: {
        ...initialState.data,
        ...data
      }
    };
  case types.UPDATE_USER_AUTH_SUCCESS:
    return {
      ...state,
      meta: {
        ...initialState.meta,
        ...meta
      },
      data: {
        ...initialState.data,
        ...data
      }
    };
  case types.UPDATE_USER_AUTH_ERROR:
    return {
      ...state,
      meta: {
        ...initialState.meta,
        ...meta
      },
      data: {
        ...initialState.data,
        ...data
      }
    };
  case types.GET_USER_INFO_LOADING:
    return {
      ...state,
      meta: {
        ...initialState.meta,
        ...meta
      },
      data: {
        ...initialState.data,
        ...data
      }
    };
  case types.GET_USER_INFO_SUCCESS:
    return {
      ...state,
      meta: {
        ...initialState.meta,
        ...meta
      },
      data: {
        ...initialState.data,
        ...data
      }
    };
  case types.GET_USER_INFO_ERROR:
    return {
      ...state,
      meta: {
        ...initialState.meta,
        ...meta
      },
      data: {
        ...initialState.data,
        ...data
      }
    };
  default:
    return { ...state };
  }
}
