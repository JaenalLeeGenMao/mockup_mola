/* eslint-disable import/prefer-default-export */
import _ from 'lodash'
import Mola from '@api/mola'
import { getContentTypeName } from '@source/lib/globalUtil'
import types from '../constants'

const getFeaturePlaylist = id => dispatch => {
  dispatch({
    type: types.GET_FEATURE_PLAYLIST_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: '',
      },
      data: [],
    },
    id,
  })
  return Mola.getFeaturePlaylist(id).then(result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_FEATURE_PLAYLIST_ERROR,
        payload: {
          meta: {
            status: 'error',
            error: result.meta.error || 'Error: feature playlist failed',
          },
          data: [],
        },
        id,
      })
    } else {
      dispatch({
        type: types.GET_FEATURE_PLAYLIST_SUCCESS,
        payload: result,
        id,
      })
    }
  })
}

const getFeatureVideo = ({ id = '', playlist, index = 0 }) => async dispatch => {
  const contentTypeName = await getContentTypeName(_.get(playlist, 'contentType', ''))

  if (contentTypeName === 'mola-categories') {
    return Mola.getFeaturePlaylist(playlist.id).then(result => {
      const filterVisibility = result.data.filter(dt => {
        return dt.visibility === 1
      })
      result = {
        meta: {
          status: result.meta.status,
          id: playlist.id,
          title: playlist.title,
          contentType: playlist.contentType,
          sortOrder: index,
        },
        data: filterVisibility,
      }
      dispatch({
        type: types.GET_FEATURE_VIDEO,
        payload: result,
        id,
      })
    })
  }
  return Mola.getHomeVideo({ id: playlist.id }).then(result => {
    const filterVisibility = result.data.filter(dt => {
      return dt.visibility === 1
    })

    result = {
      meta: {
        status: result.meta.status,
        id: playlist.id,
        title: playlist.title,
        contentType: playlist.contentType,
        sortOrder: index,
      },
      data: filterVisibility,
    }
    dispatch({
      type: types.GET_FEATURE_VIDEO,
      payload: result,
      id,
    })
  })
}

const getFeatureBanner = pathname => dispatch => {
  const id = `landing-page-${pathname}` /* landing-page-epl */

  dispatch({
    type: types.GET_FEATURE_BANNER_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: '',
      },
      data: [],
    },
    id: pathname,
  })
  return Mola.getFeatureBanner({ id }).then(result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_FEATURE_BANNER_ERROR,
        payload: {
          meta: {
            status: 'error',
            error: result.meta.error || 'Error: feature banner failed',
          },
          data: [],
        },
        id: pathname,
      })
    } else {
      dispatch({
        type: types.GET_FEATURE_BANNER_SUCCESS,
        payload: result,
        id: pathname,
      })
    }
  })
}

const getFeatureArticle = id => dispatch => {
  dispatch({
    type: types.GET_FEATURE_ARTICLE_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: '',
      },
      data: [],
    },
    id,
  })
  return Mola.getRecommendedArticles(id).then(result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_FEATURE_ARTICLE_ERROR,
        payload: {
          meta: {
            status: 'error',
            error: result.meta.error || 'Error: feature articles failed',
          },
          data: [],
        },
        id,
      })
    } else {
      dispatch({
        type: types.GET_FEATURE_ARTICLE_SUCCESS,
        payload: result,
        id,
      })
    }
  })
}

const resetFeatureVideos = () => dispatch => {
  dispatch({
    type: types.RESET_FEATURE_VIDEO,
    payload: null,
  })
}

export default {
  getFeaturePlaylist,
  getFeatureVideo,
  getFeatureBanner,
  getFeatureArticle,
  resetFeatureVideos,
}
