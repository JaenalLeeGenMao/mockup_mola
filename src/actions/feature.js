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
  })
  return Mola.getFeaturePlaylist(id).then(result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_FEATURE_PLAYLIST_ERROR,
        payload: {
          meta: {
            status: 'error',
            error: 'Error: feature playlist failed',
          },
          data: [],
        },
      })
    } else {
      dispatch({
        type: types.GET_FEATURE_PLAYLIST_SUCCESS,
        payload: result,
      })
    }
  })
}

const getFeatureVideo = (playlist, index = 0) => async dispatch => {
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
  })
  return Mola.getFeatureBanner({ id }).then(result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_FEATURE_BANNER_ERROR,
        payload: {
          meta: {
            status: 'error',
            error: 'Error: feature banner failed',
          },
          data: [],
        },
      })
    } else {
      dispatch({
        type: types.GET_FEATURE_BANNER_SUCCESS,
        payload: result,
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
  })
  return Mola.getRecommendedArticles(id).then(result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_FEATURE_ARTICLE_ERROR,
        payload: {
          meta: {
            status: 'error',
            error: 'Error: feature articles failed',
          },
          data: [],
        },
      })
    } else {
      dispatch({
        type: types.GET_FEATURE_ARTICLE_SUCCESS,
        payload: result,
      })
    }
  })
}

export default {
  getFeaturePlaylist,
  getFeatureVideo,
  getFeatureBanner,
  getFeatureArticle,
}
