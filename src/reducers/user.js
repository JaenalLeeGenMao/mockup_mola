import types from '../constants'

const initialState = {
  uid: '',
  sid: '',
  firstName: '',
  lastName: '',
  name: '',
  email: '',
  birthdate: '',
  gender: '',
  location: '',
  token: '',
  refreshToken: '',
  phone: '',
  expire: '',
  type: '',
  isLoading: false,
}

// const fakeData = {
//   username: 'Trisno Nino',
//   email: 'ninotrisno34@gmail.com',
//   birthdate: '2018-09-29',
//   gender: 'm',
//   phoneNumber: '0853-1501-5663',
//   photo: '',
//   location: 'Indonesia',
//   setting: {
//     videoQuality: 1,
//     location: 1,
//     autoPlay: [1],
//     signOn: [1, 2],
//   },
// }

// const initialState = Object.assign(emptyData, fakeData)
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
      const { name, birthdate, email, gender, location, phone, uid } = action.payload
      const splitName = name.split(' ')
      const firstName = splitName[0]
      let lastName = ''
      if (splitName.length > 2) {
        for (var i = 1; i < splitName.length; i++) {
          lastName += splitName[i] + ' '
        }
      } else {
        lastName = splitName[splitName.length - 1]
      }
      lastName = lastName.trim()
      return {
        ...state,
        firstName,
        lastName,
        name,
        birthdate,
        email,
        gender,
        location,
        phone,
        uid,
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
