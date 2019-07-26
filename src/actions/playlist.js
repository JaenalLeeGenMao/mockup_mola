/* eslint-disable import/prefer-default-export */
import Mola from '@api/mola'
import types from '../constants'

const getPlaylist = id => dispatch => {
  dispatch({
    type: types.GET_PLAYLIST_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: '',
      },
      data: [],
    },
  })
  return Mola.getPlaylistPlaylists(id).then(result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_PLAYLIST_ERROR,
        payload: {
          meta: {
            status: 'error',
            error: 'Error: get playlist failed',
          },
          data: [],
        },
      })
    } else {
      dispatch({
        type: types.GET_PLAYLIST_SUCCESS,
        payload: result,
      })
    }
  })
}

const getPlaylistVideo = (playlist, index) => dispatch => {
  return Mola.getHomeVideo({ id: playlist.id }).then(result => {
    const results = {
      meta: {
        status: result.meta.status,
        id: playlist.id,
        sortOrder: index,
        seasonNumber: playlist.seasonNumber ? playlist.seasonNumber : '',
      },
      data: result.data,
    }
    dispatch({
      type: types.GET_PLAYLIST_VIDEO,
      payload: results,
    })
  })
}

// const getPlaylistVideo = playlistId => dispatch => {
//   return Mola.getPlaylistVideo(playlistId).then(result => {
//     if (result.meta.status === 'error') {
//       dispatch({
//         type: types.GET_VIDEO_ERROR,
//         payload: {
//           meta: {
//             status: 'error',
//             error: 'Error: get playlist failed',
//           },
//           data: [],
//         },
//       })
//     } else {
//       const results = {
//         meta: {
//           status: result.meta.status,
//           id: playlistId,
//           sortOrder,
//         },
//         data: result.data,
//       }
//       dispatch({
//         type: types.GET_PLAYLIST_VIDEO,
//         payload: results,
//       })
//     }
//   })
// }

export default {
  getPlaylist,
  getPlaylistVideo,
}
