import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import home from './home';
import history from './history';
import search from './search';
import movieDetail from './movie-detail';
import movieLibrary from './movie-library';
import movieStream from './movie-stream';
// import { getReducer } from '../../../gandalf';
// const user = getReducer('user').default;
// const runtime = getReducer('runtime').default;
// const home = getReducer('home').default;
// const history = getReducer('history').default;
// const search = getReducer('search').default;
// const movieDetail = getReducer('movieDetail').default;
// const movieLibrary = getReducer('movieLibrary').default;
// const movieStream = getReducer('movieStream').default;

import { reducer as toastrReducer } from 'react-redux-toastr';

export default combineReducers({
  user,
  runtime,
  home,
  history,
  search,
  movieLibrary,
  movieDetail,
  toastr: toastrReducer,
  movieStream
});
