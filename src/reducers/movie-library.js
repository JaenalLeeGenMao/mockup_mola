import types from '../constants';

const initialState = {
  meta: {
    status: 'loading'
  },
  data: []
};

export default function movieLibrary(state = initialState, action) {
  switch (action.type) {
    case types.GET_MOVIE_LIBRARY_LOADING:
      return { ...state, ...action.payload };
    case types.GET_MOVIE_LIBRARY_SUCCESS:
      return { ...state, ...action.payload };
    case types.GET_MOVIE_LIBRARY_ERROR:
      return { ...state, ...action.payload };
    case types.GET_MOVIE_LIBRARY_LIST_LOADING:
      return { ...state, ...action.payload };
    case types.GET_MOVIE_LIBRARY_LIST_SUCCESS:
      return { ...state, ...action.payload };
    case types.GET_MOVIE_LIBRARY_LIST_ERROR:
      return { ...state, ...action.payload };
    default:
      return {
        ...state
      };
  }
}
