import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import home from './home';
import history from './history';
import search from './search';
import movieDetail from './movie-detail';
import movieLibrary from './movie-library';
import movieStream from './movie-stream';
import { reducer as toastr } from 'react-redux-toastr';

// import { getReducer } from '../../../gandalf';
// import { getReducer } from 'gandalf';
// const { user, runtime, home, history, search, movieDetail, movieLibrary, movieStream, toastr } = getReducer();

export default combineReducers({
  user,
  runtime,
  home,
  history,
  search,
  movieLibrary,
  movieDetail,
  toastr,
  movieStream
});
