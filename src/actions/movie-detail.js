import Mola from '../api/mola'
import types from '../constants'

export const getMovieDetail = id => dispatch => {
  dispatch({
    type: types.GET_MOVIE_DETAIL_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: '',
      },
      data: [],
    },
  })
  return Mola.getMovieDetail({ id }).then(async result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_MOVIE_DETAIL_ERROR,
        payload: result,
      })
    } else {
      // console.log("check", result.data)
      if (result.data && result.data.length > 0) {
        const resDataPlaylist = result.data[0].playlists
        if (resDataPlaylist && resDataPlaylist.length > 0) {
          const validPlaylist = resDataPlaylist.filter((playlists) => {
            return playlists.attributes.contentType !== 88
          })

          if (validPlaylist.length > 0) {
            const videos = await Mola.getHomeVideo({ id: validPlaylist[0].id }) //selalu ambil array ke 0
            let nextVideos = []
            if (videos.data && videos.data.length > 0) {
              // console.log("videos AAA", videos)
              let currentIndex = -1
              videos.data.map((vid, index) => {
                // console.log("videoId", result.data[0].id, vid.id, index)
                if (vid.id === result.data[0].id) {
                  currentIndex = index
                }

                // console.log("currentIndex", currentIndex)
                if (currentIndex > -1 && index > currentIndex) {
                  // console.log("masukkk siniii")
                  nextVideos.push(vid)
                }
              })

              // console.log("nextVideos", nextVideos)
              if (nextVideos.length === 0) {
                //manggil api recom
              }
              result.data[0].upcomingVideos = nextVideos
              // validPlaylist[0].attributes.videos = videos.data
              // result.data[0].relPlaylists = validPlaylist
            }
          }
        }
      }
      dispatch({
        type: types.GET_MOVIE_DETAIL_SUCCESS,
        payload: result,
      })
    }
  })
}
