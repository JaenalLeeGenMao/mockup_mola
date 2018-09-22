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
      ...initialState,
      ...state,
      meta: {
        ...initialState.meta,
        ...state.meta,
        ...meta
      },
      data: {
        ...initialState.data,
        ...state.data,
        ...data
      }
    };
  case types.UPDATE_USER_AUTH_SUCCESS:
    return {
      ...initialState,
      ...state,
      meta: {
        ...initialState.meta,
        ...state.meta,
        ...meta
      },
      data: {
        ...initialState.data,
        ...state.data,
        ...data
      }
    };
  case types.UPDATE_USER_AUTH_ERROR:
    return {
      ...initialState,
      ...state,
      meta: {
        ...initialState.meta,
        ...state.meta,
        ...meta
      },
      data: {
        ...initialState.data,
        ...state.data,
        ...data
      }
    };
  case types.GET_USER_INFO_LOADING:
    return {
      ...initialState,
      ...state,
      meta: {
        ...initialState.meta,
        ...state.meta,
        ...meta
      },
      data: {
        ...initialState.data,
        ...state.data,
        ...data
      }
    };
  case types.GET_USER_INFO_SUCCESS:
    return {
      ...initialState,
      ...state,
      meta: {
        ...initialState.meta,
        ...state.meta,
        ...meta
      },
      data: {
        ...initialState.data,
        ...state.data,
        ...data
      }
    };
  case types.GET_USER_INFO_ERROR:
    return {
      ...initialState,
      ...state,
      meta: {
        ...initialState.meta,
        ...state.meta,
        ...meta
      },
      data: {
        ...initialState.data,
        ...state.data,
        ...data
      }
    };
  default:
    return { ...initialState, ...state };
  }
}
