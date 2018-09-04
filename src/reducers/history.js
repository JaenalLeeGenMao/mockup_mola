import { FETCH_HISTORY } from '../constants';

export default function history(state = { movies: [] }, action) {
  switch (action.type) {
    case FETCH_HISTORY:
      return {
        ...state,
        movies: action.result.data,
      };
    default:
      return state;
  }
}
