import types from '../constants';

const initialState = {
  meta: {
    status: 'loading'
  },
  data: []
};

export default function moviestream(state = initialState, action) {
  switch (action.type) {
    case types.GET_MOVIE_STREAM_LOADING:
      // console.log('loading', action.payload)
      return { ...state, ...action.payload };
    case types.GET_MOVIE_STREAM_SUCCESS:
      // console.log('sukses', action.payload)
      return { ...state, ...action.payload };
    case types.GET_MOVIE_STREAM_ERROR:
      // console.log('error', action.payload)
      return { ...state, ...action.payload };
    default:
      return {
        ...state
      };
  }
}
