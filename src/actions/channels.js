import moment from 'moment'
import types from '../constants'
import Mola from '@api/mola'

const getChannelsPlaylist = id => dispatch => {
  dispatch({
    type: types.GET_CHANNELS_PLAYLIST_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: '',
      },
      data: [],
    },
  })

  return Mola.getChannelsList(id).then(result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_CHANNELS_PLAYLIST_ERROR,
        payload: result,
      })
    } else {
      dispatch({
        type: types.GET_CHANNELS_PLAYLIST_SUCCESS,
        payload: result,
      })
    }
  })
}

const getProgrammeGuides = selectedDate => async (dispatch, getState) => {
  const { channelsPlaylist } = getState()
  let yesterdayDate = new Date()
  yesterdayDate = moment(selectedDate.fullDate).subtract(1, 'days')
  yesterdayDate = moment(yesterdayDate).format('YYYYMMDD')

  dispatch({
    type: types.GET_PROGRAMME_GUIDES_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: '',
      },
      data: [],
    },
  })

  if (channelsPlaylist.meta.status === 'success') {
    await Promise.all(
      channelsPlaylist.data.map(async playlist => {
        const yesterdayProgramme = await Mola.getProgrammeGuides(yesterdayDate, playlist.id)
        const todayProgramme = await Mola.getProgrammeGuides(selectedDate.fullDate, playlist.id)
        if (yesterdayProgramme.meta.status === 'error' && todayProgramme.meta.status === 'error') {
          dispatch({
            type: types.GET_PROGRAMME_GUIDES_ERROR,
          })
        } else {
          const result = {
            meta: { status: 'success', error: '' },
            data: [...yesterdayProgramme.data, ...todayProgramme.data],
            playlistId: playlist.id,
            playlistTitle: playlist.title,
          }
          dispatch({
            type: types.GET_PROGRAMME_GUIDES_SUCCESS,
            payload: result,
          })
        }
      })
    )
  }
}

export default {
  getChannelsPlaylist,
  getProgrammeGuides,
}
