/* eslint-disable import/prefer-default-export */
import Mola from '@api/mola'
import types from '../constants'

const getLeaguesAndMatch = (id, startDate, endDate) => dispatch => {
  dispatch({
    type: types.GET_MATCHES_GENRESPO_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: '',
      },
      data: [],
    },
  })
  return Mola.getLeaguesList(id, startDate, endDate).then(async result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_MATCHES_GENRESPO_ERROR,
        payload: result,
      })
    } else {
      let genrePlaylistId = ''
      result.data = result.data.filter((dt, idx) => {
        // genrePlaylistId.push(dt.id)
        if (result && result.data.length > 0) {
          if (idx === result.data.length - 1) {
            genrePlaylistId += 'ids=' + dt.id
          } else {
            genrePlaylistId += 'ids=' + dt.id + '&'
          }
        }
        return dt.visibility === 1
      })
      const genreSportList = {
        genreSpo: result.data,
      }
      // console.log('genre', genreSportList)
      let matchesPlaylists = []
      matchesPlaylists = await Mola.getMatchesPlaylists(genrePlaylistId, startDate, endDate)
      // console.log('see matchesPlaylist', matchesPlaylists)
      const matchesList = {
        matchesPlaylists,
      }
      // console.log('see matchesList', matchesList)
      if (matchesPlaylists.meta.status === 'success') {
        dispatch({
          type: types.GET_MATCHES_GENRESPO_SUCCESS,
          payload: { ...genreSportList, ...matchesList },
        })
      } else {
        dispatch({
          type: types.GET_MATCHES_GENRESPO_ERROR,
          payload: { ...genreSportList, ...matchesList },
        })
      }
    }
  })
}

export default {
  getLeaguesAndMatch,
}
