import types from '../constants';

export default function movieDetail(state = {}, action) {
  switch (action.type) {
  case types.GET_MOVIE_DETAIL_LOADING:
    return { ...state, ...action.payload };
  case types.GET_MOVIE_DETAIL_SUCCESS:
    return { ...state, ...action.payload };
  case types.GET_MOVIE_DETAIL_ERROR:
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
