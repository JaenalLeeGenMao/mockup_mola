import types from '../constants';
import { findIndexByKeyValue } from './util';

Array.prototype.insert = function(index, item) {
  this.splice(index, 0, item);
};

const initialState = {
  playlists: {
    meta: {
      status: 'loading',
    },
    data: [],
  },
  videos: {
    meta: {
      status: 'loading',
    },
    data: [],
  },
};

export default function sport(state = initialState, action) {
  switch (action.type) {
    case types.GET_SPORT_PLAYLIST_LOADING:
<<<<<<< HEAD
      // console.log('sport reducers loading', action.payload)
      return { ...state, playlists: { ...action.payload } }
=======
      return { ...state, playlists: { ...action.payload } };
>>>>>>> sport page mobile version
    case types.GET_SPORT_PLAYLIST_SUCCESS:
      return { ...state, playlists: { ...action.payload } };
    case types.GET_SPORT_PLAYLIST_ERROR:
      return {
        ...state,
        playlists: { ...action.payload },
      };
    case types.GET_SPORT_VIDEO:
      let result = [...state.videos.data];
      let status;
      const currentVideosLength = state.videos.data.length;
      const currentPLaylistLength = state.playlists.data.length;
      // const index = findIndexByKeyValue(result, 'id', action.payload.meta.id)

      const filteredStatus = state.videos.data.filter(({ meta }) => meta.status === 'error').length > 0;

      if (filteredStatus) {
        status = 'error';
      } else if (currentVideosLength < currentPLaylistLength - 1) {
        status = 'loading';
      } else {
        status = 'success';
      }

      const resultId = action.payload.meta.id;
      const playlistIndex = state.playlists.data
        .map(function(e) {
          return e.id;
        })
        .indexOf(resultId);

      result.splice(playlistIndex, 0, { ...action.payload });

      // if (index === -1) {
      //   result.push({ ...action.payload })
      //   result = result.sort((a, b) => a.meta.sortOrder - b.meta.sortOrder)
      // }

      return {
        ...state,
        videos: {
          ...state.videos,
          meta: { status, error: status === 'error' ? 'API Video failed' : '' },
          data: result,
        },
      };
    case types.UPDATE_ACTIVE_SPORT_PLAYLIST:
      return { ...state, playlists: { ...action.payload } };
    default:
      return {
        ...initialState,
        ...state,
      };
  }
}
