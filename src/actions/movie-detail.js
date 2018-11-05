import Mola from '../api/mola';
import types from '../constants';

export const getMovieDetail = (id) => dispatch => {
  dispatch({
    type: types.GET_MOVIE_DETAIL_LOADING,
    payload: {
      meta: {
        status: "loading",
        error: ''
      },
      data: []
    }
  });
  return Mola.getMovieDetail({ id })
    .then(result => {
      if (result.meta.status === "error") {
        dispatch({
          type: types.GET_MOVIE_DETAIL_ERROR,
          payload: result,
        });
      } else {
        dispatch({
          type: types.GET_MOVIE_DETAIL_SUCCESS,
          payload: result,
        });
      }
    });
};