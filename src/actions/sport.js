/* eslint-disable import/prefer-default-export */
import Mola from '@api/mola'
import types from '../constants'

const getSportCategoryList = () => dispatch => {
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
  return Mola.getSportCategoryList().then(async result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_SPORT_PLAYLIST_ERROR,
        payload: result,
      })
    } else {
      if (result.data) {
        if (result.data[0].id === 'mola-soc') {
          for (const liveSoc of result.data) {
            const liveSocPlaylists = await Mola.getMatchesList(liveSoc.id)
            liveSoc.playlists = liveSocPlaylists
            // console.log('get data live soc all', liveSocPlaylists)
            // const allMatchDetail = []
            // if (allMatchDetail != null && liveSoc.playlists.data.playlists !== null) {
            //   for (const MatchDetail of liveSocPlaylists.data) {
            //     allMatchDetail.push(MatchDetail.id)
            //     // console.log('allMatchDetail', allMatchDetail)
            //   }
            //   const MatchDetailList = await Mola.getMatchDetail(allMatchDetail)
            //   allMatchDetail.playlists = MatchDetailList
            //   // console.log('rrrr', MatchDetailList)
            // }
          }
        }
      }
      /*if (allMatchDetail.playlists.meta.status === 'success'){
          dispatch({
            type: types.GET_SPORT_PLAYLIST_SUCCESS,
            payload: allMatchDetail
          })
        } esle {
          dispatch({
            type: types.GET_SPORT_PLAYLIST_ERROR,
            payload: allMatchDetail           
          })
        }
        */
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
        sortOrder: playlist.sortOrder,
      },
      data: result.data,
      background: {
        landscape: playlist.background.landscape,
      },
    }
    if (result.data.playlists) {
      for (const liveSoc of result.data.playlists) {
        if (liveSoc.id === 'live-soc') {
          const liveSocPlaylists = getSubPlaylistLiveNowUpcomingVideo()
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
  getSportCategoryList,
  getSportVideo,
  updateActivePlaylist,
}
