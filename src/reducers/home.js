import types from '../constants';
import { findIndexByKeyValue } from './util';

export default function home(state = {}, action) {
  switch (action.type) {
  case types.GET_HOME_PLAYLIST_LOADING:
    return { ...state,  playlists: { ...action.payload } };
  case types.GET_HOME_PLAYLIST_SUCCESS:
    return { ...state,  playlists: { ...action.payload } };
  case types.GET_HOME_PLAYLIST_ERROR:
    return { ...state,  playlists: { ...action.payload } };
  case types.GET_HOME_VIDEO:
    let result = [...state.videos.data],
      status;
    const index= findIndexByKeyValue(result, "id", action.payload.meta.id),
      filteredStatus = state.videos.data.filter(({ meta }) => meta.status === "error").length > 0;

    if (filteredStatus) {
      status = "error";
    } else if (state.videos.data.length < state.playlists.data.length - 1) {
      status = "loading";
    } else {
      status = "success";
    }

    if (index === -1) {
      result.push({ ...action.payload });
      result = result.sort((a, b) => a.meta.sortOrder - b.meta.sortOrder);
    }

    return {
      ...state,
      videos: {
        ...state.videos,
        meta: { status, error: status === "error" ? "API Video failed" : "" },
        data: result,
      }
    };
  case types.UPDATE_ACTIVE_PLAYLIST:
    return { ...state,  playlists: { ...action.payload } };
  default:
    return {
      ...state,
      playlists: {
        meta: {
          status: "loading"
        },
        data: []
      },
      videos: {
        meta: {
          status: "loading"
        },
        data: []
      }
    };
  }
};
