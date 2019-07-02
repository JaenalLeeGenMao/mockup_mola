/* eslint-disable import/prefer-default-export */
import Mola from '@api/mola'
import types from '../constants'
import { viewAllMovieBg, viewAllMovieBgWebp, viewAllMovieMobileBg, viewAllMovieMobileBgWebp } from '@global/imageUrl'

const getHomePlaylist = () => dispatch => {
  dispatch({
    type: types.GET_HOME_PLAYLIST_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: '',
      },
      data: [],
    },
  })
  return Mola.getHomePlaylist().then(result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_HOME_PLAYLIST_ERROR,
        payload: result,
      })
    } else {
      const featurePlaylist = { id: 'web-featured', title: 'Featured', sortOrder: 0, visibility: 1 }
      const dataFeature = [featurePlaylist, ...result.data]
      const resultFeature = {
        data: dataFeature.filter(dt => {
          return dt.visibility === 1
        }),
        meta: {
          ...result.meta,
        },
      }
      dispatch({
        type: types.GET_HOME_PLAYLIST_SUCCESS,
        payload: resultFeature,
      })
    }
  })
}

const getHomeVideo = (playlist, isMobile) => dispatch => {
  if (playlist.id === 'web-featured') {
    return Mola.getFeatureBanner(isMobile).then(result => {
      result = {
        meta: {
          status: result.meta.status,
          id: playlist.id,
          sortOrder: 0,
        },
        data: result.data,
      }
      dispatch({
        type: types.GET_HOME_VIDEO,
        payload: result,
      })
    })
  } else {
    return Mola.getHomeVideo({ id: playlist.id }).then(result => {
      const viewAllSection = {
        background: {
          landscape: viewAllMovieBg,
          landscapeWebp: viewAllMovieBgWebp,
          portrait: viewAllMovieMobileBg,
          portraitWebp: viewAllMovieMobileBgWebp,
        },
        isDark: 0,
      }

      const filterVisibility = result.data.filter(dt => {
        return dt.visibility === 1
      })

      result = {
        meta: {
          status: result.meta.status,
          id: playlist.id,
          sortOrder: playlist.sortOrder,
        },
        data: filterVisibility.concat(viewAllSection),
      }
      dispatch({
        type: types.GET_HOME_VIDEO,
        payload: result,
      })
    })
  }
}

const updateActivePlaylist = id => (dispatch, getState) => {
  const store = getState(),
    { home: { playlists: { meta, data: playlistsData } } } = store,
    data = playlistsData.map(playlist => {
      if (playlist.id === id) {
        return { ...playlist, isActive: true }
      }
      return { ...playlist, isActive: false }
    })
  return dispatch({
    type: types.UPDATE_ACTIVE_PLAYLIST,
    payload: {
      meta: { ...meta },
      data: [...data],
    },
  })
}

export default {
  getHomePlaylist,
  getHomeVideo,
  updateActivePlaylist,
}
