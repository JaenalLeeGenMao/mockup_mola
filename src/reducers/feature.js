import types from '../constants'
import { findIndexByKeyValue } from './util'

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
  banners: {
    meta: {
      status: 'loading',
    },
    data: [],
  },
  articles: {
    meta: {
      status: 'loading',
    },
    data: [],
  },
}

export default function home(state = {}, action) {
  /** action.id is the catalog id */
  if (action.id) {
    let newState = state[action.id]
      ? state
      : {
          ...state,
          [action.id]: initialState,
        }

    switch (action.type) {
      case types.GET_FEATURE_PLAYLIST_LOADING:
        return {
          ...newState,
          [action.id]: { ...newState[action.id], playlists: { ...newState[action.id].playlists, ...action.payload } },
        }
      case types.GET_FEATURE_PLAYLIST_SUCCESS:
        return {
          ...newState,
          [action.id]: { ...newState[action.id], playlists: { ...newState[action.id].playlists, ...action.payload } },
        }
      case types.GET_FEATURE_PLAYLIST_ERROR:
        return {
          ...newState,
          [action.id]: { ...newState[action.id], playlists: { ...newState[action.id].playlists, ...action.payload } },
        }
      case types.GET_FEATURE_VIDEO:
        // console.log('home newState', newState)
        let result = [...newState[action.id].videos.data],
          status
        // console.log('reducer home checking result', result)

        const index = findIndexByKeyValue(result, 'id', action.payload.meta.id),
          filteredStatus = newState[action.id].videos.data.filter(({ meta }) => meta.status === 'error').length > 0

        if (filteredStatus) {
          status = 'error'
        } else if (newState[action.id].videos.data.length < newState[action.id].playlists.data.length - 1) {
          status = 'loading'
        } else {
          status = 'success'
        }

        if (index === -1) {
          result.push({ ...action.payload })
          result = result.sort((a, b) => a.meta.sortOrder - b.meta.sortOrder)
        }
        return {
          ...newState,
          [action.id]: {
            ...newState[action.id],
            videos: {
              ...newState[action.id].videos,
              meta: { status, error: status === 'error' ? 'API Video failed' : '' },
              data: result,
            },
          },
        }
      case types.GET_FEATURE_BANNER_LOADING:
        return {
          ...newState,
          [action.id]: { ...newState[action.id], banners: { ...newState[action.id].banners, ...action.payload } },
        }
      case types.GET_FEATURE_BANNER_SUCCESS:
        return {
          ...newState,
          [action.id]: { ...newState[action.id], banners: { ...newState[action.id].banners, ...action.payload } },
        }
      case types.GET_FEATURE_BANNER_ERROR:
        return {
          ...newState,
          [action.id]: { ...newState[action.id], banners: { ...newState[action.id].banners, ...action.payload } },
        }
      case types.GET_FEATURE_ARTICLE_LOADING:
        return {
          ...newState,
          [action.id]: { ...newState[action.id], articles: { ...newState[action.id].articles, ...action.payload } },
        }
      case types.GET_FEATURE_ARTICLE_SUCCESS:
        return {
          ...newState,
          [action.id]: { ...newState[action.id], articles: { ...newState[action.id].articles, ...action.payload } },
        }
      case types.GET_FEATURE_ARTICLE_ERROR:
        return {
          ...newState,
          [action.id]: { ...newState[action.id], articles: { ...newState[action.id].articles, ...action.payload } },
        }
      case types.RESET_FEATURE_VIDEO:
        return { ...newState, [action.id]: initialState }
      // return {
      //   ...newState,
      //   videos: {
      //     meta: {
      //       status: 'loading',
      //     },
      //     data: [],
      //   },
      // }
      default:
        return {
          // ...initialState,
          ...newState,
        }
    }
  } else {
    return { ...state }
  }
}
