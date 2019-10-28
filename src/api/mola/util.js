import _get from 'lodash/get'
import moment from 'moment'

const normalizeHomePlaylist = response => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map(
      ({ attributes: { playlists } }) =>
        playlists &&
        playlists.map((playlist, index) => {
          const {
            id,
            type,
            attributes: {
              title,
              description,
              shortDescription,
              visibility,
              startTime,
              endTime,
              iconUrl,
              isDark,
              images,
              iconWebp,
              viewMorePortrait,
              viewMoreLandscape,
              viewMorePortraitWebp,
              viewMoreLandscapeWebp,
            },
          } = playlist
          const background = _get(images, 'cover', { portrait: null, landscape: null })
          const thumbnailImg = _get(images, 'thumbnails.cover', '')
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
            iconWebp: iconWebp || '',
            viewMorePortrait: viewMorePortrait || '',
            viewMoreLandscape: viewMoreLandscape || '',
            viewMorePortraitWebp: viewMorePortraitWebp || '',
            viewMoreLandscapeWebp: viewMoreLandscapeWebp || '',
            // coverTitle: coverTitle,
            background,
            thumbnailImg,
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
            const {
              id,
              type,
              attributes: {
                title,
                description,
                shortDescription,
                sortOrder,
                startTime,
                endTime,
                iconUrl,
                isDark,
                images,
                league,
              },
            } = video
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
const normalizeMatchPlaylists = response => {
  const { data } = response.data
  if (data && data.length > 0) {
    let videoData = []
    let Obj = []
    const playlistData = data.map(({ id, attributes: { title, videos, images } }) => {
      const thumbnails = _get(images, 'thumbnails.cover', '')
      videoData =
        videos &&
        videos.map(video => {
          const { id, attributes: { title, type, startTime, endTime, homeTeam, awayTeam } } = video
          return {
            id,
            type,
            title,
            startTime,
            endTime,
            homeTeam,
            awayTeam,
            iconPlaylistUrl: thumbnails,
          }
        })

      if (videoData && videoData.length > 0) {
        return {
          id,
          title,
          thumbnails,
          videos: videoData,
        }
      }
    })
    for (let i = 0; i < playlistData.length; i++) {
      if (playlistData[i] !== undefined && playlistData[i] !== null) {
        let playlistsTemp = playlistData[i]
        Obj.push(playlistsTemp)
      }
    }
    return Obj
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
          // description,
          streamSourceUrl,
          permission,
          platforms,
          // subtitles,
          // shortDescription,
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
        // description,
        streamSourceUrl,
        permission,
        platforms,
        // subtitles,
        // shortDescription,
        displayOrder,
        isDark,
        isHighlight,
        startTime,
        endTime,
        platforms,
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
            const {
              id,
              type,
              attributes: {
                title,
                description,
                contentType,
                visibility,
                shortDescription,
                displayOrder,
                isDark,
                images,
                quotes: quoteLists,
                startTime,
                endTime,
                homeTeamId,
                awayTeamId,
                seasonNumber,
                permission,
              },
            } = video
            const background = _get(images, 'cover', { portrait: null, landscape: null })
            const coverBGColor = _get(images, 'cover.backgroundColor', '')
            // dummyQuote = {
            //   attributes: {
            //     author: 'Coming Soon',
            //     imageUrl: '',
            //     role: 'Media',
            //     text: title,
            //   },
            //   id: 1,
            //   type: 'quotes',
            // }
            return {
              id,
              title,
              displayOrder,
              description,
              visibility,
              seasonNumber,
              contentType,
              permission,
              shortDescription: shortDescription || description,
              // coverTitle: coverTitle,
              background,
              backgroundColor: coverBGColor || '#000622',
              isDark: isDark || 0,
              startTime,
              endTime,
              quotes: quoteLists.length > 0 ? quoteLists[0] : null,
              type,
              homeTeamId,
              awayTeamId,
            }
          })
        // .sort((a, b) => a.displayOrder - b.displayOrder)
      )
      return result
    } catch (err) {}
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
        attributes: {
          ads,
          title,
          images,
          quotes,
          drm,
          trailers,
          description,
          source,
          streamSourceUrl,
          suitableAge,
          releaseDate,
          subtitles,
          people,
          permission,
          platforms,
          genre,
          isDark,
          homeTeam,
          awayTeam,
          league,
          year,
          duration,
          startTime,
          endTime,
          contentType,
          menuId,
          playlists,
        },
      } = result
      const background = _get(images, 'cover', { portrait: null, landscape: null })
      return {
        ads,
        id,
        title,
        quotes,
        trailers,
        description,
        source,
        permission,
        streamSourceUrl,
        drm,
        suitableAge,
        releaseDate,
        subtitles,
        people,
        genre,
        isDark,
        homeTeam,
        awayTeam,
        league,
        permission,
        platforms,
        year,
        duration,
        background,
        startTime,
        endTime,
        contentType,
        menuId,
        playlists,
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
        const { id, type, attributes: { name, description, imageUrl, buttonText, link, isDark = 0 } } = banner

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
          isDark,
        }
      })
    )
    return result
  }
  return []
}

