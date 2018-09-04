import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import home from './home';
import history from './history';

export default combineReducers({
    user,
    runtime,
    home,
    history
});
