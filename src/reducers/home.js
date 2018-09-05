import types from '../constants';
import {findIndexByKeyValue} from './util';

export default function home(state = {}, action) {
    switch (action.type) {
    case types.GET_HOME_PLAYLIST:
        // return { ...state.home,  ...action.payload };
        return {...state,  playlists: {...action.payload}};
    case types.GET_HOME_VIDEO:
        // console.log(types.GET_HOME_VIDEO, "di reducer");
        // console.log({...action.payload});
        // console.log("STATE VIDEO: ", [...state.videos.data]);
        // let flag = false; /** kalo true push ke result */
        const result = [...state.videos.data],
            status= state.videos.data.length > 1 ? "success" : "no_result",
            index= findIndexByKeyValue(result, "id", action.payload.meta.id);

        if (index === -1) {
            result.push({...action.payload});
        }

        return {
            ...state,
            videos: {
                ...state.videos,
                meta: status,
                data: result,
            }
        };
        // return { ...state }
    case types.UPDATE_ACTIVE_PLAYLIST:
        return {...state,  playlists: {...action.payload}};
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
