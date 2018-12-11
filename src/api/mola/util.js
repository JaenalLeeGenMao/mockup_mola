import _get from 'lodash/get'
import _sample from 'lodash/sample'

const normalizeHomePlaylist = response => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map(({ attributes: { playlists } }) =>
      playlists
        .map(playlist => {
          const {
            id,
            type,
            attributes: {
              title,
              description,
              shortDescription,
              sortOrder,
              iconUrl,
              isDark,
              images: {
                cover: {
                  // title: coverTitle,
                  background,
                  details,
                  backgroundColor: coverBGColor,
                },
              },
            },
          } = playlist
          return {
            id,
            title,
            sortOrder,
            description,
            shortDescription: shortDescription || '',
            iconUrl: iconUrl || '',
            // coverTitle: coverTitle,
            background,
            backgroundColor: coverBGColor || '#000622',
            details,
            isDark: isDark || 0,
            isActive: false,
            type,
          }
        })
        .sort((a, b) => a.sortOrder - b.sortOrder)
    )
  }
  return []
}

const normalizeHomeVideo = response => {
  const { data } = response.data
  if (data && data.length > 0) {
    const result = data.map(({ attributes: { videos } }) =>
      videos
        .map(video => {
          const {
              id,
              type,
              attributes: {
                title,
                description,
                shortDescription,
                displayOrder,
                isDark,
                images: {
                  cover: {
                    // title: coverTitle,
                    details,
                    background,
                    backgroundColor: coverBGColor,
                  },
                },
                quotes: quoteLists,
              },
            } = video,
            dummyQuote = {
              attributes: {
                author: 'Comming Soon',
                imageUrl: '',
                role: 'Media',
                text: title,
              },
              id: 1,
              type: 'quotes',
            }
          return {
            id,
            title,
            displayOrder,
            description,
            shortDescription: shortDescription || '',
            // coverTitle: coverTitle,
            background,
            backgroundColor: coverBGColor || '#000622',
            details,
            isDark: isDark || 0,
            quotes: quoteLists.length > 0 ? quoteLists[0] : dummyQuote,
            type,
          }
        })
        .sort((a, b) => a.displayOrder - b.displayOrder)
    )
    return result
  }
  return []
}

const normalizeHistory = response => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map(movieHistory => {
      const historyId = movieHistory.id
      const attr = movieHistory.attributes
      const timePosition = attr.timePosition
      const videoId = attr.videoId
      return attr.videos.map(({ attributes }) => {
        const { title, coverUrl, duration, chapter, thumbnail } = attributes

        return {
          historyId,
          videoId,
          timePosition,
          title,
          chapter: chapter,
          thumbnail: thumbnail ? thumbnail[0] : coverUrl,
          duration: duration || 0,
        }
      })
    })
  }
  return {
    meta: {
      status: 'no_result',
    },
    data: [],
  }
}

const normalizeSearchResult = response => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map(result => {
      const {
        id,
        type,
        attributes: {
          title,
          year,
          // thumbnail,
          coverUrl,
          name,
          imageUrl,
        },
      } = result

      if (type == 'videos') {
        return {
          id,
          type,
          title,
          year,
          coverUrl,
        }
      } else {
        return {
          id,
          type,
          name,
          imageUrl,
        }
      }
    })
  }
  return []
}

const normalizeSearchGenre = response => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map(({ attributes: { playlists } }) =>
      playlists.map(({ id, attributes }) => {
        const { title, iconUrl } = attributes
        return {
          id,
          title,
          iconUrl,
        }
      })
    )
  }
  return []
}

const normalizeRecentSearch = response => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map(({ id, attributes: { keyword } }) => {
      return {
        id,
        keyword,
      }
    })
  }
  return []
}

const normalizeVideoDetail = response => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map(result => {
      const { id, attributes: { title, images, quotes, trailers, description, source, streamSourceUrl, subtitles, people, isDark, year, duration } } = result
      return {
        id,
        title,
        quotes,
        trailers,
        description,
        source,
        streamSourceUrl,
        subtitles,
        people,
        isDark,
        year,
        duration,
        images,
      }
    })
  }
  return {
    meta: {
      status: 'no_result',
    },
    data: [],
  }
}

const normalizeMovieLibrary = response => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map(({ attributes: { videos, title: genreTitle } }) =>
      videos.map(({ id, attributes }) => {
        const { title } = attributes
        const thumbnail = _get(attributes, 'images.cover.library.desktop.portrait', '')

        return {
          genreTitle,
          id,
          title,
          thumbnail,
        }
      })
    )
  }
  return {
    meta: {
      status: 'no_result',
    },
    data: [],
  }
}

const normalizeMovieLibraryList = response => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map(({ id, type, attributes: { title: genreTitle, description: videoDesc, images: videoImg } }) => {
      return {
        id,
        type,
        genreTitle,
        videoDesc,
        thumbnail: videoImg.cover.library.desktop.portrait,
      }
    })
  }
  return {
    meta: {
      status: 'no_result',
    },
    data: [],
  }
}

const normalizeVideoStream = response => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map(result => {
      const { id, attributes: { streamSourceUrl, subtitles } } = result
      return {
        id,
        streamSourceUrl,
        subtitles,
      }
    })
  }
  return []
}

export default {
  normalizeHomePlaylist,
  normalizeHomeVideo,
  normalizeHistory,
  normalizeSearchResult,
  normalizeSearchGenre,
  normalizeRecentSearch,
  normalizeVideoDetail,
  normalizeMovieLibrary,
  normalizeMovieLibraryList,
  normalizeVideoStream,
}
