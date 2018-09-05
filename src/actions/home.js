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
        });
};

export const getHomeVideo = playlist => dispatch => {
    return Mola.getHomeVideo({id: playlist.id})
        .then(result => {
            result = {
                meta: {
                    status: "success",
                    id: playlist.id
                },
                data: [playlist].concat(result)
            };
            // console.log(result);
            dispatch({
                type: types.GET_HOME_VIDEO,
                payload: result,
            });
        });
};

export const updateActivePlaylist = id => (dispatch, getState) => {
    const store = getState(),
        {
            home: {
                playlists: {
                    meta,
                    data: playlistsData
                }
            }
        } = store,
        data = playlistsData.map(playlist => {
            if (playlist.id === id) {
                playlist.isActive = true;
            }
            playlist.isActive = false;
            return {...playlist}
        });
    return dispatch({
        type: types.UPDATE_ACTIVE_PLAYLIST,
        payload: {
            meta: {...meta},
            data: {...data}
        },
    });
};