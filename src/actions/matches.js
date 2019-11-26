/* eslint-disable import/prefer-default-export */
import Mola from '@api/mola'
import types from '../constants'

import { formatDateTime, addDateTime, isMatchLive } from '@source/lib/dateTimeUtil'

const getLeaguesAndMatch = (id, startDate, endDate) => dispatch => {
  dispatch({
    type: types.GET_MATCHES_GENRESPO_LOADING,
    payload: {
      leagueList: {
        meta: {
          status: 'loading',
          error: '',
        },
        data: [],
      },
    },
  })
  return Mola.getLeaguesList(id, startDate, endDate).then(async result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_MATCHES_GENRESPO_ERROR,
        payload: {
          leagueList: { ...result },
        },
      })
    } else {
      //current default is league-epl
      let genrePlaylistId = 'ids=league-epl'
      // result.data = result.data.filter((dt, idx) => {
      //   // genrePlaylistId.push(dt.id)
      //   if (result && result.data.length > 0) {
      //     if (idx === result.data.length - 1) {
      //       genrePlaylistId += 'ids=' + dt.id
      //     } else {
      //       genrePlaylistId += 'ids=' + dt.id + '&'
      //     }
      //   }
      //   return dt.visibility === 1
      // })
      const genreSportList = {
        leagueList: {
          meta: { ...result.meta },
          data: result.data,
        },
      }
      let matchesPlaylists = []
      matchesPlaylists = await Mola.getMatchesPlaylists(genrePlaylistId, startDate, endDate)

      if (matchesPlaylists.meta.status === 'success') {
        let hasLive = false
        if (result.data.length > 0) {
          const videos = matchesPlaylists.data[0].videos
          videos.map(matchDt => {
            if (!hasLive) {
              hasLive = isMatchLive(matchDt.startTime, matchDt.endTime)
            }
          })
        }
        matchesPlaylists.hasLive = hasLive
        const matchesList = {
          matchesPlaylists,
        }
        dispatch({
          type: types.GET_MATCHES_GENRESPO_SUCCESS,
          payload: { ...genreSportList, ...matchesList },
        })
      } else {
        const matchesList = {
          matchesPlaylists,
        }
        dispatch({
          type: types.GET_MATCHES_GENRESPO_ERROR,
          payload: { ...genreSportList, ...matchesList },
        })
      }
    }
  })
}

const getMatchesPlaylists = (id, startDate, endDate) => dispatch => {
  dispatch({
    type: types.GET_MATCHES_PLAYLIST_LOADING,
    payload: {
      matchesPlaylists: {
        meta: {
          status: 'loading',
          error: '',
        },
        data: [],
      },
    },
  })
  const genrePlaylistId = 'ids=' + id
  return Mola.getMatchesPlaylists(genrePlaylistId, startDate, endDate).then(result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_MATCHES_PLAYLIST_ERROR,
        payload: {
          matchesPlaylists: {
            ...result,
          },
        },
      })
    } else {
      let hasLive = false
      if (result.data.length > 0) {
        const videos = result.data[0].videos
        videos.map(matchDt => {
          if (!hasLive) {
            hasLive = isMatchLive(matchDt.startTime, matchDt.endTime)
          }
        })
      }

      dispatch({
        type: types.GET_MATCHES_PLAYLIST_SUCCESS,
        payload: {
          matchesPlaylists: {
            hasLive: hasLive,
            ...result,
          },
        },
      })
    }
  })
}

export default {
  getLeaguesAndMatch,
  getMatchesPlaylists,
}
