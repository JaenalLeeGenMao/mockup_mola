/* eslint-disable import/prefer-default-export */
import Mola from '../api/mola';
import types from '../constants';

export const getHomePlaylist = () => dispatch => {
    return Mola.getHomePlaylist()
        .then(result => {
            dispatch({
                type: types.GET_HOME_PLAYLIST,
                payload: result,
            });
        })
};

export const getHomeVideo = ({ id }) => ({
    type: types.GET_HOME_VIDEO,
    payload: {
        id,
    },
});
