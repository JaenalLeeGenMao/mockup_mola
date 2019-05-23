/* eslint-disable import/prefer-default-export */
import Mola from '@api/mola';
import types from '../constants';

const getSportList = () => dispatch => {
  dispatch({
    type: types.GET_SPORT_PLAYLIST_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: '',
      },
      data: [],
    },
  });
  return Mola.getSportList().then(async result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_SPORT_PLAYLIST_ERROR,
        payload: result,
      });
    } else {
      if (result.data) {
        const liveSocPlaylists = await Mola.getMatchesList();
        result.data[0].playlists = liveSocPlaylists;

        const allMatchDetail = [];
        for (const matchDetail of result.data[0].playlists.data) {
          allMatchDetail.push(matchDetail.id);
        }
        const matchDetailList = await Mola.getMatchDetail(allMatchDetail);
        // console.log('test MatchDetailList', matchDetailList)
      }
      return dispatch({
        type: types.GET_SPORT_PLAYLIST_SUCCESS,
        payload: result,
      });
    }
  });
};
const getSportVideo = playlist => dispatch => {
  return Mola.getSportVideo({ id: playlist.id }).then(result => {
    result = {
      meta: {
        status: result.meta.status,
        id: playlist.id,
      },
      data: result.data,
      background: {
        landscape: playlist.background.landscape,
      },
    };
    if (result.data.playlists) {
      for (const liveSoc of result.data.playlists) {
        if (liveSoc.id === 'live-soc') {
          const liveSocPlaylists = getMatchesList();
          liveSoc.playlists = liveSocPlaylists.playlists;
          liveSoc.videos = liveSocPlaylists.videos;
        }
      }
    }
    dispatch({
      type: types.GET_SPORT_VIDEO,
      payload: result,
    });
  });
};

const updateActivePlaylist = id => (dispatch, getState) => {
  const store = getState(),
    { sport: { playlists: { meta, data: playlistsData } } } = store,
    data = playlistsData.map(playlist => {
      if (playlist.id === id) {
        return { ...playlist, isActive: true };
      }
      return { ...playlist, isActive: false };
    });
  return dispatch({
    type: types.UPDATE_ACTIVE_SPORT_PLAYLIST,
    payload: {
      meta: { ...meta },
      data: [...data],
    },
  });
};

export default {
  getSportList,
  getSportVideo,
  updateActivePlaylist,
};
