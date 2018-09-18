/* eslint-disable import/prefer-default-export */
import Mola from '../api/mola';
import types from '../constants';
import config from '../config';

export const getHomePlaylist = () => dispatch => {
  dispatch({
    type: types.GET_HOME_PLAYLIST_LOADING,
    payload: {
      meta: {
        status: "loading",
        error: ''
      },
      data: []
    }
  });
  return Mola.getHomePlaylist({ ...config })
    .then(result => {
      if (result.meta.status === "error") {
        dispatch({
          type: types.GET_HOME_PLAYLIST_ERROR,
          payload: result,
        });
      } else {
        dispatch({
          type: types.GET_HOME_PLAYLIST_SUCCESS,
          payload: result,
        });
      }
    });
};

export const getHomeVideo = playlist => dispatch => {
  return Mola.getHomeVideo({ id: playlist.id, ...config })
    .then(result => {
      result = {
        meta: {
          status: result.meta.status,
          id: playlist.id,
          sortOrder: playlist.sortOrder
        },
        data: [playlist].concat(result.data)
      };
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
        return { ...playlist, isActive: true }
      }
      return { ...playlist, isActive: false }
    });
  return dispatch({
    type: types.UPDATE_ACTIVE_PLAYLIST,
    payload: {
      meta: { ...meta },
      data: [...data]
    },
  });
};