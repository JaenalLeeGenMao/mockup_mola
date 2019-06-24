import types from '../constants'

const initialState = {
  loading: true,
  data: {},
  error: false
}

export default function programmeGuides(state = initialState, action) {
  switch (action.type) {
    case types.GET_PROGRAMME_GUIDES_LOADING:
      return { ...state, loading: true }
    case types.GET_PROGRAMME_GUIDES_SUCCESS:
      if (state[action.payload.playlistId]) {
        return {
          ...state,
          loading: false,
          data: {
            ...state.data,
            [action.payload.playlistId]: { ...state[action.payload.playlistId], ...action.payload }
          },
          error: false,
        };
      }
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          [action.payload.playlistId]: action.payload
        },
        error: false
      };
    case types.GET_PROGRAMME_GUIDES_ERROR:
      return { ...state, loading: false, error: true, }
    default:
      return {
        ...state,
      }
  }
}