const normalizeChannelPlaylist = response => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map(
      ({ attributes: { playlists } }) =>
        playlists &&
        playlists.map((playlist, index) => {
          const {
            id,
            type,
            attributes: {
              title,
              description,
              shortDescription,
              visibility,
              startTime,
              endTime,
              iconUrl,
              isDark,
              images,
            },
          } = playlist
          const background = _get(images, 'cover', { portrait: null, landscape: null })
          const coverBGColor = _get(images, 'cover.backgroundColor', '')
          const thumbnailImg = _get(images, 'thumbnails.cover', '')
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
            thumbnailImg,
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

const normalizeProgrammeGuides = response => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map(result => {
      const {
        id,
        attributes: {
          start,
          end,
          title,
          description,
          playlist: {
            id: playlistId,
            attributes: { parentId, images: playlistImages, isFree, country, sortOrder, visibility, seo: playlistSeo },
          },
          video: {
            id: videoId,
            attributes: {
              drm,
              images: videoImage,
              title: videoTtile,
              subtitles,
              displayOrder,
              seo: videoSeo,
              endTime,
              startTime,
            },
          },
        },
        type,
      } = result

      return {
        id,
        start, // parse to WIB
        end, // parse to WIB
        startTime: moment(start).unix(), // parse to WIB
        endTime: moment(end).unix(), // parse to WIB
        href: `/movie-detail/${videoId}`,
        title,
        description,
        playlist: {
          id: playlistId,
          attributes: {
            parentId,
            images: playlistImages,
            isFree,
            country,
            sortOrder,
            visibility,
            seo: playlistSeo,
          },
        },
        video: {
          id: videoId,
          attributes: {
            drm,
            images: videoImage,
            title: videoTtile,
            subtitles,
            displayOrder,
            seo: videoSeo,
            endTime,
            startTime,
          },
        },
        type,
      }
    })
  }
  return []
}

const normalizeRecommendation = response => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map(dt => {
      const { title, shortDescription, images } = dt.attributes
      const background = _get(images, 'cover', { portrait: null, landscape: null })
      return {
        video_id: dt.id,
        title,
        short_description: shortDescription,
        cover_portrait: background.portrait,
        cover_landscape: background.landscape,
        ...dt.attributes,
      }
    })
  }
  return []
}

const normalizeNotifications = response => {
  const { data } = response.data
  // const { notifications } = data
  if (data && data.length > 0) {
    // const { total } = data
    const result = data.map(notification => {
      const {
        id,
        type,
        attributes: {
          imageUrl,
          linkUrl,
          title,
          message,
          status,
          projectId,
          refId,
          startTime,
          endTime,
          createdAt,
          updatedAt,
        },
      } = notification
      return {
        id,
        type,
        imageUrl,
        linkUrl,
        title,
        message,
        status,
        projectId,
        refId,
        startTime,
        endTime,
        createdAt,
        updatedAt,
      }
    })
    return result
  }
  return []
}

const normalizePartners = response => {
  const { data } = response.data
  if (data && data.length > 0) {
    return data.map(({ id, type, attributes: { name, url, order, createdAt } }) => {
      return {
        id,
        type,
        name,
        url,
        order,
        createdAt,
      }
    })
  }
  return []
}

const normalizeArticles = response => {
  const { data } = response.data
  if (data) {
    const { id, type } = data
    const {
      title,
      author,
      imageUrl,
      imageCaption,
      summary,
      content,
      tags,
      video,
      metaDescription,
      updatedAt,
      menuId,
      relatedVideos,
    } = data.attributes
    return {
      id,
      type,
      title,
      author,
      imageUrl,
      imageCaption,
      summary,
      content,
      tags,
      video,
      metaDescription,
      updatedAt,
      menuId,
      relatedVideos,
    }
  }
  return []
  // console.log(response, 'mau di normalize')
}

const normalizeArticlesRelated = response => {
  const { data } = response.data
  const articles = data.attributes.articles
  if (articles && articles.length > 0) {
    return articles.map(({ id, attributes: { updatedAt, title, imageUrl } }) => {
      return {
        id,
        updatedAt,
        title,
        imageUrl,
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
  normalizeRecentSearch,
  normalizeVideoDetail,
  normalizeFeatureBanner,
  normalizeMatchesList,
  normalizeMatchDetail,
  normalizeChannelPlaylist,
  normalizeProgrammeGuides,
  normalizeRecommendation,
  normalizeMatchPlaylists,
  normalizeNotifications,
  normalizePartners,
  normalizeArticles,
  normalizeArticlesRelated,
}
