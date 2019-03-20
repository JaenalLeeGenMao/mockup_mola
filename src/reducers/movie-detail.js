import types from '../constants'

const initialState = {
  meta: {
    status: 'loading',
    error: '',
  },
  data: [],
}

export default function movieDetail(state = initialState, action) {
  switch (action.type) {
    case types.GET_MOVIE_DETAIL_LOADING:
      return { ...state, ...action.payload }
    case types.GET_MOVIE_DETAIL_SUCCESS:
      return { ...state, ...action.payload }
    case types.GET_MOVIE_DETAIL_ERROR:
      return { ...state, ...action.payload }
    default:
      return {
        ...state,
      }
  }
}
