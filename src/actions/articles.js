import types from '../constants';
import Mola from '../api/mola';

const getArticlesDetail = (articleId) => dispatch => {
  dispatch({
    type: types.GET_ARTICLES_DETAIL_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: '',
      },
      data: [],
    },
  })
  return Mola.getArticlesDetail(articleId)
    .then((result) => {
      if (result.meta.status === 'error') {
        dispatch({
          type: types.GET_ARTICLES_DETAIL_ERROR,
          payload: result,
        })
      } else {
        dispatch({
          type: types.GET_ARTICLES_DETAIL_SUCCESS,
          payload: result,
        })
      }
    })
}

export default {
  getArticlesDetail,
}