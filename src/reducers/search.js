import types from '../constants'

const initialState = {
  recentSearch: {
    meta: {
      status: 'loading',
    },
    data: [],
  },
  result: {
    meta: {
      status: 'loading',
    },
    data: [],
  },
  genre: {
    meta: {
      status: 'loading',
    },
    data: [],
  },
}

export default function searchResult(state = initialState, action) {
  switch (action.type) {
    case types.GET_SEARCH_LOADING:
      return { ...state, result: { ...action.payload } }
    case types.GET_SEARCH_SUCCESS:
      return { ...state, result: { ...action.payload } }
    case types.GET_SEARCH_ERROR:
      return { ...state, result: { ...action.payload } }
    case types.GET_SEARCH_NO_RESULT:
      return {
        ...state,
        result: {
          meta: {
            status: 'no_result',
            error: '',
          },
          data: [],
        },
      }
    case types.GET_RECENT_SEARCH_LOADING:
      return { ...state, recentSearch: { ...action.payload } }
    case types.GET_RECENT_SEARCH_SUCCESS:
      return { ...state, recentSearch: { ...action.payload } }
    case types.GET_RECENT_SEARCH_ERROR:
      return { ...state, recentSearch: { ...action.payload } }

    default:
      return {
        ...state,
      }
  }
}
