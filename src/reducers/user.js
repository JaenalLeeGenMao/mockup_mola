import types from '../constants';

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
  isLoading: false
};

const fakeData = {
  username: 'Trisno Nino',
  email: 'ninotrisno34@gmail.com',
  birthdate: '18/09/2018',
  gender: 'male',
  phoneNumber: '0853-1501-5663',
  photo:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtTG0j1MmEng29JZuTbH7KqM55WOrUD7XfxtzOseyZeuFWJPv7',
  location: 'Indonesia',
  setting: {
    videoQuality: 1,
    location: 1,
    autoPlay: [1],
    signOn: [1, 2]
  }
};

const initialState = Object.assign(emptyData, fakeData);
export default function runtime(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };
    case types.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false
      };

    case types.UPDATE_SETTING_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case types.UPDATE_SETTING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        setting: action.payload
      };
    case types.UPDATE_SETTING_FAILURE:
      return {
        ...state,
        isLoading: false
      };

    case types.SET_USER_VARIABLE:
      return {
        ...initialState,
        ...state,
        [action.payload.name]: action.payload.value
      };
    default:
      return { ...initialState, ...state };
  }
}
