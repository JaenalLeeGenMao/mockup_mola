import types from '../constants';

export default function moviestream(state = {}, action) {
  switch (action.type) {
  case types.GET_MOVIE_STREAM_LOADING:
    console.log('loading', action.payload)
    return { ...state, ...action.payload };
  case types.GET_MOVIE_STREAM_SUCCESS:
    console.log('sukses', action.payload)
    return { ...state, ...action.payload };
  case types.GET_MOVIE_STREAM_ERROR:
    console.log('error', action.payload)
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
}
