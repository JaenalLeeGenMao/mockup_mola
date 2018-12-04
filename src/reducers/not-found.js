import types from '../constants'

const initialState = {
  meta: {
    status: 'loading',
  },
  data: [],
}

export default function notfound(state = initialState, action) {
  switch (action.type) {
    case types.GET_HOT_PLAYLIST_LOADING:
      // console.log('loading', action.payload)
      return { ...state, ...action.payload }
    case types.GET_HOT_PLAYLIST_ERROR:
      // console.log('sukses', action.payload)
      return { ...state, ...action.payload }
    case types.GET_HOT_PLAYLIST_SUCCESS:
      // console.log('error', action.payload)
      return { ...state, ...action.payload }
    default:
      return {
        ...state,
      }
  }
}
