import types from '../constants';

export default function searchVideo(state = {}, action) {
  switch (action.type) {
  case types.GET_VIDEOS_LOADING:
    return { ...state, videos: { ...action.payload } };
  case types.GET_VIDEOS_SUCCESS:
    return { ...state, videos: { ...action.payload } };
  case types.GET_VIDEOS_ERROR:
    return { ...state, videos: { ...action.payload } };
  default:
    return {
      ...state,
      videos: {
        meta: {
          status: "loading"
        },
        data: []
      }
    };
  }
};
