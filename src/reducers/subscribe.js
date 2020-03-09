import types from '../constants'

const initialState = {
  meta: {
    status: 'loading',
  },
  data: [],
}

export default function subscribe(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_SUBSCRIPTION_LOADING:
      return { ...state, ...action.payload }
    case types.GET_ALL_SUBSCRIPTION_SUCCESS:
      return { ...state, ...action.payload }
    case types.GET_ALL_SUBSCRIPTION_ERROR:
      return { ...state, ...action.payload }
    default:
      return { ...state }
  }
}
