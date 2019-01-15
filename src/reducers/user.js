import types from '../constants'

const emptyData = {
  uid: '',
  sid: '',
  firstName: '',
  lastName: '',
  email: '',
  token: '',
  refreshToken: '',
  expire: '',
  type: '',
  isLoading: false,
}

const fakeData = {
  username: 'Trisno Nino',
  email: 'ninotrisno34@gmail.com',
  birthdate: '2018-09-29',
  gender: 'm',
  phoneNumber: '0853-1501-5663',
  photo: 'https://cdn2.hercampus.com/styles/hcxo_tile_standard/s3/emma-watson-for-covetour-inside-emma-watson-s-closet-march-2017_1.jpg?timestamp=1493154613',
  location: 'Indonesia',
  setting: {
    videoQuality: 1,
    location: 1,
    autoPlay: [1],
    signOn: [1, 2],
  },
}

const initialState = Object.assign(emptyData, fakeData)
export default function runtime(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      }
    case types.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
      }

    case types.UPDATE_SETTING_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case types.UPDATE_SETTING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        setting: action.payload,
      }
    case types.UPDATE_SETTING_FAILURE:
      return {
        ...state,
        isLoading: false,
      }

    case types.FETCH_PROFILE_USER:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      }

    case types.SET_USER_VARIABLE:
      return {
        ...initialState,
        ...state,
        [action.payload.name]: action.payload.value,
      }
    default:
      return { ...initialState, ...state }
  }
}
