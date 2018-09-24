import types from '../constants';

export default function searchResult(state = {}, action) {
  switch (action.type) {
  case types.GET_SEARCH_GENRE_LOADING:
    return { ...state, genre: { ...action.payload } };
  case types.GET_SEARCH_GENRE_SUCCESS:
    return { ...state, genre: { ...action.payload } };
  case types.GET_SEARCH_GENRE_ERROR:
    return { ...state, genre: { ...action.payload } };

  case types.GET_SEARCH_LOADING:
    return { ...state, result: { ...action.payload } };
  case types.GET_SEARCH_SUCCESS:
    return { ...state, result: { ...action.payload } };
  case types.GET_SEARCH_ERROR:
    return { ...state, result: { ...action.payload } };

  default:
    return {
      ...state,
      result: {
        meta: {
          status: "loading"
        },
        data: []
      },
      genre: {
        meta: {
          status: "loading"
        },
        data: []
      }
    };
  }
};