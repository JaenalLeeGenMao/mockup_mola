import types from '../constants'

const initialState = {
  meta: {
    status: 'loading',
  },
  update: {
    status: '',
  },
  total: {
    meta: {
      status: '',
      err: '',
    },
    data: 0,
  },
  showPopupNotifications: false,
  data: [],
  page: 0,
  isMore: false,
}

export default function matches(state = initialState, action) {
  switch (action.type) {
    case types.GET_TOTAL_NOTIFICATIONS_LOADING:
      // console.log('notifications reducers loading', action.payload)
      return { ...state, ...action.payload }
    case types.GET_TOTAL_NOTIFICATIONS_SUCCESS:
      // console.log('notifications reducers success', action.payload)
      return { ...state, ...action.payload }
    case types.GET_TOTAL_NOTIFICATIONS_ERROR:
      return {
        ...state,
        ...action.payload,
      }
    case types.GET_NOTIFICATIONS_LOADING:
      // console.log('notifications reducers loading', action.payload)
      return { ...state, ...action.payload }
    case types.GET_NOTIFICATIONS_SUCCESS:
      // console.log('notifications reducers success', action.payload)
      return { ...state, ...action.payload }
    case types.GET_NOTIFICATIONS_ERROR:
      return {
        ...state,
        ...action.payload,
      }
    case types.UPDATE_NOTIFICATIONS_LOADING:
      // console.log('notifications reducers loading', action.payload)
      return { ...state, ...action.payload }
    case types.UPDATE_NOTIFICATIONS_SUCCESS:
      // console.log('notifications reducers success', action.payload)
      return { ...state, ...action.payload }
    case types.UPDATE_NOTIFICATIONS_ERROR:
      // console.log('notifications reducers error', action.payload)
      return { ...state, ...action.payload }
    case types.TOGGLE_POPUP_NOTIFICATIONS:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return {
        ...initialState,
        ...state,
      }
  }
}
