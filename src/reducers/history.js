import { GET_HISTORY } from '../constants/history';

export default function history(state = { movies: [] }, action) {
  switch (action.type) {
  case GET_HISTORY:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
}
