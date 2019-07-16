import types from '../constants'
import { findIndexByKeyValue } from './util'

const initialState = {
  meta: {
    status: 'loading',
  },
  data: [],
  genreSpo: {
    meta: {
      status: 'loading',
    },
    data: [],
  },
}

export default function matches(state = initialState, action) {
  switch (action.type) {
    case types.GET_MATCHES_PLAYLIST_LOADING:
      // console.log('matches reducers loading', action.payload)
      return { ...state, ...action.payload }
    case types.GET_MATCHES_PLAYLIST_SUCCESS:
      // console.log('matches reducers success', action.payload)
      return { ...state, ...action.payload }
    case types.GET_MATCHES_PLAYLIST_ERROR:
      return {
        ...state,
        ...action.payload,
      }

    case types.GET_MATCHES_GENRESPO_LOADING:
      return { ...state, genreSpo: { ...action.payload } }
    case types.GET_MATCHES_GENRESPO_SUCCESS:
      return { ...state, genreSpo: { ...action.payload } }
    case types.GET_MATCHES_GENRESPO_ERROR:
      return { ...state, genreSpo: { ...action.payload } }

    case types.UPDATE_ACTIVE_MATCHES_PLAYLIST:
      return { ...state, ...action.payload }
    default:
      return {
        ...initialState,
        ...state,
      }
  }
}
