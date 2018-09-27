import dummyFigure from '@global/style/icons/bruce.png';
import dummyBg from '@global/style/icons/background.png';

const normalizeHomePlaylist = (response) => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map(({ attributes: { playlists } }) =>
      playlists.map((playlist) => {
        const {
          id,
          type,
          attributes: {
            title,
            description,
            shortDescription,
            sortOrder,
            cover: {
              layer1,
              layer2,
              layer3,
              isDark,
            },
          },
        } = playlist
        return {
          id,
          title,
          sortOrder,
          description,
          shortDescription: shortDescription || '',
          layer3: layer3 || '',
          layer2: layer2 || dummyFigure,
          layer1: layer1 || dummyBg,
          isDark: isDark || 0,
          isActive: false,
          type,
        }
      }).sort((a, b) => a.sortOrder - b.sortOrder)
    )
  }
  return []
}

const normalizeHomeVideo = (response) => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map(({ attributes: { videos } }) =>
      videos.map((video) => {
        const {
          id,
          type,
          attributes: {
            title,
            description,
            shortDescription,
            displayOrder,
            layer3,
            layer2,
            layer1,
            isDark,
          },
        } = video
        return {
          id,
          title,
          displayOrder,
          description,
          shortDescription,
          layer3: layer3 || '',
          layer2: layer2 || dummyFigure,
          layer1: layer1 || dummyBg,
          isDark: isDark || 0,
          type,
        }
      }).sort((a, b) => a.displayOrder - b.displayOrder)
    )
  }
  return []
}

const normalizeHistory = (response) => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map( (movieHistory) => {
      const historyId = movieHistory.id;
      const attr = movieHistory.attributes;
      const timePosition = attr.timePosition;
      const videoId = attr.videoId;
      return attr.videos.map( ({ attributes }) => {
        const {
          title,
          coverUrl,
          duration,
          chapter,
          thumbnail
        } = attributes

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

const normalizeSearchResult = (response) => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map((result) => {
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
      return {
        id,
        type,
        title,
        year,
        coverUrl
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

const normalizeSearchGenre = (response) => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map(({ attributes: { playlists } }) =>
      playlists.map(({ id, attributes } )=> {
        const {
          title,
          iconUrl,
        } = attributes;
        return {
          id,
          title,
          iconUrl
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

const normalizeVideoDetail = (response) => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map((result) => {
      const {
        id,
        attributes: {
          title,
          coverUrl,
          quotes,
          trailers,
          shortDescription,
          people,
          isDark
        },
      } = result
      return {
        id,
        title,
        coverUrl,
        quotes,
        trailers,
        shortDescription,
        people,
        isDark
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

const normalizeMovieLibrary = (response) => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map(({ attributes: { videos, title: genreTitle } }) =>
      videos.map(({ id, attributes } )=> {
        const {
          title,
          thumbnail,
          coverUrl
        } = attributes;
        return {
          genreTitle,
          id,
          title,
          thumbnail: thumbnail || coverUrl
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

const normalizeVideoStream = (response) => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map((result) => {
      const {
        id,
        attributes: {
          streamSourceUrl
        },
      } = result
      return {
        id,
        streamSourceUrl
      }
    })
  }
  return [];
}

const normalizeAuth = response => {
  const { data: { access_token: token, expires_in: expire, token_type: type, refresh_token: refreshToken = '' } } = response;
  return {
    token,
    refreshToken,
    expire,
    type,
  }
}

const normalizeUserInfo = response => {
  const { data: { user_id: id, first_name: firstName, last_name: lastName, email } } = response;
  return {
    id,
    firstName,
    lastName,
    email
  }
}

export default {
  normalizeHomePlaylist,
  normalizeHomeVideo,
  normalizeHistory,
  normalizeSearchResult,
  normalizeAuth,
  normalizeUserInfo,
  normalizeSearchGenre,
  normalizeVideoDetail,
  normalizeMovieLibrary,
  normalizeVideoStream
}
