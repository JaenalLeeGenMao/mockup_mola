/* eslint-disable import/prefer-default-export */
import Mola from '@api/mola'
import types from '../constants'

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
  })
  return Mola.getSportList().then(async result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_SPORT_PLAYLIST_ERROR,
        payload: result,
      })
    } else {
      if (result.data) {
        for (const sportList of result.data) {
          const matchesPlaylist = await Mola.getSportList(sportList.id)
          if (matchesPlaylist.data.length > 0) {
            const matchesVideoList = matchesPlaylist.data.length > 0 && await Mola.getMatchesList(matchesPlaylist.data[0].id)
            const allMatchDetail = []
            for (const matchDetail of matchesVideoList.data) {
              allMatchDetail.push(matchDetail.id)
            }
            const matchDetailDt = await Mola.getMatchDetail(allMatchDetail)
            sportList.playlists = matchDetailDt
          }
        }
      }
      return dispatch({
        type: types.GET_SPORT_PLAYLIST_SUCCESS,
        payload: result,
      })
    }
  })
}
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
    }
    if (result.data.playlists) {
      for (const liveSoc of result.data.playlists) {
        if (liveSoc.id === 'live-soc') {
          const liveSocPlaylists = getMatchesList(liveSoc.id)
          liveSoc.playlists = liveSocPlaylists.playlists
          liveSoc.videos = liveSocPlaylists.videos
        }
      }
    }
    dispatch({
      type: types.GET_SPORT_VIDEO,
      payload: result,
    })
  })
}

const updateActivePlaylist = id => (dispatch, getState) => {
  const store = getState(),
    { sport: { playlists: { meta, data: playlistsData } } } = store,
    data = playlistsData.map(playlist => {
      if (playlist.id === id) {
        return { ...playlist, isActive: true }
      }
      return { ...playlist, isActive: false }
    })
  return dispatch({
    type: types.UPDATE_ACTIVE_SPORT_PLAYLIST,
    payload: {
      meta: { ...meta },
      data: [...data],
    },
  })
}

export default {
  getSportList,
  getSportVideo,
  updateActivePlaylist,
}
