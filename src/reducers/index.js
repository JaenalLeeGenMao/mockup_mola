import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import history from './history';

export default combineReducers({
  user,
  runtime,
  history,
});
