import types from '../constants'
import { findIndexByKeyValue } from './util'

const initialState = {
  meta: {
    status: 'loading',
  },
  data: [],
}

export default function matches(state = initialState, action) {
  switch (action.type) {
    case types.GET_MATCHES_PLAYLIST_LOADING:
      return { ...state, ...action.payload }
    case types.GET_MATCHES_PLAYLIST_SUCCESS:
      return { ...state, ...action.payload }
    case types.GET_MATCHES_PLAYLIST_ERROR:
      return {
        ...state,
        ...action.payload,
      }
    case types.UPDATE_ACTIVE_MATCHES_PLAYLIST:
      return { ...state, ...action.payload }
    default:
      return {
        ...initialState,
        ...state,
      }
  }
}
