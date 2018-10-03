import dummyBg from '@global/style/icons/dummybg.jpg';

const normalizeHomePlaylist = response => {
  const { data } = response.data;
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
                  title: coverTitle,
                  body: coverBody,
                  background: coverBG,
                  backgroundColor: coverBGColor,
                  backgroundRepeat,
                  poster
                },
                large,
                big,
                medium,
                small,
                tiny
              }
            }
          } = playlist;
          return {
            id,
            title,
            sortOrder,
            description,
            shortDescription: shortDescription || '',
            iconUrl: iconUrl || '',
            poster: poster || '',
            coverTitle: coverTitle || '',
            coverBody: coverBody || '',
            background: coverBG || dummyBg,
            backgroundColor: coverBGColor || '#000622',
            backgroundRepeat: backgroundRepeat || '',
            isDark: isDark || 0,
            isActive: false,
            type
          };
        })
        .sort((a, b) => a.sortOrder - b.sortOrder)
    );
  }
  return [];
};

const normalizeHomeVideo = response => {
  const { data } = response.data;
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
                  title: coverTitle,
                  body: coverBody,
                  background: coverBG,
                  backgroundColor: coverBGColor,
                  backgroundRepeat,
                  poster
                },
                large,
                big,
                medium,
                small,
                tiny
              }
            }
          } = video;
          return {
            id,
            title,
            displayOrder,
            description,
            shortDescription: shortDescription || '',
            poster: poster || '',
            coverTitle: coverTitle || '',
            coverBody: coverBody || '',
            background: coverBG || dummyBg,
            backgroundColor: coverBGColor || '#000622',
            backgroundRepeat: backgroundRepeat || '',
            isDark: isDark || 0,
            type
          };
        })
        .sort((a, b) => a.displayOrder - b.displayOrder)
    );
    return result;
  }
  return [];
};

const normalizeHistory = response => {
  const { data } = response.data;
  if (data && data.length > 0) {
    return data.map(movieHistory => {
      const historyId = movieHistory.id;
      const attr = movieHistory.attributes;
      const timePosition = attr.timePosition;
      const videoId = attr.videoId;
      return attr.videos.map(({ attributes }) => {
        const { title, coverUrl, duration, chapter, thumbnail } = attributes;

        return {
          historyId,
          videoId,
          timePosition,
          title,
          chapter: chapter,
          thumbnail: thumbnail ? thumbnail[0] : coverUrl,
          duration: duration || 0
        };
      });
    });
  }
  return {
    meta: {
      status: 'no_result'
    },
    data: []
  };
};

const normalizeSearchResult = response => {
  const { data } = response.data;
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
          imageUrl
        }
      } = result;

      if (type == 'videos') {
        return {
          id,
          type,
          title,
          year,
          coverUrl
        };
      } else {
        return {
          id,
          type,
          name,
          imageUrl
        };
      }
    });
  }
  return [];
};

const normalizeSearchGenre = response => {
  const { data } = response.data;
  if (data && data.length > 0) {
    return data.map(({ attributes: { playlists } }) =>
      playlists.map(({ id, attributes }) => {
        const { title, iconUrl } = attributes;
        return {
          id,
          title,
          iconUrl
        };
      })
    );
  }
  return {
    meta: {
      status: 'no_result'
    },
    data: []
  };
};

const normalizeRecentSearch = response => {
  const { data } = response.data;
  if (data && data.length > 0) {
    return data.map(({ id, attributes: { keyword } }) => {
      return {
        id,
        keyword
      };
    });
  }
  return {
    meta: {
      status: 'no_result'
    },
    data: []
  };
};

const normalizeVideoDetail = response => {
  const { data } = response.data;
  if (data && data.length > 0) {
    return data.map(result => {
      const {
        id,
        attributes: {
          title,
          playlists,
          images,
          quotes,
          trailers,
          shortDescription,
          people,
          isDark,
          year
        }
      } = result;
      return {
        id,
        title,
        playlists,
        quotes,
        trailers,
        shortDescription,
        people,
        isDark,
        year,
        images
      };
    });
  }
  return {
    meta: {
      status: 'no_result'
    },
    data: []
  };
};

const normalizeMovieLibrary = response => {
  const { data } = response.data;
  if (data && data.length > 0) {
    return data.map(({ attributes: { videos, title: genreTitle } }) =>
      videos.map(({ id, attributes }) => {
        const { title, thumbnail, coverUrl } = attributes;
        return {
          genreTitle,
          id,
          title,
          thumbnail: thumbnail || coverUrl
        };
      })
    );
  }
  return {
    meta: {
      status: 'no_result'
    },
    data: []
  };
};

const normalizeVideoStream = response => {
  const { data } = response.data;
  if (data && data.length > 0) {
    return data.map(result => {
      const {
        id,
        attributes: { streamSourceUrl }
      } = result;
      return {
        id,
        streamSourceUrl
      };
    });
  }
  return [];
};

export default {
  normalizeHomePlaylist,
  normalizeHomeVideo,
  normalizeHistory,
  normalizeSearchResult,
  normalizeSearchGenre,
  normalizeRecentSearch,
  normalizeVideoDetail,
  normalizeMovieLibrary,
  normalizeVideoStream
};
