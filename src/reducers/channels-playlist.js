import types from '../constants'

const initialState = {
  meta: {
    status: 'loading',
    error: '',
  },
  data: [],
}

export default function channelsPlaylist(state = initialState, action) {
  switch (action.type) {
    case types.GET_CHANNELS_PLAYLIST_LOADING:
      return { ...state, ...action.payload }
    case types.GET_CHANNELS_PLAYLIST_SUCCESS:
      return { ...state, ...action.payload }
    case types.GET_CHANNELS_PLAYLIST_ERROR:
      return { ...state, ...action.payload }
    default:
      return {
        ...state,
      }
  }
}
