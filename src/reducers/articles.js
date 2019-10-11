import types from '../constants'

const initialState = {
  meta: {
    status: 'loading',
    error: '',
  },
  data: [],
}

export default function articlesDetail(state = initialState, action) {
  switch (action.type) {
    case types.GET_ARTICLES_DETAIL_LOADING:
      return { ...state, ...action.payload }
    case types.GET_ARTICLES_DETAIL_SUCCESS:
      return { ...state, ...action.payload }
    case types.GET_ARTICLES_DETAIL_ERROR:
      return { ...state, ...action.payload }
    default:
      return {
        ...state,
      }
  }
}
