import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import home from './home';
import history from './history';
import search from './search';
import movieDetail from './movie-detail'

export default combineReducers({
  user,
  runtime,
  home,
  history,
  search,
  movieDetail
});
