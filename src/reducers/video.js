import types from '../constants';

export default function video(state = {}, action) {
  switch (action.type) {
  case types.GET_VIDEOS_LOADING:
    return { ...state, ...action.payload };
  case types.GET_VIDEOS_SUCCESS:
    return { ...state, ...action.payload };
  case types.GET_VIDEOS_ERROR:
    return { ...state, ...action.payload };
  default:
    return {
      ...state,
      meta: {
        status: "loading"
      },
      data: []
    };
  }
};
