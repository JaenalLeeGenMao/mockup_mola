import _get from 'lodash/get'

const normalizeHomePlaylist = response => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map(
      ({ attributes: { playlists } }) =>
        playlists &&
        playlists.map((playlist, index) => {
          const { id, type, attributes: { title, description, shortDescription, visibility, startTime, endTime, iconUrl, isDark, images } } = playlist
          const background = _get(images, 'cover', { portrait: null, landscape: null })
          const coverBGColor = _get(images, 'cover.backgroundColor', '')
          return {
            id,
            title,
            visibility,
            sortOrder: index + 1,
            startTime,
            endTime,
            description,
            shortDescription: shortDescription || '',
            iconUrl: iconUrl || '',
            // coverTitle: coverTitle,
            background,
            backgroundColor: coverBGColor || '#000622',
            isDark: isDark || 0,
            isActive: false,
            type,
          }
        })
      // .sort((a, b) => a.sortOrder - b.sortOrder)
    )
  }
  return []
}

const normalizeMatchesList = response => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map(
      ({ attributes: { videos } }) =>
        videos &&
        videos
          .map(video => {
            const { id, type, attributes: { title, description, shortDescription, sortOrder, startTime, endTime, iconUrl, isDark, images, league } } = video
            const background = _get(images, 'cover', { portrait: null, landscape: null })
            const coverBGColor = _get(images, 'cover.backgroundColor', '')
            return {
              id,
              title,
              sortOrder,
              startTime,
              endTime,
              description,
              league,
              shortDescription: shortDescription || '',
              iconUrl: iconUrl || '',
              // coverTitle: coverTitle,
              background,
              backgroundColor: coverBGColor || '#000622',
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

const normalizeMatchDetail = response => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map(result => {
      const {
        id,
        type,
        attributes: {
          title,
          homeTeam,
          awayTeam,
          league,
          description,
          streamSourceUrl,
          // permission,
          // subtitles,
          shortDescription,
          displayOrder,
          isDark,
          isHighlight,
          startTime,
          endTime,
          images,
        },
      } = result
      const coverBG = _get(images, 'cover', '')
      const coverBGColor = _get(images, 'cover.backgroundColor', '')
      return {
        id,
        type,
        title,
        description,
        streamSourceUrl,
        // permission,
        // subtitles,
        shortDescription,
        displayOrder,
        isDark,
        isHighlight,
        startTime,
        endTime,
        shortDescription: shortDescription || '',
        background: coverBG,
        backgroundColor: coverBGColor || '#000622',
        isDark: isDark || 0,
        league: league
          ? {
            id: league.id,
            name: league.attributes.name,
            iconUrl: league.attributes.iconUrl,
          }
          : null,
        homeTeam: homeTeam && homeTeam.length > 0 ? { id: homeTeam[0].id, ...homeTeam[0].attributes } : null,
        awayTeam: awayTeam && awayTeam.length > 0 ? { id: awayTeam[0].id, ...awayTeam[0].attributes } : null,
      }
    })
  }
  return []
}

const normalizeHomeVideo = response => {
  const { data } = response.data
  if (data && data.length > 0) {
    try {
      const result = data.map(
        ({ attributes: { videos } }) =>
          videos.map(video => {
            const { id, type, attributes: { title, description, contentType, visibility, shortDescription, displayOrder, isDark, images, quotes: quoteLists, startTime, endTime } } = video
            const background = _get(images, 'cover', { portrait: null, landscape: null })
            const coverBGColor = _get(images, 'cover.backgroundColor', ''),
              dummyQuote = {
                attributes: {
                  author: 'Coming Soon',
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
              visibility,
              contentType,
              shortDescription: shortDescription || description,
              // coverTitle: coverTitle,
              background,
              backgroundColor: coverBGColor || '#000622',
              isDark: isDark || 0,
              startTime,
              endTime,
              quotes: quoteLists.length > 0 ? quoteLists[0] : dummyQuote,
              type,
            }
          })
        // .sort((a, b) => a.displayOrder - b.displayOrder)
      )
      return result
    } catch (err) {
    }
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
          title,
          coverUrl,
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
        const { title, iconUrl, visibility } = attributes
        return {
          id,
          title,
          iconUrl,
          visibility,
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
      const {
        id,
        attributes: { title, images, quotes, drm, trailers, description, source, streamSourceUrl, suitableAge, releaseDate, subtitles, people, genre, isDark, year, duration, startTime, endTime, contentType },
      } = result
      const background = _get(images, 'cover', { portrait: null, landscape: null })
      return {
        id,
        title,
        quotes,
        trailers,
        description,
        source,
        streamSourceUrl,
        drm,
        suitableAge,
        releaseDate,
        subtitles,
        people,
        genre,
        isDark,
        year,
        duration,
        background,
        startTime,
        endTime,
        contentType,
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
  let result
  if (data && data.length > 0) {
    result = data.map(({ attributes: { videos, title: genreTitle, visibility: vis } }) => {
      if (vis === 1) {
        return videos.map(({ id, attributes }) => {
          const { title, visibility } = attributes
          const thumbnail = _get(attributes, 'images.cover.portrait', '')
          const description = _get(attributes, 'description', '')
          const quotes = _get(attributes, 'quotes[0].attributes', '')
          const isDark = _get(attributes, 'isDark', '0')

          return {
            genreTitle,
            id,
            title,
            visibility,
            thumbnail,
            description,
            quotes,
            isDark,
          }
        })
      } else {
        return {
          meta: {
            status: 'no_result',
          },
          data: [],
        }
      }
    })
  }
  return result[0]
}

const normalizeMovieLibraryList = response => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map(({ id, type, attributes: { title: genreTitle, visibility, description: videoDesc, images: videoImg } }) => {
      return {
        id,
        visibility,
        type,
        genreTitle,
        videoDesc,
        thumbnail: videoImg.cover.library.portrait,
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

const normalizeFeatureBanner = response => {
  const { data } = response.data
  if (data && data.length > 0) {
    const result = data.map(({ attributes: { banners } }) =>
      banners.map(banner => {
        const { id, type, attributes: { name, description, imageUrl, buttonText, link } } = banner

        return {
          id,
          type,
          title: name,
          description,
          background: {
            landscape: imageUrl,
            portrait: imageUrl,
          },
          buttonText,
          link,
        }
      })
    )
    return result
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
  normalizeFeatureBanner,
  normalizeMatchesList,
  normalizeMatchDetail,
}
