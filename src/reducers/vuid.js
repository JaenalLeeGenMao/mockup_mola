import types from '../constants';

const initialState = {
  meta: {
    status: 'loading'
  },
  data: []
};

export default function seriesDetail(state = initialState, action) {
  switch (action.type) {
  case types.GET_VUID_LOADING:
    return { ...state, ...action.payload };
  case types.GET_VUID_SUCCESS:
    return { ...state, ...action.payload };
  case types.GET_VUID_ERROR:
    return { ...state, ...action.payload };
  default:
    return {
      ...state
    };
  }
}
