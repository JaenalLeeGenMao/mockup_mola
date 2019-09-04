import types from '../constants'

const initialState = {
  meta: {
    status: 'loading',
    error: '',
  },
  data: [],
}

export default function dataPartners(state = initialState, action) {
  switch (action.type) {
    case types.GET_PARTNERS_LOADING:
      return { ...state, ...action.payload }
    case types.GET_PARTNERS_SUCCESS:
      return { ...state, ...action.payload }
    case types.GET_PARTNERS_ERROR:
      return { ...state, ...action.payload }
    default:
      return {
        ...state,
      }
  }
}
