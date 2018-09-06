import types from '../constants';
import { findIndexByKeyValue } from './util';

export default function home(state = {}, action) {
    switch (action.type) {
    case types.GET_HOME_PLAYLIST:
        return { ...state,  playlists: { ...action.payload } };
    case types.GET_HOME_VIDEO:
        let result = [...state.videos.data];
        const status= state.videos.data.length > 1 ? "success" : "no_result",
            index= findIndexByKeyValue(result, "id", action.payload.meta.id);

        if (index === -1) {
            result.push({ ...action.payload });
            result = result.sort((a, b) => a.meta.sortOrder - b.meta.sortOrder);
        }

        return {
            ...state,
            videos: {
                ...state.videos,
                meta: { status },
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
