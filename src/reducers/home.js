import types from '../constants';
import Mola from '../api/mola';

export default function home(state = {}, action) {
    switch (action.type) {
        case types.GET_HOME_PLAYLIST:
            return { ...state.home,  ...action.payload };
        case types.GET_HOME_VIDEO:
            console.log(GET_HOME_VIDEO, Mola.HOME_PLAYLIST_ENDPOINT);
            return { ...state };
        default:
            return { ...state };
    }
};
